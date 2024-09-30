import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expense, setExpense] = useState({ expenseName: '', amount: '', date: '', description: '' });
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get(`http://localhost:1212/api/expenses/${id}`, {
                    headers: {

                        Authorization: `Bearer ${token}`,
                    }

                });

                setExpense(response.data);
            } catch (error) {
                console.error('Failed to fetch expense:', error);
            }
        };

        fetchExpense();
    }, [id]);

    const handleUpdateExpense = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1212/api/expenses/${id}`, expense, {
                headers: {
                
                    Authorization: `Bearer ${token}`,
                }

            });
            navigate('/expense-list'); // Navigate to expense list after updating
        } catch (error) {
            console.error('Failed to update expense:', error);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center" style={{ height: '100vh' }}>
            <h2 className="mt-4">Update Expense</h2>
            <Form onSubmit={handleUpdateExpense} style={{ width: '300px' }}>
                <Form.Group controlId="expenseName">
                    <Form.Label>Expense Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={expense.expenseName}
                        onChange={(e) => setExpense({ ...expense, expenseName: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="amount" className="mt-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        value={expense.amount}
                        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="date" className="mt-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={expense.date.substring(0, 10)} // Format date for input
                        onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="description" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={expense.description}
                        onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="w-100 mt-4" variant="success">
                    Update Expense
                </Button>
            </Form>
        </Container>
    );
};

export default UpdateExpense;
