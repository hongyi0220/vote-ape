import React from 'react';

export const UserContent = props => {
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ userInfo: nextProps.userInfo });
    // }
    const userInfo = props.state.userInfo;

    return (
        <div>{userInfo ? `Hello, ${userInfo[0].user_firstname}!` : ''}</div>
    );
}
