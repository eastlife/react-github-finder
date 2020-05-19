import React from 'react'
import UserItem from './Useritem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    // Each child in a list should have a unique "key" prop
                    // <div key={user.id}>{user.login}</div>
                    // Pass user info as prop to UserItem
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        );
    }
    

}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users;
