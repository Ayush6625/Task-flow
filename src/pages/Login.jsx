import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }
      
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm fixed top-0 w-full z-50">
        <div className="flex justify-between items-center h-16 px-6 w-full max-w-full">
          <div className="font-h2 text-slate-900 dark:text-slate-50 font-bold tracking-tight">TaskFlow</div>
          <div className="flex items-center gap-4">
            <a className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 px-3 py-2 rounded-lg font-label-sm" href="#">Support</a>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-container-margin pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter max-w-6xl w-full mx-auto">
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-center p-stack-lg bg-primary-container rounded-xl overflow-hidden relative min-h-[500px] shadow-lg">
            <div className="relative z-10">
              <h1 className="font-h1 text-white mb-stack-md">Streamline your team’s velocity.</h1>
              <p className="font-body-lg text-on-primary-container max-w-md">Experience the most efficient task management platform for high-stakes corporate environments. Clarity of information, delivered at scale.</p>
            </div>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img alt="" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1Uo5CVVLENE6YKLPXxF9wXRotd_yptAir3RFLCSatJrbDt-Z5T9JyNL3kHoOIA9W9LVLmPlDrbGELuG19LGwnnqXl00u1EjrhC0ZeBTZWnDBEaJ6drNVvdDuHUsp8Ixo5PLSFnhhk3oniJ7cjmidhqkYCnAu2VA5wxrMjMxRYTMq6uoU0U0OI9Gu0hRjo1ZiEoQi3A39idDqqAzqqLLot2_YMCzdGNJ2ZasPWWoF0A8fshdxaxYhf22uEVjDJztObDB7hOFZXxtU"/>
            </div>
            <div className="mt-stack-lg flex items-center gap-stack-sm relative z-10">
              <div className="w-2 h-2 rounded-full bg-tertiary-fixed"></div>
              <span className="text-white font-label-sm">Trusted by 500+ global enterprises</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
              <div className="mb-stack-lg">
                <h2 className="font-h2 text-primary">Login</h2>
                <p className="font-body-md text-on-surface-variant mt-stack-xs">Access your professional workspace.</p>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <form className="space-y-stack-md" onSubmit={handleLogin}>
                <div className="space-y-unit">
                  <label className="font-label-sm text-on-surface-variant" htmlFor="email">Email Address</label>
                  <input className="w-full px-4 py-3 rounded border border-outline-variant bg-white focus:outline-none focus:ring-2 focus:ring-primary-container/10 focus:border-primary-container transition-all duration-200" id="email" name="email" placeholder="name@company.com" type="email" required />
                </div>
                <div className="space-y-unit">
                  <div className="flex justify-between items-center">
                    <label className="font-label-sm text-on-surface-variant" htmlFor="password">Password</label>
                    <a className="text-xs font-semibold text-primary-container hover:underline" href="#">Forgot password?</a>
                  </div>
                  <input className="w-full px-4 py-3 rounded border border-outline-variant bg-white focus:outline-none focus:ring-2 focus:ring-primary-container/10 focus:border-primary-container transition-all duration-200" id="password" name="password" placeholder="••••••••" type="password" required />
                </div>
                <div className="flex items-center gap-stack-sm py-2">
                  <input className="w-4 h-4 rounded border-outline-variant text-primary-container focus:ring-primary-container" id="remember" type="checkbox"/>
                  <label className="font-body-md text-on-surface-variant" htmlFor="remember">Keep me logged in</label>
                </div>
                <button className="w-full bg-primary-container text-white font-h3 py-4 rounded-lg hover:bg-slate-800 active:opacity-80 transition-all duration-200 flex items-center justify-center gap-stack-sm" type="submit">
                  Login
                  <span className="material-symbols-outlined text-xl">login</span>
                </button>
              </form>
              <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant text-center">
                <p className="font-body-md text-on-surface-variant">
                  Don't have an account? 
                  <Link className="text-primary-container font-semibold hover:underline ml-1" to="/signup">Sign up</Link>
                </p>
              </div>
            </div>

            <div className="mt-stack-md flex items-center justify-between gap-stack-md">
              <button className="flex-1 py-2 px-4 border border-outline-variant rounded-lg bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 font-label-sm">
                <img alt="Google" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyyjcvgvaCb8dULkssTc4NfUr3be83HbklhBUYEJOxcOrFdpE9M5VBXIP_ReRO2EuAN3cjwqk1io941VF4AsWvDliVo-qenHyn_-pDhoPtB9fX2R2zVO8AESHEC-Ia6AISpe3JhYSoPdWgTpj4mZAJJaOUe0eUIr_i6XoDqyECH0Kghq_2_T11vw1EUkK6FY55ZJjQ6o-a69SMmxxgh1viuyJmWKww3o5PsUPGORBjFb6aEL5bn5Ldh6s7JA5XUKDzqPtN-S7ZiCQ"/>
                SSO Login
              </button>
              <button className="flex-1 py-2 px-4 border border-outline-variant rounded-lg bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 font-label-sm">
                <span className="material-symbols-outlined text-sm">terminal</span>
                Developer Key
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 gap-4">
          <div className="font-label-sm text-slate-500 dark:text-slate-400">© 2024 TaskFlow Professional. All rights reserved.</div>
          <div className="flex gap-6">
            <a className="text-xs font-inter text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-150" href="#">Privacy Policy</a>
            <a className="text-xs font-inter text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-150" href="#">Terms of Service</a>
            <a className="text-xs font-inter text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-150" href="#">Security</a>
            <a className="text-xs font-inter text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-150" href="#">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
