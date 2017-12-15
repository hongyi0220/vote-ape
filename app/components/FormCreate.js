import React from 'react';
// import { Switch, Route } from 'react-router-dom';
export const FormCreate = props => {
    const numOfAddOptions = props.state.ui.numOfAddOptions;
    // console.log('props.state from <FormCreate>',props.state);
    // console.log('numOfAddOptions',numOfAddOptions);
    const dummyArr = numOfAddOptions => {
        let arr = [];
        for (let i = 0; i < numOfAddOptions; i++) arr.push(null);
        console.log('arr',arr);
        return arr;
    };
    // console.log(dummyArr(numOfAddOptions));

    return (
        <div className='form-create-container'>
            <h3>Create a New Poll</h3>
            <form action='/user/create' method='post'>
                <div className='poll-name'>
                    {/* <label htmlFor='poll-name'>Poll name</label> */}
                    <input id='poll-name' name='poll_name' type='text' placeholder='Enter your question'/>
                </div>
                <div className='choice'>
                    {/* <label htmlFor='choice1'>Option 1</label> */}
                    <input id='choice1' name='choices[]' type='text' placeholder='Enter an answer choice'/>
                </div>
                <div className='choice'>
                    {/* <label htmlFor='choice2'>Option 2</label> */}
                    <input id='choice2' name='choices[]' type='text' placeholder='Enter an answer choice'/>
                </div>
                {dummyArr(numOfAddOptions).map((el, i) =>
                    <div className='choice'>
                        {/* <label htmlFor={`choice${i + 3}`}>{`Option ${i + 3}`}</label> */}
                        <input id={`choice${i + 3}`} name='choices[]' type='text' placeholder='Enter an answer choice'/>
                    </div>
                )}
                <button type='button' onClick={props.addOption}>Add more choices</button>
                <button type='submit'>CREATE POLL</button>
            </form>
        </div>
    );
}
