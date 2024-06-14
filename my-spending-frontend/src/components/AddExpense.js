import React, { useState } from 'react';

const AddExpense = ({ isRefund }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [flag, setFlag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseAmount = isRefund ? -amount : amount;
    // Handle adding expense or refund logic here
  };

  return (
    <div>
      <h2>{isRefund ? 'Add Refund' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Flag: </label>
          <select value={flag} onChange={(e) => setFlag(e.target.value)}>
            <option value="">Select Flag</option>
            {/* Options for flags */}
          </select>
        </div>
        <button type="submit">{isRefund ? 'Add Refund' : 'Add Expense'}</button>
      </form>
    </div>
  );
};

export default AddExpense;
