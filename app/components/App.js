import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Main } from './Main';
import { User } from './User';
import { Nav } from './Nav';
import { Footer } from './Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            userInfo: null,
            authenticated: false,
            memory: {
                firstname: null,
                lastname: null
            }

        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.updateName = this.updateName.bind(this);
        // this.redirect = this.redirect.bind(this);
    }

    // redirect(route) {
    //     this.props.history.push(route);
    // }
    updateName(e) {
        let memory = {...this.state.memory};
        if (e.target.name === 'firstname') memory.firstname = e.target.value;
        else if (e.target.name === 'lastname') memory.lastname = e.target.value;
        this.setState({ memory });
    }

    getUserInfo() {
        // console.log('handleSubmit worked')
        const url = 'http://localhost:8080/user/api';
        const headers = new Headers();
        const init = { method: 'GET',
                       headers: headers };
       fetch(url, init)
       .then(res =>  res.json())
       .then(resJson => {
           // console.log('resJson: ',resJson);
           const firstname = resJson[0].firstname;
           const lastname = resJson[0].lastname;
           this.setState({
               userInfo: resJson,
               authenticated: true,
               memory:
               {
                   ...this.state.memory,
                   firstname: firstname,
                   lastname: lastname
               }
           });
           // this.props.history.push('/user');
           // return resJson;
       });

    }

    componentDidMount() {
        // if (this.state.login)
        this.getUserInfo();
    }

    render() {
        return (
            <div>
                <Nav state={this.state}/>
                <Main />
                <User updateName={this.updateName} state={this.state}/>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
