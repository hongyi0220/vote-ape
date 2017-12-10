import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Main } from './Main';
import { User } from './User';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { DropDownMenu } from './DropDownMenu';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            userInfo: null,
            authenticated: false,
            memory: {
                firstname: null,
                lastname: null
            },
            ui: {
                dropDownMenu: false
            }
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.updateName = this.updateName.bind(this);
        this.handleCLickFromMenu= this.handleCLickFromMenu.bind(this);
        this.popMenu = this.popMenu.bind(this);
    }

    handleCLickFromMenu(e) {
        console.log(e.target.className,'triggered closeMenu()');
        const url = 'http://localhost:8080/api/signout';
        const init = {
            mothod: 'GET',
            headers: new Headers(),
            // credentials: 'same-origin'
        }
        const closeMenu = () => {
            this.setState({
                ui: {
                    ...this.state.ui,
                    dropDownMenu: false
                }
            });
            // if (e) e.stopPropagation();
        };
        if (e.target.className === 'menu-signout')
            fetch(url, init)
            .then(() => {
                closeMenu();
                this.setState({ authenticated: false });
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

    getUserInfo() {
        const url = 'http://localhost:8080/api/getuserinfo';
        const headers = new Headers();
        const init = { method: 'GET',
                       headers: headers };
       fetch(url, init)
       .then(res => res.json())
       .then(resJson => {
           const firstname = resJson[0].firstname;
           const lastname = resJson[0].lastname;
           this.setState({
               ...this.state,
               userInfo: resJson,
               authenticated: true,
               memory:
               {
                   ...this.state.memory,
                   firstname: firstname,
                   lastname: lastname
               }
           });
       });
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        const auth = this.state.authenticated;
        return (
            <div onClick={this.handleCLickFromMenu}>
            {/* // <div> */}
                <Nav state={this.state} popMenu={this.popMenu}/>
                {auth ? <DropDownMenu popped={this.state.ui.dropDownMenu} handleCLickFromMenu={this.handleCLickFromMenu}/> : ''}
                <Main />
                <User updateName={this.updateName} state={this.state}/>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
