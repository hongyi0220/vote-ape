import React from 'react';
import { Route } from 'react-router-dom';

export class Poll extends React.Component {
    componentDidMount() {
        this.props.buildChart();
    }
    render() {
        const poll = this.props.state.memory.poll;
        return (
            <div className='poll-container' onClick={e => e.stopPropagation()}>
                <div className='choices-container'>
                    <form action='/polls/poll/vote' method='post'>
                        <h3>{poll.poll_name}</h3>
                        {poll.choices.map((choice, i) =>
                            <div>
                                {/* This sends a "choice=_id,i" */}
                                <input onClick={e => e.stopPropagation()} id={`choice${i}`} type='radio' name='choice'
                                    value={`${poll._id},${i}`}></input>
                                <label onClick={e => e.stopPropagation()} htmlFor={`choice${i}`}>{poll.choices[i][0]}</label>
                            </div>
                        )}
                        <button type='submit' onClick={e => e.stopPropagation()}>Submit</button>
                    </form>
                </div>
                {/* <Route path='/polls/poll/successful' render={() => <div>Monkey: 'Oo oo oo!'('Voted!')</div>} /> */}
                <div className='chart-container'>

                </div>
            </div>
        );
    }
}
