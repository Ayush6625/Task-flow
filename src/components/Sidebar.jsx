import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col py-6 px-4 z-50 bg-slate-50 border-r border-slate-200 text-sm tracking-wide">
      <div className="mb-8 px-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
        </div>
        <div>
          <h1 className="text-base font-black text-slate-900">Team Task Manager</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Enterprise Edition</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2 font-semibold rounded-md transition-all active:scale-100 ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/projects" 
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2 font-semibold rounded-md transition-all active:scale-100 ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <span className="material-symbols-outlined">folder_managed</span>
          <span>Projects</span>
        </NavLink>
        <NavLink 
          to="/tasks" 
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2 font-semibold rounded-md transition-all active:scale-100 ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <span className="material-symbols-outlined">assignment_turned_in</span>
          <span>My Tasks</span>
        </NavLink>
      </nav>
      <div className="mt-auto border-t border-slate-200 pt-4">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-all active:scale-100">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
