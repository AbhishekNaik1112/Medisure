import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InsurerRegister = () => {
  const [form, setForm] = useState({ email: '', password: '', companyName: '', licenseNumber: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('https://claims-management-system-2d30.onrender.com/users/register', { ...form, role: 'insurer' });
      localStorage.setItem('role', 'insurer');
      navigate('/login');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black font-sans p-6">
      <div className="w-full max-w-lg p-8 bg-white border border-gray-200 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">Insurer Registration</h2>
        <p className="text-gray-600 text-center mt-2">Create your insurance provider account</p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-gray-700 font-medium">Company Name</label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              placeholder="Enter your company name"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="licenseNumber" className="block text-gray-700 font-medium">License Number</label>
            <input
              id="licenseNumber"
              type="text"
              name="licenseNumber"
              placeholder="Enter your license number"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg font-medium disabled:opacity-50 hover:scale-105 transform transition duration-300"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <button
            onClick={() => navigate('/login')}
            className="ml-1 text-blue-500 underline cursor-pointer hover:text-blue-700 transition"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsurerRegister;
