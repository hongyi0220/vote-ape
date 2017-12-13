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
                poll: null
            },
            ui: {
                dropDownMenu: false,
                numOfAddOptions: 0,
                poll: false
            },
            polls: null
        };
        // console.log('state in constructor',this.state);
        this.getUserData = this.getUserData.bind(this);
        this.updateName = this.updateName.bind(this);
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
        const width = 200;
        const padding = 5;
        const dataset = {...this.state.memory.poll};
        const svg = d3.select('.chart-container')
                      .append('svg')
                      .attr('height', height)
                      .attr('width', width);

        const yScale = d3.scaleLinear()
                         .domain([0, d3.max(dataset.choices, d => d[1])])
                         .range([0, height - padding]);

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
        e.stopPropagation();
    }

    handleClickFromPoll(e) {
        // console.log('handleClickFrompoll triggered');
        // console.log(this.state);
        const state = {...this.state};
        const polls = state.polls
        // console.log('polls inside handleClickFromPoll:', state.polls);
        const id = e.target.id;
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
            },
            memory: {
                ...prevState.memory,
                poll: null
            }
        }));
        if (e) e.stopPropagation();
    }

    handleClickFromMenu(e) {
        console.log(e.target,'triggered handleClickFromMenu');
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

    updateName(e) {
        let memory = {...this.state.memory};
        if (e.target.name === 'firstname') memory.firstname = e.target.value;
        else if (e.target.name === 'lastname') memory.lastname = e.target.value;
        this.setState({ memory });
    }

    getUserData() {
        const url = 'http://localhost:8080/api/getuserdata';
        const headers = new Headers();
        const init = { method: 'GET',
                       headers: headers };
       fetch(url, init)
       .then(res => res.json())
       .then(resJson => {
           const firstname = resJson.user.firstname;
           const lastname = resJson.user.lastname;
           const mypolls = resJson.mypolls;
           const polls = resJson.polls;
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
                   lastname: lastname
               }
               // polls: polls
           }, () => console.log(`setState after getuserdata api: ${this.state}`));
       });
    }

    componentWillMount() {
        const url = 'http://localhost:8080/api/polls';
        fetch(url).then(res => res.json()).then(resJson => this.setState({ polls: resJson }));
        this.getUserData();
    }

    componentDidMount() {
        // this.buildChart();
    }

    render() {
        const auth = this.state.user.authenticated;
        // const userprops ={}
        return (
            <div onClick={this.closePopUps}>
            {/* // <div> */}
                <Nav state={this.state} toggleMenu={this.toggleMenu}/>
                {auth ? <DropDownMenu popped={this.state.ui.dropDownMenu} handleClickFromMenu={this.handleClickFromMenu}/> : ''}
                <Main />
                <User updateName={this.updateName} addOption={this.addOption} state={this.state}/>
                <Route path='/polls' render={ () =>
                    <Polls popPoll={this.popPoll} history={this.props.history} handleClickFromPoll={this.handleClickFromPoll}
                        state={this.state} buildChart={this.buildChart}/>} />
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
