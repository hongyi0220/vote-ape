import React from 'react';
import { Link } from 'react-router-dom';

export const UserContent = props => {
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ userData: nextProps.userData });
    // }
    const userData = props.state.user.data;
    const mypolls = props.state.user.mypolls;
    const viewPoll = props.viewPoll;
    const handleClickFromPoll = viewPoll.handleClickFromPoll;
    const history = viewPoll.history;
    const popPoll = viewPoll.popPoll;

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
                        <Link to='/user/update/fullname' onClick={e => e.stopPropagation()}>Edit</Link>
                    </div>
                    <div className='col'>
                        Username<br/>
                        {`${userData ? userData.username : ''}`}&nbsp;
                        <Link to='/user/update/username' onClick={e => e.stopPropagation()}>Edit</Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        Password<br/>
                        {`${userData ? maskPassword(userData.password) : ''}`}&nbsp;
                        <Link to='/user/update/password' onClick={e => e.stopPropagation()}>Edit</Link>
                    </div>
                    <div className='col'>
                        Email<br/>
                        {`${userData ? userData.email : ''}`}&nbsp;
                        <Link to='/user/update/email' onClick={e => e.stopPropagation()}>Edit</Link>
                    </div>
                </div>
            </div>
            <h3>My Polls</h3>
            <div className='my-polls-box'>
                {mypolls ? mypolls.map((poll, i) =>
                    <div className='poll' id={poll._id}
                        onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                        {`Title: ${poll.poll_name}  Created: ${poll.created} By Me
                          Views: ${poll.views} Voted: ${poll.voted} Upvote: ${poll.upvote}`}
                    </div>
                )  : <div>You have no polls</div>}
            </div>
        </div>
    );
}
