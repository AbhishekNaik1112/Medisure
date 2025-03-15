import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Loader, ArrowRight, User } from 'lucide-react';

const PatientRegister = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Reusable styles
  const inputStyle = "w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:outline-none transition-all";
  const buttonStyle = "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:gap-3";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('https://claims-management-system-2d30.onrender.com/users/register', { 
        ...form, 
        role: 'patient' 
      });
      localStorage.setItem('role', 'patient');
      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5F5] to-[#E0E7FF] font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl mx-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#2A5C82] to-[#FF6B6B] bg-clip-text text-transparent">
            Patient Registration
          </h2>
          <p className="text-gray-600 mt-2">Create your secure patient account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <User className="text-red-600" size={20} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-50 text-green-600 rounded-lg flex items-center gap-2">
            <Loader className="animate-spin" size={20} />
            Registration successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A5C82]" size={20} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className={`${inputStyle} focus:ring-[#2A5C82] focus:border-[#2A5C82]`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A5C82]" size={20} />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className={`${inputStyle} focus:ring-[#2A5C82] focus:border-[#2A5C82]`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${buttonStyle} bg-[#2A5C82] text-white hover:bg-[#1E4466] hover:shadow-lg`}
          >
            {loading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <>
                Create Account <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#FF6B6B] font-semibold hover:text-[#FF5252] transition-colors"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;