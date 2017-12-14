import React from 'react';
import { Route } from 'react-router-dom';

export class Poll extends React.Component {
    componentDidMount() {
        // Build graph with d3.js after DOM elements are mounted
        this.props.buildChart();
    }
    render() {
        const poll = this.props.state.memory.poll;
        const upVote = this.props.upVote;
        // const polls = state.polls;
        // const popPoll = this.props.popPoll;
        console.log('poll in memory:', poll);
        return (
            <div className='poll-container' onClick={e => e.stopPropagation()}>
                <div className='choices-container'>
                    <form action='/polls/poll/vote' method='post'>
                        <h3>{poll.poll_name}</h3>&nbsp;&nbsp;
                        <i id={poll._id} onClick={e => {e.stopPropagation(); upVote(e)}} className="fa fa-thumbs-o-up" aria-hidden="true">
                        </i>&nbsp;{poll.upvote}
                        {poll.choices.map((choice, i) =>
                            <div>
                                {/* This input sends a "choice=_id,i" key-value pair */}
                                <input onClick={e => e.stopPropagation()} id={`choice${i}`} type='radio' name='choice'
                                    value={`${poll._id},${i}`}></input>
                                <label onClick={e => e.stopPropagation()} htmlFor={`choice${i}`}>{poll.choices[i][0]}</label>
                            </div>
                        )}
                        <button type='submit' onClick={e => {e.stopPropagation()}}>Submit</button>
                    </form>
                    <Route path='/polls/poll/voted' render={() => <div>You've already voted</div>}/>
                    <Route path='/polls/poll/done' render={() => <div>Hooray!</div>}/>
                </div>
                {/* <Route path='/polls/poll/successful' render={() => <div>Monkey: 'Oo oo oo!'('Voted!')</div>} /> */}
                <div className='chart-container'></div>
                {/* <div classN></div> */}
            </div>
        );
    }
}
