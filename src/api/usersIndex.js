const baseUrl = 'http://localhost:3000/auth';

const createUser = async ({first_name, last_name, email, username, password}) => {
    try {
        const res = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name, last_name, email, username, password })
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

const getLogin = async (username, password) => {
    try {
        const res = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

const getAccount = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/account`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    if (!res.ok)  {
        const errorText = await res.text();
        console.error('❌ getAccount failed: ', errorText);
        throw new Error(`Failed to fetch account details: ${res.status}`);
    }
    const user = await res.json();
    return user;
    } catch (error) {
    console.error(error.message);
    throw error;
    }
}

const getCartItems = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/account/cartItems`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`❌ Failed to fetch cart items: ${res.status} - ${errorText}`);
            throw new Error('Failed to fetch cart items');
        }
        const userCart = await res.json();
        return userCart;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}


export { createUser, getLogin, getAccount, getCartItems }