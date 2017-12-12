import React from 'react';
// import { }

export const Poll = props => {
    const poll = props.state.memory.poll;
    return (
        <div className='poll-container' onClick={e => e.stopPropagation()}>
            <form action='/' method='post'>
                <legend>{poll.poll_name}</legend>
                {poll.choices.map((choice, i) =>
                    <div>
                        <input onClick={e => e.stopPropagation()} id={`choice${i}`} type='radio' name='choice' value={poll.choices[i]}></input>
                        <label onClick={e => e.stopPropagation()} for={`choice${i}`}>{poll.choices[i]}</label>
                    </div>
                )}
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
