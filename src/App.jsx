import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import OrderList from './components/orders/OrderList.jsx';
import OrderDetails from './components/orders/OrderDetails.jsx';
import UsersList from './components/Users/UsersList.jsx';
import UsersDetail from './components/Users/UsersDetail.jsx';
import Products from './components/Products.jsx';
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Account from './components/Account.jsx';
import SingleProduct from './components/SingleProduct.jsx';
import './App.css';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        {/* Orders */}
        <Route
          path="/orders"
          element={token ? <OrderList token={token} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/orders/:id"
          element={token ? <OrderDetails token={token} /> : <Navigate to="/login" replace />}
        />

        {/* Users */}
        <Route
          path="/users"
          element={token ? <UsersList token={token} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/users/:id"
          element={token ? <UsersDetail token={token} /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/products'
          element={
            <Products
              products={products}
              setProducts={setProducts}
              singleProduct={singleProduct}
              setSingleProduct={setSingleProduct}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
        <Route
          path='/products/:id'
          element={
            <SingleProduct
              singleProduct={singleProduct}
              setSingleProduct={setSingleProduct}
            />
          }
        />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />
        
        {/* Auth */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />

        {/* Account*/}
        <Route
          path="/account"
          element={token ? <Account token={token} /> : <Navigate to="/login" replace />}
        />

        {/* Home or redirect */}
        <Route path="/" element={<Navigate to={token ? "/account" : "/login"} replace />} />
      </Routes>
    </>
  );
}

export default App;

