import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:3000/auth/login`, form);
      const { role, token } = response.data;

      if (role && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", form.email);
        navigate(role === "patient" ? "/patient-dashboard" : "/insurer-dashboard");
      } else {
        alert("Invalid login response. Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data?.message || "Invalid email or password.");
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-600 text-center mt-2">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 text-lg font-medium hover:scale-105 duration-300 cursor-pointer"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">Don't have an account?</p>
        <div className="flex flex-col mt-2 gap-2">
          <button onClick={() => navigate("/patient-register")} className="w-full border border-black text-black py-2 rounded-lg hover:scale-105 duration-300 cursor-pointer">Register as a Patient</button>
          <button onClick={() => navigate("/insurer-register")} className="w-full border border-black text-black py-2 rounded-lg hover:scale-105 duration-300 cursor-pointer">Register as an Insurer</button>
        </div>
      </div>
    </div>
  );
};

export default Login;