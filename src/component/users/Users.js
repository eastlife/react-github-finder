import React, { Component } from 'react'
import UserItem from './Useritem';

class Users extends Component {
    
    render() {
        return (
            <div style={userStyle}>
                {this.props.users.map(user => (
                    // Each child in a list should have a unique "key" prop
                    // <div key={user.id}>{user.login}</div>
                    // Pass user info as prop to UserItem
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        );
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users;
