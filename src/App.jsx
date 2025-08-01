import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAccount } from './api/usersIndex.js';
import Navbar from './components/UI/Navbar.jsx';
import OrderList from './components/orders/OrderList.jsx';
import OrderDetails from './components/orders/OrderDetails.jsx';
import UsersList from './components/Users/UsersList.jsx';
import UsersDetail from './components/Users/UsersDetail.jsx';
import Products from './components/Products/Products.jsx';
import Cart from './components/UI/Cart.jsx';
import Login from './components/Users/Login.jsx';
import Register from './components/Users/Register.jsx';
import Account from './components/Users/Account.jsx';
import SingleProduct from './components/Products/SingleProduct.jsx';
import './css/App.css';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [currentUser, setCurrentUser] = useState(null);
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

  useEffect(() => {
  if (token) {
    const getUser = async () => {
      if (!token) return;
      try {
        const response = await getAccount();
        setCurrentUser(response);
      } catch (error) {
        console.error('Failed to fetch user in App: ', error.message);
        setCurrentUser(null);
      }
    }
    getUser();
  }
}, [token]);

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
        <Route 
          path="/cart" 
          element={
            <Cart />
          } 
        />
        
        {/* Auth */}
        <Route 
          path="/login" 
          element={
            <Login 
              setCurrentUser={setCurrentUser}
              setToken={setToken}
            />
          }
        />

        <Route 
          path="/register" 
          element={
            <Register 
              setCurrentUser={setCurrentUser}
              setToken={setToken} 
            />
          }
        />

        {/* Account*/}
        <Route
          path="/account"
          element={
            token ? 
            <Account token={token} /> : <Navigate to="/login" replace />
          }
        />

        {/* Home or redirect */}
        <Route 
          path="/" 
          element={
            <Navigate 
              to={
                token ? 
                "/account" : "/login"
              } replace 
            />
          } 
        />
      </Routes>
    </>
  );
}

export default App;

