import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:1212/auth/register', { username, password, email, fullName });
            navigate('/login');  // Navigate to login after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div style={{ width: '350px', padding: '30px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 className="mb-4 text-center">Register</h2>
                <Form onSubmit={handleRegister}>
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
                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="fullName" className="mt-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
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
                        Register
                    </Button>
                </Form>
                <p className="mt-3 text-center">
                    Already have an account? <Button variant="link" onClick={() => navigate('/login')} className="text-success">Login here</Button>
                </p>
            </div>
        </Container>
    );
};

export default Register;
