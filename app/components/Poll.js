import React from 'react';
import { Route, Link } from 'react-router-dom';

export class Poll extends React.Component {
    constructor() {
        super();
        this.clearTextarea = this.clearTextarea.bind(this);
    }
    clearTextarea() {
        this.refs.comment.value = '';
    }
    componentDidMount() {
        const poll = this.props.state.memory.poll;
        // Build graph with d3.js after DOM elements are mounted
        if (poll) this.props.buildChart();
    }
    render() {
        const memory = this.props.state.memory;
        const poll = memory.poll;
        const username = memory.username;
        const upVote = this.props.upVote;
        const auth = this.props.state.user.authenticated;
        const storeCommentInMemory = this.props.storeCommentInMemory;
        const comment = memory.comment;
        const handleSubmitComment = this.props.handleSubmitComment;
        // const popPoll = this.props.popPoll;
        console.log('poll in memory:', poll);
        return (
            <div className='poll-container' onClick={e => e.stopPropagation()}>
                <div className='choices-container'>
                    <form action='/polls/poll/vote' method='post'>
                        <h3>{poll ? poll.poll_name : ''}</h3>&nbsp;&nbsp;
                        <i id={poll ? poll._id : ''} onClick={e => {e.stopPropagation(); upVote(e)}} className="fa fa-thumbs-o-up" aria-hidden="true">
                        </i>&nbsp;{poll ? poll.upvote : ''}
                        {poll ? poll.choices.map((choice, i) =>
                            <div>
                                {/* This input sends a "choice=_id,i" key-value pair */}
                                <input onClick={e => e.stopPropagation()} id={`choice${i}`} type='radio' name='choice'
                                    value={`${poll ?  poll._id : ''},${i}`} />
                                <label onClick={e => e.stopPropagation()} htmlFor={`choice${i}`}>{poll ? poll.choices[i][0] : ''}</label>
                            </div>
                        ) : ''}
                        <button type='submit' onClick={e => {e.stopPropagation()}}>Submit</button>
                    </form>
                    <Route path='/polls/poll/voted' render={() => <div>You've already voted</div>}/>
                    <Route path='/polls/poll/done' render={() => <div>Hooray!</div>}/>
                </div>
                {/* <Route path='/polls/poll/successful' render={() => <div>Monkey: 'Oo oo oo!'('Voted!')</div>} /> */}
                <div className='chart-container'></div>

                <div className='comments-container'>
                    {/* Display comments */}
                    {poll ? poll.comments.map(comment =>
                        <div className='comment'>
                            {`${comment[0]}: ${comment[1]}`}
                            <Route path='polls/poll/comment/posted' render={() => <div></div>}/>
                        </div>
                    ) : ''}
                    {/* Textarea */}
                    {auth ? <div className='comment-form'>
                        <label htmlFor='comment'>Comment:</label>
                        <textarea ref='comment' id='comment' name='comment' onChange={storeCommentInMemory}>
                            {comment}
                        </textarea>
                        {/* <input type='hidden' name='username' value={username}/>
                        <input type='hidden' name='poll_id' value={poll ? poll._id : ''}/> */}
                        <button type='button' onClick={() => {handleSubmitComment(); this.clearTextarea()}}>Post</button>
                    </div> : <div><Link to='/user/login'>Sign-in</Link> to post comment</div>}
                </div>
            </div>
        );
    }
}
