import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const userId = localStorage.getItem('userId') || 123456; // Fetch userId from local storage
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`http://localhost:1212/api/expenses/all/${userId}`
                    ,
                    {
                        headers: { Authorization: `Bearer ${token}` }, // Set token in headers
                    }
                );
                setExpenses(response.data);
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
            }
        };

        fetchExpenses();
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:1212/api/expenses/${id}` ,
                {
                    headers: { Authorization: `Bearer ${token}` }, // Set token in headers
                }
            );
            setExpenses(expenses.filter(expense => expense.id !== id)); // Update state to remove deleted expense
        } catch (error) {
            console.error('Failed to delete expense:', error);
        }
    };

    const handleUpdate = (id) => {
        // Navigate to update page
        window.location.href = `/update-expense/${id}`;
    };

    return (
        <Container>
            <h2 className="mt-4">Expense List</h2>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Expense Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.expenseName}</td>
                            <td>{expense.amount}</td>
                            <td>{new Date(expense.date).toLocaleDateString()}</td>
                            <td>{expense.description}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleUpdate(expense.id)}>
                                    Update
                                </Button>
                                <Button variant="danger" className="ms-2" onClick={() => handleDelete(expense.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ExpenseList;
