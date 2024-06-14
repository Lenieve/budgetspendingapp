import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/expenses">Expense Overview</Link></li>
        <li><Link to="/fixed-expenses">Fixed Expenses</Link></li>
        <li><Link to="/flags">Flags</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
