import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { Main } from './Main';
import { User } from './User';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { DropDownMenu } from './DropDownMenu';
import { Polls } from './Polls';
import * as d3 from 'd3';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                data: null,
                authenticated: false,
                mypolls: null
            },
            memory: {
                firstname: null,
                lastname: null,
                username: null,
                email: null,
                password: null,
                newPassword: null,
                poll: null
            },
            ui: {
                dropDownMenu: false,
                numOfAddOptions: 0,
                poll: false
                // inCreatePage: false
            },
            polls: null
        };
        // console.log('state in constructor',this.state);
        this.getUserData = this.getUserData.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
        this.handleClickFromMenu= this.handleClickFromMenu.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.addOption = this.addOption.bind(this);
        this.handleClickFromPoll = this.handleClickFromPoll.bind(this);
        this.closePopUps = this.closePopUps.bind(this);
        this.popPoll = this.popPoll.bind(this);
        this.buildChart = this.buildChart.bind(this);
    }

    buildChart() {
        const height = 200;
        const width = 300;
        const padding = 25;
        const dataset = {...this.state.memory.poll};
        const svg = d3.select('.chart-container')
                      .append('svg')
                      .attr('height', height)
                      .attr('width', width);

        const yScale = d3.scaleLinear()
                         .domain([0, d3.max(dataset.choices, d => d[1])])
                         .range([(height - padding), 0]);

        const xScale = d3.scaleBand()
                         .domain(dataset.choices.map(d => d[0]))
                         .range([padding, width - padding])
                         .padding(0.1);

        svg.selectAll('rect')
           .data(dataset.choices)
           .enter()
           .append('rect')
           .attr('height', d => (height - padding - yScale(d[1])))
           .attr('width', xScale.bandwidth())
           .attr('x', d => xScale(d[0]))
           .attr('y', d => yScale(d[1]));

        const yAxis = d3.axisLeft(yScale);
        svg.append('g')
           .attr('transform', 'translate(' + padding + ',0)')
           .call(yAxis);

        const xAxis = d3.axisBottom(xScale);
        svg.append('g')
           .attr('transform', 'translate(0,' + (height - padding) + ')')
           .call(xAxis);
    }

    popPoll(e) {
        // console.log('popPoll triggered by: ', e.target);
        this.setState({
            ui: {
                ...this.state.ui,
                poll: true
            }
        });
        if (e) e.stopPropagation();
    }

    handleClickFromPoll(e) {
        // console.log('handleClickFrompoll triggered');
        // console.log('this.state.polls from handleClickfromPoll: ',this.state);
        const state = {...this.state};
        const polls = state.polls
        const poll_id = state.memory.poll_id;
        // console.log('polls inside handleClickFromPoll:', state.polls);
        // Get poll id when click on poll || getting poll id after voting
        let id;
        if (e) id = e.target.id;
        else id = poll_id;
        for (let i = 0; i < polls.length; i++) {
            const poll = polls[i];

            if (poll._id === id) {
                // console.log('poll found inside forloop: ', poll);
                this.setState({
                    memory: {
                        ...this.state.memory,
                        poll : poll
                    }
                });
                break;
            }
        }
        this.popPoll();
    }

    addOption() {
        this.setState(prevState => ({
            ui: {
                ...prevState.ui,
                numOfAddOptions: prevState.ui.numOfAddOptions + 1
            }
        }));
    }

    closePopUps(e) {
        if(e)
        console.log(e.target,'triggered closePopUps');
        this.setState(prevState => ({
            ui: {
                ...prevState.ui,
                dropDownMenu: false,
                poll: false
                // popUps: false
            }
            // memory: {
            //     ...prevState.memory,
            //     poll: null
            // }
        }));
        if (e) e.stopPropagation();
    }

    handleClickFromMenu(e) {
        // console.log(e.target,'triggered handleClickFromMenu');
        const url = 'http://localhost:8080/api/signout';

        const init = {
            mothod: 'GET',
            headers: new Headers(),
            // credentials: 'same-origin'
        }

        if (e.target.className === 'menu-signout')
            fetch(url, init)
            .then(() => {
                // closeMenu();
                this.closePopUps();
                this.setState({
                    user: {
                        ...this.state.user,
                        authenticated: false
                    }
                });
                this.props.history.push('/');
            });
        else if (e.target.className === 'menu-dashboard') closePopUps();
        // else closePopUps();
        e.stopPropagation();
    }

    toggleMenu(e) {
        let ui = {...this.state.ui};
        ui.dropDownMenu = this.state.ui.dropDownMenu ? false : true;
        this.setState({ ui });
        e.stopPropagation();
    }

    updateUserData(e) {
        let memory = {...this.state.memory};
        if (e.target.name === 'firstname') memory.firstname = e.target.value;
        else if (e.target.name === 'lastname') memory.lastname = e.target.value;
        else if (e.target.name === 'username') memory.username = e.target.value;
        else if (e.target.name === 'email') memory.email = e.target.value;
        else if (e.target.name === 'password') memory.password = e.target.value;
        else if (e.target.name === 'new_password') memory.newPassword = e.target.value;
        this.setState({ memory });
    }

    getUserData() {
        // console.log('getUserData triggered!');
        const url = 'http://localhost:8080/api/getuserdata';
        const headers = new Headers();
        const init = { method: 'GET',
                       headers: headers };
       fetch(url, init)
       .then(res => res.json())
       .then(resJson => {
           let firstname, lastname, username, mypolls, email;
           const polls = resJson.polls;
           const poll_id = resJson.poll_id;
           if (resJson.user) {
               const user = resJson.user;
               firstname = user.firstname;
               lastname = user.lastname;
               username = user.username;
               email = user.email;
               mypolls = resJson.mypolls;
               this.setState({
                   ...this.state,
                   user: {
                       data: resJson.user,
                       authenticated: true,
                       mypolls: mypolls

                   },
                   memory: {
                       ...this.state.memory,
                       firstname: firstname,
                       lastname: lastname,
                       username: username,
                       email: email,
                       poll_id: poll_id
                   },
                   polls: polls
               }, () => this.handleClickFromPoll());
           } else this.setState({
               ...this.state,
               memory: {
                   ...this.state.memory,
                   poll_id: poll_id
               },
               polls: polls
           }, () => this.handleClickFromPoll());
       });
    }

    componentWillMount() {
        // const url = 'http://localhost:8080/api/polls';
        // fetch(url).then(res => res.json()).then(resJson => this.setState({ polls: resJson }));
        this.getUserData();
        // this.handleClickFromPoll();
    }

    componentDidMount() {
        // this.buildChart();
    }

    render() {
        const auth = this.state.user.authenticated;
        const popPoll= this.popPoll;
        const history = this.props.history, handleClickFromPoll = this.handleClickFromPoll;
        const viewPoll ={ popPoll, history, handleClickFromPoll };
        return (
            <div onClick={this.closePopUps}>
            {/* // <div> */}
                <Nav unmountCreate={this.unmountCreate} state={this.state} toggleMenu={this.toggleMenu}/>
                {auth ? <DropDownMenu popped={this.state.ui.dropDownMenu} handleClickFromMenu={this.handleClickFromMenu}/> : ''}
                <Main />
                <User viewPoll={viewPoll} closePopUps={this.closePopUps} updateUserData={this.updateUserData} addOption={this.addOption} state={this.state}/>
                <Route path='/polls' render={ () =>
                    <Polls viewPoll={viewPoll} state={this.state} buildChart={this.buildChart}/>} />
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
