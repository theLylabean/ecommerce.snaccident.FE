const baseUrl = 'http://localhost:3000/api'

const getUserReviews = async (user_id) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/reviews/${user_id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        const result = await res.json();
        return result;
    } catch (error) {
        console.error({ error: 'Error getting review by user id.'})
    }
}

export { getUserReviews }