import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { Main } from './Main';
import { User } from './User';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { DropDownMenu } from './DropDownMenu';
import { Polls } from './Polls';

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
                lastname: null
            },
            ui: {
                dropDownMenu: false,
                numOfAddOptions: 0
            },
            polls: null
        };
        // console.log('state in constructor',this.state);
        this.getUserData = this.getUserData.bind(this);
        this.updateName = this.updateName.bind(this);
        this.handleCLickFromMenu= this.handleCLickFromMenu.bind(this);
        this.popMenu = this.popMenu.bind(this);
        this.addOption = this.addOption.bind(this);
        // this.topLevelNav = this.topLevelNav.bind(this);
    }

    // topLevelNav(href) {
    //     location.assign(href);
    //     return false;
    // }

    addOption() {
        this.setState(prevState => ({
            ui: {
                ...prevState.ui,
                numOfAddOptions: prevState.ui.numOfAddOptions + 1
            }
        }));
    }

    handleCLickFromMenu(e) {
        // console.log(e.target,'triggered closeMenu()');
        const url = 'http://localhost:8080/api/signout';

        const init = {
            mothod: 'GET',
            headers: new Headers(),
            // credentials: 'same-origin'
        }

        const closeMenu = () => {
            this.setState(prevState => ({
                ui: {
                    ...prevState.ui,
                    dropDownMenu: false
                }
            }));
        };

        if (e.target.className === 'menu-signout')
            fetch(url, init)
            .then(() => {
                closeMenu();
                this.setState({
                    user: {
                        ...this.state.user,
                        authenticated: false
                    }
                });
                this.props.history.push('/');
            });
        // else if (e.target.className === 'menu-dashboard') closeMenu();
        else closeMenu();
        e.stopPropagation();
    }

    popMenu(e) {
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
               },
               polls: polls
           }, () => console.log(`setState after getuserdata api: ${this.state}`));
       });
    }

    componentWillMount() {
        const url = 'http://localhost:8080/api/polls';
        fetch(url).then(res => res.json()).then(resJson => this.setState({ polls: resJson }));
    }

    componentDidMount() {
        this.getUserData();
    }

    render() {
        const auth = this.state.user.authenticated;

        // const userprops ={}
        return (
            <div onClick={this.handleCLickFromMenu}>
            {/* // <div> */}
                <Nav state={this.state} popMenu={this.popMenu}/>
                {auth ? <DropDownMenu popped={this.state.ui.dropDownMenu} handleCLickFromMenu={this.handleCLickFromMenu}/> : ''}
                <Main />
                <User updateName={this.updateName} addOption={this.addOption} state={this.state}/>
                <Route path='/polls' render={ () => <Polls state={this.state}/>} />
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
