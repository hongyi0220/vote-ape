import React, {Component} from 'react';
// import Footer from './Footer';
// import Nav from './Nav';
import {Main} from './Main';
import {User} from './User';

class App extends React.Component {
    render() {
        return (
            <div>
                <Main />
                <User />
            </div>
        );
    }
}

export default App;
