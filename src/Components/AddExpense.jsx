import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Fetch userId from local storage
    const token = localStorage.getItem('token');


    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            console.log('tokeninadd', token)
            console.log('userId', userId)
            // const expense = { expenseName, amount, date, description, userId }; // Include userId
            const response = await axios.post(
                'http://localhost:1212/api/expenses/add',
                { expenseName, amount, date, description, userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Use the token variable directly
                    }
                }
            );
            
            navigate('/expense-list'); // Navigate to expense list after adding
        } catch (error) {
            console.error('Failed to add expense:', error);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center" style={{ height: '100vh' }}>
            <h2 className="mt-4">Add Expense</h2>
            <Form onSubmit={handleAddExpense} style={{ width: '300px' }}>
                <Form.Group controlId="expenseName">
                    <Form.Label>Expense Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        placeholder="Enter expense name"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="amount" className="mt-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="date" className="mt-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="description" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        required
                    />
                </Form.Group>
                <Button type="submit" className="w-100 mt-4" variant="success">
                    Add Expense
                </Button>
            </Form>
        </Container>
    );
};

export default AddExpense;
