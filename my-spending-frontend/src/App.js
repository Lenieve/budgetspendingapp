import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseOverview from './components/ExpenseOverview';
import FixedExpenses from './components/FixedExpenses';
import Flags from './components/Flags';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpenseOverview />} />
        <Route path="/fixed-expenses" element={<FixedExpenses />} />
        <Route path="/flags" element={<Flags />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
