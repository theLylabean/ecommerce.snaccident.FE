import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UsersDetail = ({ token }) => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error('Failed to fetch user.');
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, token]);

    if (loading) return <p>Loading user details...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!user) return <p>User not found.</p>;

    return (
        <div>
            <h2>User Details</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || '-'}</p>
            <Link to="/users">Back to Users</Link>
        </div>
    );
};

export default UsersDetail;
