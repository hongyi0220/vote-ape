import React from 'react';
import { Link } from 'react-router-dom';

export const UserContent = props => {
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ userData: nextProps.userData });
    // }
    const userData = props.state.user.data;
    const mypolls = props.state.user.mypolls;

    const maskPassword = password => {
        let result = '';
        for (let i = 0; i < password.length; i++) result += '*';
        return result;
    }

    return (
        <div className='user-content-container'>
            <div className='my-account'>Dashboard</div>
            <h3>Login Details</h3>
            <div className='login-details-box'>
                <div className='row'>
                    <div className='col'>
                        Name<br/>
                        {`${userData ? userData.firstname : ''} ${userData ? userData.lastname : ''}`}&nbsp;
                        <Link to='/user/update/fullname'>Edit</Link>
                    </div>
                    <div className='col'>
                        Username<br/>
                        {`${userData ? userData.username : ''}`}&nbsp;
                        <Link to='/user/update/username'>Edit</Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        Password<br/>
                        {`${userData ? maskPassword(userData.password) : ''}`}&nbsp;
                        <Link to='/user/update/password'>Edit</Link>
                    </div>
                    <div className='col'>
                        Email<br/>
                        {`${userData ? userData.email : ''}`}&nbsp;
                        <Link to='/user/update/email'>Edit</Link>
                    </div>
                </div>
            </div>
            <h3>My Polls</h3>
            <div className='my-polls-box'>
                {/* Create JSX elements from fetch API data*/}
            </div>
        </div>
    );
}
