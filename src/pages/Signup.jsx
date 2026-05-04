import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value.toUpperCase(); // 'MEMBER' or 'ADMIN'

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }
      
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-background min-h-screen flex flex-col">
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 px-6 w-full max-w-full">
          <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-inter antialiased">
            TaskFlow
          </div>
          <div className="flex items-center gap-4">
            <a className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 px-3 py-2 rounded-lg font-label-sm" href="#">
              Support
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-container-margin pt-12 pb-12">
        <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl p-stack-lg flex flex-col gap-stack-lg shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] border border-slate-200">
          <div className="flex flex-col gap-stack-xs text-center">
            <h1 className="font-h1 text-h1 text-on-surface">Get started</h1>
            <p className="font-body-md text-on-surface-variant">Create your professional workspace today.</p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          
          <form className="flex flex-col gap-stack-md" onSubmit={handleSignup}>
            <div className="flex flex-col gap-stack-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="name">Full Name</label>
              <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all font-body-md" id="name" placeholder="Alex Rivera" type="text" required />
            </div>
            
            <div className="flex flex-col gap-stack-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="email">Email Address</label>
              <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all font-body-md" id="email" placeholder="name@company.com" type="email" required />
            </div>
            
            <div className="flex flex-col gap-stack-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">Password</label>
              <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all font-body-md" id="password" placeholder="••••••••" type="password" required />
            </div>
            
            <div className="flex flex-col gap-stack-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant">Role Selection</label>
              <div className="grid grid-cols-2 gap-stack-sm p-1 bg-surface-container-low rounded-lg border border-outline-variant">
                <label className="relative flex items-center justify-center cursor-pointer group">
                  <input defaultChecked className="peer sr-only" name="role" type="radio" value="member"/>
                  <div className="w-full py-2 text-center rounded-md font-body-md text-on-surface-variant transition-all peer-checked:bg-white peer-checked:text-primary-container peer-checked:shadow-sm peer-checked:font-semibold">
                    Member
                  </div>
                </label>
                <label className="relative flex items-center justify-center cursor-pointer group">
                  <input className="peer sr-only" name="role" type="radio" value="admin"/>
                  <div className="w-full py-2 text-center rounded-md font-body-md text-on-surface-variant transition-all peer-checked:bg-white peer-checked:text-primary-container peer-checked:shadow-sm peer-checked:font-semibold">
                    Admin
                  </div>
                </label>
              </div>
            </div>
            
            <button className="mt-stack-sm w-full bg-primary-container text-white font-semibold py-4 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
              Create Account
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>
          
          <div className="flex items-center gap-stack-sm text-center justify-center">
            <span className="font-body-md text-on-surface-variant">Already have an account?</span>
            <Link className="font-body-md text-primary font-semibold hover:underline" to="/login">Log in</Link>
          </div>
          
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Secure Environment</span></div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 px-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-7xl mx-auto">
          <div className="font-inter text-xs text-slate-500 dark:text-slate-400">
            © 2024 TaskFlow Professional. All rights reserved.
          </div>
          <nav className="flex gap-6">
            <a className="text-xs font-inter text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-150" href="#">Privacy Policy</a>
            <a className="text-xs font-inter text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-150" href="#">Terms of Service</a>
            <a className="text-xs font-inter text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-150" href="#">Security</a>
            <a className="text-xs font-inter text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-150" href="#">Status</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
