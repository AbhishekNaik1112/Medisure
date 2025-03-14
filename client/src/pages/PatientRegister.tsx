import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientRegister = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('http://localhost:3000/users/register', { ...form, role: 'patient' });
      localStorage.setItem('role', 'patient');
      setSuccess(true);

      setTimeout(() => {
        navigate('/patient-dashboard');
      }, 1500);
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
      <div className="w-full max-w-md p-8 space-y-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Patient Registration</h2>
        <p className="text-gray-600 text-center">Create your patient account</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-center">Registration successful! Redirecting...</p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-black text-white rounded-md font-medium disabled:opacity-50 hover:scale-105 duration-300 cursor-pointer"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Already have an account?
          <button
            onClick={() => navigate('/login')}
            className="ml-1 text-blue-500 underline cursor-pointer"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;
