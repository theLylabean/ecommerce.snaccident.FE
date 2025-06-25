import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderList from './components/orders/OrderList.jsx';
import OrderDetails from './components/orders/OrderDetails.jsx';
import UsersList from './components/users/UsersList.jsx'; 
import UsersDetail from './components/users/UsersDetail.jsx'; 
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import Account from './components/account/Account.jsx';
import './App.css';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

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

        {/* Auth */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />

        {/* Account */}
        <Route
          path="/account"
          element={token ? <Account token={token} /> : <Navigate to="/login" replace />}
        />

        {/* Home or redirect */}
        <Route path="/" element={<Navigate to={token ? "/account" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;

