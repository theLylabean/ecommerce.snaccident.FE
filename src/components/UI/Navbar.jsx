import { Link, useNavigate } from "react-router-dom";
import NavCart from "./NavCart.jsx";
import '../../css/navbar.css';

const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
        navigate("/login");
    }

    return (
        <>
            <div className='navbar-container'>
                <div className='navbar-left'>
                    <Link to='/'>Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/account">Account</Link>
                </div>
                    <NavCart />
                <div className='navbar-right>'>
                    {token ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
};
export default Navbar;