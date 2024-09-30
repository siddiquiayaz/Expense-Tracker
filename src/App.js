import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpenseList from './Components/ExpenseLst';
import AddExpense from './Components/AddExpense';
import UpdateExpense from './Components/UpdateExpense';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes wrapped in PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense-list" element={<ExpenseList />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/update-expense/:id" element={<UpdateExpense />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
