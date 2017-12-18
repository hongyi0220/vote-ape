import React from 'react';

export const FormCreate = props => {
    const numOfAddOptions = props.state.ui.numOfAddOptions;
    const dummyArr = numOfAddOptions => {
        let arr = [];
        for (let i = 0; i < numOfAddOptions; i++) arr.push(null);
        console.log('arr',arr);
        return arr;
    };

    return (
        <div className='form-create-container'>
            <h3>Create a New Poll</h3>
            <form className='form-create' action='/user/create' method='post'>
                <div className='poll-name'>
                    <input id='poll-name' name='poll_name' type='text' placeholder='Enter your question'/>
                </div>
                <div className='choice'>
                    <input id='choice1' name='choices[]' type='text' placeholder='Enter an answer choice'/>
                </div>
                <div className='choice'>
                    <input id='choice2' name='choices[]' type='text' placeholder='Enter an answer choice'/>
                </div>
                {dummyArr(numOfAddOptions).map((el, i) =>
                    <div className='choice'>
                        <input id={`choice${i + 3}`} name='choices[]' type='text' placeholder='Enter an answer choice'/>
                    </div>
                )}
                <div className='buttons-box'>
                    <button className='options-button' type='button' onClick={props.addOption}>Add more choices</button>
                    <button className='create-button' type='submit'>CREATE POLL</button>
                </div>
            </form>
        </div>
    );
}
