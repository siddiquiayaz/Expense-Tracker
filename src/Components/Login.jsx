import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1212/authenticate', { username, password });
            // Assuming JWT is returned, store it in localStorage
            localStorage.setItem('token', response.data.jwtToken);
            localStorage.setItem('userId', response.data.username);
            const token = localStorage.getItem('token');
           
            console.log('token', token);
            navigate('/dashboard');  // Redirect to the dashboard or homepage
            
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div style={{ width: '350px', padding: '30px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 className="mb-4 text-center">Login</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-4" variant="success">
                        Login
                    </Button>
                </Form>
                <p className="mt-3 text-center">
                    New user? <Button variant="link" onClick={() => navigate('/register')} className="text-success">Register here</Button>
                </p>
            </div>
        </Container>
    );
};

export default Login;
