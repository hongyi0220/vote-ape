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
        <div>
            <form action='/user/create' method='post'>
                <div className='option'>
                    <label htmlFor='poll-name'>Poll name</label>
                    <input id='poll-name' name='poll_name' type='text'></input>
                </div>
                <div className='option'>
                    <label htmlFor='option1'>Option 1</label>
                    <input id='option1' name='option1' type='text' placeholder='Bananas'></input>
                </div>
                <div className='option'>
                    <label htmlFor='option2'>Option 2</label>
                    <input id='option2' name='option2' type='text' placeholder='Grapes'></input>
                </div>
                {dummyArr(numOfAddOptions).map((el, i) =>
                    <div className='option'>
                        <label htmlFor={`option${i + 3}`}>{`Option ${i + 3}`}</label>
                        <input id={`option${i + 3}`} name={`option${i + 3}`} type='text' placeholder='Fruit'></input>
                    </div>
                )}
                <button type='button' onClick={props.addOption}>Add more options</button>
                <button type='submit'>CREATE POLL</button>
            </form>
        </div>
    );
}
