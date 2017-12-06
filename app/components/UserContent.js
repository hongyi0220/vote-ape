import React from 'react';

export const UserContent = props => {
    const userInfo = props.userInfo;
    return (
        <div>{userInfo}</div>
    );
}
