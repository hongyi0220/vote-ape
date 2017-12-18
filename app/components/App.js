import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { Landing } from './Landing';
import { User } from './User';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { DropDownMenu } from './DropDownMenu';
import { Polls } from './Polls';
import * as d3 from 'd3';
import { Twitter } from './Twitter';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                data: null,
                authenticated: false,
                mypolls: null
            },
            memory: { // This temporary storage enables live-updating of form values
                firstname: null,
                lastname: null,
                username: null,
                email: null,
                password: null,
                newPassword: null,
                poll: null,
                poll_id: null,
                comment: null
            },
            ui: {
                dropDownMenu: false,
                numOfAddOptions: 0,
                poll: false
            },
            polls: null,
            dev: false
        };
        this.getUserData = this.getUserData.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
        this.handleClickFromMenu= this.handleClickFromMenu.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.addOption = this.addOption.bind(this);
        this.handleClickFromPoll = this.handleClickFromPoll.bind(this);
        this.closePopUps = this.closePopUps.bind(this);
        this.popPoll = this.popPoll.bind(this);
        this.buildChart = this.buildChart.bind(this);
        this.upVote = this.upVote.bind(this);
        this.storeCommentInMemory = this.storeCommentInMemory.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        // this.setPollIdInMemory = this.setPollIdInMemory.bind(this);
    }

    // setPollIdInMemory() {
    //     this.setState({
    //         ...this.state,
    //         memory: {
    //             ...this.state.memory,
    //             poll_id: null
    //         }
    //     });
    // }

    handleDelete(e) {
        let url = 'https://poll-monkey-0220.herokuapp.com/api/delete';
        if (this.state.dev) url = url.replace('https://poll-monkey-0220.herokuapp.com', 'http://localhost:8080');

        const id = e.target.id;
        const init ={
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }
        fetch(url, init);
    }

    handleSubmitComment() {
        const memory = {...this.state.memory};
        const comment = memory.comment;
        const username = memory.username;
        const poll_id = memory.poll._id;
        let url = 'https://poll-monkey-0220.herokuapp.com/api/comment';
        if (this.state.dev) url = url.replace('https://poll-monkey-0220.herokuapp.com', 'http://localhost:8080');
        fetch(url,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, comment: comment, poll_id: poll_id})
            }

        );
        memory.poll.comments.push([username, comment]);
        memory.comment = null;
        this.setState({ memory });
    }

    storeCommentInMemory(e) {
        this.setState({
            memory: {
                ...this.state.memory,
                comment: e.target.value
            }
        });
    }

    upVote(e) {
        let url = 'https://poll-monkey-0220.herokuapp.com/api/upvote';
        if (this.state.dev) url = url.replace('https://poll-monkey-0220.herokuapp.com', 'http://localhost:8080');
        fetch(url,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: e.target.id})
            }
        );
        this.setState(prevState => ({
            memory: {
                ...prevState.memory,
                poll: {
                    ...prevState.memory.poll,
                    upvote: prevState.memory.poll.upvote + 1
                }
            }
        }));
    }

    buildChart() { // Build d3 chart
        const height = 200;
        const width = 400;
        const padding = 25;
        const dataset = {...this.state.memory.poll};
        const tooltip = d3.select('.tooltip').style('visibility', 'hidden');

        // Append svg
        const svg = d3.select('.chart-container')
                      .append('svg')
                      .attr('height', height)
                      .attr('width', width);

        // Define scales and their domains and range
        const yScale = d3.scaleLinear()
                         .domain([0, d3.max(dataset.choices, d => d[1])])
                         .range([(height - padding), padding]);

        const xScale = d3.scaleBand()
                         .domain(dataset.choices.map(d => d[0]))
                         .range([padding, width - padding])
                         .padding(0.1);

        // Create 'bars'
        svg.selectAll('rect')
           .data(dataset.choices)
           .enter()
           .append('rect')
           .attr('class', 'rect')
           .attr('height', d => (height - padding - yScale(d[1])))
           .attr('width', xScale.bandwidth())
           .attr('x', d => xScale(d[0]))
           .attr('y', d => yScale(d[1]))
           .on('mousemove', d => {
               const choice = d[0];
               tooltip.style('visibility', 'visible')
               .style('left', () => (d3.event.x) - 50 + 'px')
               .style('top', () => (d3.event.y) - 50 + 'px')
               .html(choice);
           }).on('mouseout', () => tooltip.style('visibility', 'hidden'));

        const colors = ['aliceBlue', 'plum', 'lightCyan', 'paleGreen', 'turquoise',' skyBlue', 'aquamarine', 'lavender'];
        const rects = document.querySelectorAll('.rect');
        const rectsArr = Array.from(rects);
        for (let i = 0; i < dataset.choices.length; i++) rectsArr[i].setAttribute('id', 'rect-' + colors[i]);

        //Build y-axis
        const yAxis = d3.axisLeft(yScale).tickValues(yScale.domain().map(d => +d.toFixed(0)));
        svg.append('g')
           .attr('transform', 'translate(' + padding + ',0)')
           .call(yAxis);
    }

    popPoll(e) { // This opnes a poll
        this.setState({
            ui: {
                ...this.state.ui,
                poll: true
            }
        });
        if (e) e.stopPropagation();
    }

    handleClickFromPoll(e, ID) { // This finds the exact poll that is clicked stored in state
        const state = {...this.state};
        const polls = state.polls
        const poll_id = state.memory.poll_id || ID;
        // Get poll id when click on poll || getting poll id after voting
        let id;
        if (e) id = e.target.id;
        else id = poll_id;

        for (let i = 0; i < polls.length; i++) {
            const poll = polls[i];

            if (poll._id === id) {
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

    addOption() { // This adds more choices when creating a poll
        this.setState(prevState => ({
            ui: {
                ...prevState.ui,
                numOfAddOptions: prevState.ui.numOfAddOptions + 1
            }
        }));
    }

    closePopUps(e) { // This closes all pop-ups such as the drop-down-menu and a poll page
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

    handleClickFromMenu(e) { // This handles clicks from the drop-down-menu
        let url = 'https://poll-monkey-0220.herokuapp.com/api/signout';
        if (this.state.dev) url = url.replace('https://poll-monkey-0220.herokuapp.com', 'http://localhost:8080');

        const init = {
            mothod: 'GET',
            headers: new Headers()
        }

        if (e.target.className === 'signout-button')
            fetch(url, init)
            .then(() => {
                this.closePopUps();
                this.setState({
                    user: {
                        ...this.state.user,
                        authenticated: false
                    }
                });
                this.props.history.push('/');
            });
        else if (e.target.className === 'dashboard-button') this.closePopUps();
        e.stopPropagation();
    }

    toggleMenu(e) { // This toggles the drop-down-menu when username is clicked
        let ui = {...this.state.ui};
        ui.dropDownMenu = this.state.ui.dropDownMenu ? false : true;
        this.setState({ ui });
        e.stopPropagation();
    }

    updateUserData(e) { // This handles edits of user data
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
        let url = 'https://poll-monkey-0220.herokuapp.com/api/getuserdata';
        if (this.state.dev) url = url.replace('https://poll-monkey-0220.herokuapp.com', 'http://localhost:8080');
        const headers = new Headers();
        const init = { method: 'GET',
                       headers: headers };
        // Fetch data from an API on the server
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
                       data: user,
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
           } else {

               this.setState({
                   ...this.state,
                   memory: {
                       ...this.state.memory,
                       poll_id: poll_id
                   },
                   polls: polls
               }, () => this.handleClickFromPoll());
           }
       });
    }

    componentWillMount() {
        // This gets data such as polls when unsigned-in, polls and user data when signed-in
        this.getUserData();
    }

    render() {
        const auth = this.state.user.authenticated;
        const popPoll= this.popPoll;
        const history = this.props.history, handleClickFromPoll = this.handleClickFromPoll;
        const viewPoll ={ popPoll, history, handleClickFromPoll };
        return (
            <div className='app-container' onClick={this.closePopUps}>
                <div className='tooltip'></div>
                <Nav unmountCreate={this.unmountCreate} state={this.state} toggleMenu={this.toggleMenu}/>
                {auth ? <DropDownMenu popped={this.state.ui.dropDownMenu} handleClickFromMenu={this.handleClickFromMenu}/> : ''}
                <Route exact path='/' component={ Landing } />
                <Route path='/user' render={() => <User handleDelete={this.handleDelete} viewPoll={viewPoll}
                    closePopUps={this.closePopUps} updateUserData={this.updateUserData} addOption={this.addOption} state={this.state}/>}/>
                <Route path='/polls' render={() =>
                    <Polls handleSubmitComment={this.handleSubmitComment} storeCommentInMemory={this.storeCommentInMemory}
                        upVote={this.upVote} viewPoll={viewPoll} state={this.state} buildChart={this.buildChart}/>} />
                <Footer />
                <Route path='/twitter/redirect' render={() => <Twitter getUserData={this.getUserData} state={this.state} viewPoll={viewPoll}/>}/>
            </div>
        );
    }
}

export default withRouter(App);
