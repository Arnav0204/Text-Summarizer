import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center'>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;