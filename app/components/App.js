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
            login: null
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.redirect = this.redirect.bind(this);
    }

    // redirect(route) {
    //     this.props.history.push(route);
    // }
    handleClick() {
        this.setState({ login: true });
    }
    getUserInfo() {
        console.log('handleSubmit worked')
        const url = 'http://localhost:8080/user/api';
        const headers = new Headers();
        const init = { method: 'GET',
                       headers: headers };
       fetch(url, init)
       .then(res =>  res.json())
       .then(resJson => {
           // console.log('resJson: ',resJson);

           this.setState({ userInfo: resJson, authenticated: true }, () => console.log('userInfo: ',this.state.userInfo));
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
                <User handleClick={this.handleClick} state={this.state}/>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
