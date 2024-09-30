import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <h1>Welcome to Expense Tracker</h1>
            <div className="mt-4">
                <Button variant="success" className="me-2" onClick={() => navigate('/add-expense')}>
                    Add Expense
                </Button>
                <Button variant="info" onClick={() => navigate('/expense-list')}>
                    View Expense List
                </Button>
            </div>
        </Container>
    );
};

export default Dashboard;
