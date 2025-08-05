const baseUrl = 'http://localhost:3000/api';

const getProducts = async () => {
    try {
        const res = await fetch(`${baseUrl}/products`);
        const result = await res.json();
        return result;
    } catch (error) {
        console.error({ error: 'Error getting products. '});
        throw error;
    }
}

const getSingleProduct = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/products/${id}`);
        const result = await res.json();
        return result;
    } catch (error) {
        console.error({ error: 'Error getting product by id.'});
        throw error;
    }
}

const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/orders/addtocart`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'},
            body: JSON.stringify({ productId })
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`❌ Add to cart failed: ${res.status} - ${errorText}`);
            throw new Error ('Failed to add to cart.')
        }
        const addedItem = await res.json();
        return addedItem;
    } catch (error) {
        console.error('Error adding to cart: ', error.message);
        throw error;
    }
}

export { getProducts, getSingleProduct, addToCart }