import { Link } from 'react-router-dom';

const UsersItem = ({ user }) => {
    return (
        <li>
            <Link to={`/users/${user.id}`}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </Link>
        </li>
    );
};

export default UsersItem;
