import React from 'react';

// This component's sole purpose is to get polls and poll_id,
// readying the right poll to pop-up when someone follows
// the twitter link of a particular poll, a little hacky but oh well
export class Twitter extends React.Component {

    componentWillMount() {
        this.props.getUserData();
    }
    componentDidMount() {
        this.props.viewPoll.history.push('/polls/poll');
    }
    render() {
        return (
            <div></div>
        );
    }
}
