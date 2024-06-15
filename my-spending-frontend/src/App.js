import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseOverview from './components/ExpenseOverview';
import FixedExpenses from './components/FixedExpenses';
import Flags from './components/Flags';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthenticatedApp />
      </Router>
    </AuthProvider>
  );
};

const AuthenticatedApp = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><ExpenseOverview /></ProtectedRoute>} />
        <Route path="/fixed-expenses" element={<ProtectedRoute><FixedExpenses /></ProtectedRoute>} />
        <Route path="/flags" element={<ProtectedRoute><Flags /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
