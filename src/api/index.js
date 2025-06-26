
const baseUrl = 'http://localhost:3000/api';

const getProducts = async () => {
    try {
        const res = await fetch(`${baseUrl}/products`);
        const result = await res.json();
        return result;
    } catch (error) {
        console.error({ error: 'Error getting products. '})
    }
}

const getSingleProduct = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/products/${id}`);
        const result = await res.json();
        return result;
    } catch (error) {
        console.error({ error: 'Error getting product by id.'})
    }
}

const getUserReviews = async (token) => {
    try {
        const res = await fetch(`${baseUrl}/users/reviews`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        const result = await res.json();
        return result;
    } catch (error) {
        console.error({ error: 'Error getting review by user id.'})
    }
}

export { getProducts, getSingleProduct, getUserReviews }