import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderList from './components/orders/OrderList.jsx';
import OrderDetails from './components/orders/OrderDetails.jsx';
import UsersList from '/components/users/UsersList.jsx';
import UsersDetail from '/components/users/UsersDetail.jsx';
import './App.css';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));//pending Yonas "authToken" local storage
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
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
        <Route
          path='/products'
          element={
            <Products
            products={products}
            setProducts={setProducts}
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
      </Routes>
    </Router>
  );
}

export default App;
