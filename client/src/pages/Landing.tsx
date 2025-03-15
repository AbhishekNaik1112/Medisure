import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Clock,
  Heart,
  Wallet,
  CheckCircle,
  FileText,
  Timer,
  CreditCard,
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Clock size={40} />,
      title: 'Quick Processing',
      description: 'Get your claims processed within 24-48 hours.',
    },
    {
      icon: <Heart size={40} />,
      title: 'Health First',
      description: 'Focus on recovery while we handle the paperwork.',
    },
    {
      icon: <Wallet size={40} />,
      title: 'Easy Reimbursement',
      description: 'Direct deposits to your preferred bank account.',
    },
    {
      icon: <CheckCircle size={40} />,
      title: 'Trusted Service',
      description: 'Over 10,000 claims processed successfully.',
    },
  ];

  const processSteps = [
    {
      icon: <FileText size={40} />,
      title: '1. Submit Claim',
      desc: 'Fill out our simple form and upload your documents.',
    },
    {
      icon: <Timer size={40} />,
      title: '2. Quick Review',
      desc: 'Our team reviews your claim within 24 hours.',
    },
    {
      icon: <CreditCard size={40} />,
      title: '3. Get Reimbursed',
      desc: 'Receive your payment directly in your account.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="flex flex-col items-center justify-center text-center p-16 border-b border-gray-300">
        <Shield size={56} className="mb-6" />
        <h1 className="text-5xl font-extrabold tracking-tight">Insurance Claims Made Simple</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-700">
          Submit and manage your insurance claims with ease. Our streamlined process ensures quick
          approvals and faster reimbursements.
        </p>
        <button
          className="mt-6 px-8 py-3 bg-black text-white rounded-lg flex items-center gap-3 text-lg font-medium hover:scale-105 duration-300 cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Get Started <ArrowRight size={24} />
        </button>
      </div>
      <div className="text-center p-16">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
        <p className="text-gray-600 mt-4 text-lg">
          Experience a hassle-free claims process with our modern platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-sm"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 text-md mt-2 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center p-16 bg-gray-100">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <p className="text-gray-600 mt-4 text-lg">Three simple steps to process your claim.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-sm"
            >
              {step.icon}
              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
              <p className="text-gray-600 text-md mt-2 text-center">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center p-16">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-gray-600 mt-4 text-lg">
          Join thousands of satisfied customers who have simplified their insurance claims process
          with us.
        </p>
        <button
          className="mt-6 px-8 py-3 bg-black text-white rounded-lg flex items-center gap-3 text-lg font-medium hover:scale-105 duration-300 cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Get Started <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Landing;
