import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => {
  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="ml-64 flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-container-margin space-y-stack-lg">
          <Outlet />
        </main>
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;
