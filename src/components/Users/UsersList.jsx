import { useEffect, useState } from 'react';
import UsersItem from './UsersItem.jsx';

const UsersList = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error('Failed to fetch users.');
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    return (
        <div>
            <h2>User List</h2>
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <UsersItem key={user.id} user={user} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;
