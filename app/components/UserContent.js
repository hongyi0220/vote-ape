import React from 'react';
import { Link } from 'react-router-dom';

export const UserContent = props => {
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
            <div className='title-dashboard'>Dashboard</div>
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
                            {userData ? userData.username : ''}&nbsp;
                            <Link to='/user/update/username' onClick={e => e.stopPropagation()}>Edit</Link>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            Password<br/>
                            {userData ? maskPassword(userData.password) : ''}&nbsp;
                            <Link to='/user/update/password' onClick={e => e.stopPropagation()}>Edit</Link>
                        </div>
                        <div className='col'>
                            Email<br/>
                            {userData ? userData.email : ''}&nbsp;
                            <Link to='/user/update/email' onClick={e => e.stopPropagation()}>Edit</Link>
                        </div>
                    </div>
                </div>
                <div className='my-polls-box'>
                    <h3>My Polls</h3>
                    {mypolls ? mypolls.map((poll, i) =>
                        <div className='poll' id={poll._id}
                            onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                            <div className='title-created-container'>
                                <div className='title-box'><b>{poll.poll_name}</b></div>
                                <div className='created-box'>{poll.created}</div>
                            </div>
                            <div className='poll-detail-container'>By Me <div className='seperator'></div>&nbsp;
                               Voted: {poll.voted}&nbsp;<div className='seperator'></div>&nbsp;<i className="fa fa-thumbs-o-up" aria-hidden="true">
                              </i>&nbsp;{poll.upvote}
                            </div>
                        </div>
                    ) : <div className='msg'>You have no polls</div>}
            </div>
        </div>
    );
}
