import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [spendings, setSpendings] = useState([]);
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [flags, setFlags] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        // Fetch user profile
        const profileResponse = await fetch('http://localhost:4200/api/profile', { headers });
        const profileData = await profileResponse.json();

        // Fetch spendings
        const spendingsResponse = await fetch('http://localhost:4200/api/spending', { headers });
        const spendingsData = await spendingsResponse.json();

        // Fetch fixed expenses
        const fixedExpensesResponse = await fetch('http://localhost:4200/api/fixedexpense', { headers });
        const fixedExpensesData = await fixedExpensesResponse.json();

        // Fetch flags
        const flagsResponse = await fetch('http://localhost:4200/api/flag', { headers });
        const flagsData = await flagsResponse.json();

        if (profileData.success && spendingsData.success && fixedExpensesData.success && flagsData.success) {
          setProfile(profileData.data);
          setSpendings(spendingsData.data);
          setFixedExpenses(fixedExpensesData.data);
          setFlags(flagsData.data);
        } else {
          setError('Failed to fetch some data.');
        }
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {profile.username}</h2>
      <h3>Spending Overview:</h3>
      <ul>
        {spendings.map(spending => (
          <li key={spending._id}>
            {spending.description}: ${spending.amount}
          </li>
        ))}
      </ul>
      <h3>Fixed Expenses:</h3>
      <ul>
        {fixedExpenses.map(expense => (
          <li key={expense._id}>
            {expense.description}: ${expense.amount}
          </li>
        ))}
      </ul>
      <h3>Flags:</h3>
      <ul>
        {flags.map(flag => (
          <li key={flag._id}>
            {flag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
