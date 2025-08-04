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

export { getProducts, getSingleProduct }