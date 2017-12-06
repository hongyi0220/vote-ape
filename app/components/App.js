import React, { Component } from 'react';
// import Footer from './Footer';
// import Nav from './Nav';
import { Main } from './Main';
import { User } from './User';
import { Nav } from './Nav';
import { Footer } from './Footer';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            userInfo: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const url = 'http://localhost:8080/user/login';
        const headers = new Headers();
        const init = { method: 'GET',
                       headers: headers };

        fetch(url, init).then(response => this.setState({ userInfo: response }));
    }

    render() {
        return (
            <div>
                <Nav />
                <Main />
                <User handleSubmit={this.handleSubmit} userInfo={this.state.userInfo}/>
                <Footer />
            </div>
        );
    }
}

export default App;
