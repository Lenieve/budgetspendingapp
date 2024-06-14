import React, { useState } from 'react';

const Dashboard = () => {
  const [income, setIncome] = useState(0);

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  return (
    <div>
      <h1>Welcome, [Username]</h1>
      <div>
        <label>Income: </label>
        <input type="number" value={income} onChange={handleIncomeChange} />
      </div>
      <div>
        <h2>Daily Balance: $[DailyBalance]</h2>
      </div>
      <div>
        <h2>Monthly Overview</h2>
        {/* Graph for daily expenses vs budget will go here */}
      </div>
      <div>
        <button>Add Expense/Refund</button>
      </div>
    </div>
  );
};

export default Dashboard;
