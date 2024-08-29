import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLoginStore from '../LoginStore';
import axios from 'axios';

interface user {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface ResponseData {
  message: string;
  user?: user;
}

export default function Signup() {
  const { setIsLogin } = useLoginStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLogin(true);
      navigate('/');
    }
  }, [setIsLogin, navigate]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length > 20) {
      newErrors.name = 'Name cannot exceed 20 characters';
      isValid = false;
    } else if (formData.name.startsWith(' ')) {
      newErrors.name = 'Name cannot start with a space';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter and one special character';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch('https://backend.salihamajid777.workers.dev/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data: ResponseData = await res.json();
      console.log('API Response:', data);

      if (data.user && data.user.id) {
        localStorage.setItem('authToken', data.user.id);
        setIsLogin(true);
        navigate('/');
      } else {
        console.error('Error: User or ID is missing in the response.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="wrapper signUp">
      <div className="form">
        <div className="heading">SIGN UP</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name &&  <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </div>
          <button type="submit">Submit</button>
          <h2 className="text-center or">OR</h2>
        </form>
        <p>
          Already Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
