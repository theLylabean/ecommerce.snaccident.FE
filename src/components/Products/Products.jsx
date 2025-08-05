import { useEffect } from 'react';
import { getProducts } from '../../api/productsIndex.js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { addToCart } from '../../api/productsIndex.js';
import SearchBar from '../UI/Searchbar.jsx';
import '../../css/products.css';

const Products = ({ products, currentUser, setProducts, setSingleProduct, searchTerm, setSearchTerm, searchResults, setSearchResults }) => {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useCart();

    const handleClick = (product) => {
        setSingleProduct(product);
        setSearchTerm('');
        setSearchResults([]);
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = async (productId) => {
        if (!currentUser || !currentUser.id) {
            console.warn('⛔ User not ready. Try again in a sec.')
            return;
        }
        try {
            const addedItem = await addToCart(productId);
            setCartItems((prev) => [...prev, addedItem]);
        } catch (error) {
            console.error('❌ Failed to add to cart in UI: ', error.message);
        }
    };

    useEffect(() => {
        const getProductsApi = async () => {
            const response = await getProducts();
            setProducts(response);
        };
        getProductsApi();
    }, []);

    return (
        <>
            <div className='products-header-container'>
                <h1>
                    A Snaccident Waiting to Happen!
                </h1>
                <p>
                    Welcome to our products page! You'll find a wide variety of edibles, including a groovy Lemonade Drink!
                </p>
                <SearchBar
                    products={products}
                    setProducts={setProducts}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>
            <div className='products-page-container'>
                <div className='products-page'>
                    {
                        searchResults?.length > 0 ? (
                            searchResults.map((product) => {
                                const { id, title, image_url, flavor, price, quantity } = product;
                                if (!product || !product.id || !product.title) return null;
                                return (
                                    <div key={id} className='product-card'>
                                        <h3>{title}</h3>
                                        <img className='product-image' src={image_url} />
                                        <p>{quantity}</p>
                                        <p>{price}</p>
                                        <p>{flavor}</p>
                                        <button onClick={() => handleClick(product.id)}>More Info</button>
                                        <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                                    </div>
                                );
                            })
                        ) : (
                            Array.isArray(products) && products.map((product) => {
                                const { id, title, image_url, flavor, price, quantity } = product;
                                if (!product || !product.id || !product.title) return null;
                                return (
                                    <div key={id} className='product-card'>
                                        <h2><u>{title}</u></h2>
                                        <img className='product-image' src={image_url} />
                                        <p>Quantity: {quantity}</p>
                                        <p>Price: ${price}</p>
                                        <p>Flavor: {flavor}</p>
                                        <button onClick={() => handleClick(product.id)}>More Info</button>
                                        <button 
                                            onClick={() =>  handleAddToCart(product.id)}
                                            disabled={ !currentUser || !currentUser.id } 
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                );
                            })
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Products;