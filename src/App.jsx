import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderList from './components/orders/OrderList.jsx';
import OrderDetails from './components/orders/OrderDetails.jsx';
import './App.css'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));//pending Yonas "authToken" local storage
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");//pending Yonas "authToken" local storage
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/orders" element={token ? <OrderList token={token} /> : <Navigate to="/login" replace />}
        />
        <Route path="/orders/:id" element={token ? <OrderDetails token={token} /> : <Navigate to="/login" replace />}
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
  )
}

export default App
