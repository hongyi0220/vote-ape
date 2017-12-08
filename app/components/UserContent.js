import React from 'react';
import { Link } from 'react-router-dom';

export const UserContent = props => {
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ userInfo: nextProps.userInfo });
    // }
    const userInfo = props.state.userInfo[0];

    const maskPassword = password => {
        let result = '';
        for (let i = 0; i < password.length; i++) result += '*';
        return result;
    }

    return (
        <div className='user-content-container'>
            <div className='my-account'>My Account</div>
            <h3>Login Details</h3>
            <div className='login-details-box'>
                <div className='row'>
                    <div className='col'>
                        Name<br/>
                        {`${userInfo ? userInfo.firstname : ''} ${userInfo ? userInfo.lastname : ''}`}&nbsp;
                        <Link to='/user/update'>Edit</Link>
                    </div>
                    <div className='col'>
                        Username<br/>
                        {`${userInfo ? userInfo.username : ''}`}&nbsp;
                        <Link to='/user/update'>Edit</Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        Password<br/>
                        {`${userInfo ? maskPassword(userInfo.password) : ''}`}&nbsp;
                        <Link to='/user/update'>Edit</Link>
                    </div>
                    <div className='col'>
                        Email<br/>
                        {`${userInfo ? userInfo.email : ''}`}&nbsp;
                        <Link to='/user/update'>Edit</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
