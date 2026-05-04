import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center px-6 sticky top-0 z-40 bg-white text-slate-900 w-full h-16 border-b border-slate-200 shadow-sm text-sm font-medium">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/10 text-body-md transition-all" 
            placeholder="Search tasks, projects, or team members..." 
            type="text" 
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-50 transition-colors duration-200 rounded-full cursor-pointer active:opacity-80">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 hover:bg-slate-50 transition-colors duration-200 rounded-full cursor-pointer active:opacity-80">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <span className="text-right hidden lg:block">
            <p className="font-bold leading-none">{user?.name || 'User'}</p>
            <p className="text-xs text-secondary">{user?.role || 'Member'}</p>
          </span>
          <div className="w-10 h-10 rounded-full border-2 border-primary-fixed bg-primary text-white flex items-center justify-center font-bold text-lg">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 hover:bg-red-50 text-red-500 transition-colors duration-200 rounded-full cursor-pointer active:opacity-80" title="Logout">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
