import { Link } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "../../context/CartContext";


const NavCart = () => {
    const { cartItems } = useCart();
    const cartItemCount = cartItems.length;

    return (
        <Link to='/cart' className='cart-icon-link'>
            <div className='cart-icon-container'>
                <FaShoppingCart className='cart-icon' />
                { cartItemCount > 0 && (
                    <span className='cart-badge'>{ cartItemCount }</span>
                ) }
            </div>
        </Link>
    )
}

export default NavCart;