import React from 'react';

const Dashboard = () => {
  return (
    <>
      <section className="flex flex-col gap-unit">
        <h2 className="font-bold text-h1 text-on-surface">Dashboard Overview</h2>
        <p className="text-secondary font-body-lg">Welcome back, Alex. Here's what's happening across your projects today.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-white border border-surface-variant shadow-sm p-stack-md rounded-xl flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg">
              <span className="material-symbols-outlined">list_alt</span>
            </div>
            <span className="text-label-sm text-secondary bg-surface-container-high px-2 py-1 rounded-full">+12%</span>
          </div>
          <div>
            <p className="text-label-sm text-secondary uppercase tracking-wider">Total Tasks</p>
            <p className="font-bold text-h1">124</p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-primary"></div>
        </div>

        <div className="bg-white border border-surface-variant shadow-sm p-stack-md rounded-xl flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <span className="text-label-sm text-secondary bg-surface-container-high px-2 py-1 rounded-full">84%</span>
          </div>
          <div>
            <p className="text-label-sm text-secondary uppercase tracking-wider">Completed Tasks</p>
            <p className="font-bold text-h1">82</p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-on-secondary-container"></div>
        </div>

        <div className="bg-white border border-surface-variant shadow-sm p-stack-md rounded-xl flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-label-sm text-secondary bg-surface-container-high px-2 py-1 rounded-full">Active</span>
          </div>
          <div>
            <p className="text-label-sm text-secondary uppercase tracking-wider">Pending Tasks</p>
            <p className="font-bold text-h1">38</p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-on-tertiary-fixed-variant"></div>
        </div>

        <div className="bg-white border border-surface-variant shadow-sm p-stack-md rounded-xl flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-error-container text-on-error-container rounded-lg">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <span className="text-label-sm text-error bg-error-container px-2 py-1 rounded-full">Urgent</span>
          </div>
          <div>
            <p className="text-label-sm text-secondary uppercase tracking-wider">Overdue Tasks</p>
            <p className="font-bold text-h1">4</p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-error"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <section className="lg:col-span-2 bg-white border border-surface-variant shadow-sm rounded-xl overflow-hidden flex flex-col">
          <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              <h3 className="font-semibold text-h3">Recent Activity</h3>
            </div>
            <button className="text-label-sm text-primary font-bold hover:underline">View All</button>
          </div>
          <div className="p-stack-md space-y-stack-md">
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-outline-variant"></div>
              <div className="relative space-y-stack-lg">
                <div className="flex items-start gap-4">
                  <div className="absolute left-[-25px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-white"></div>
                  <img alt="Avatar" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh1kNiPeYpklMVXn9RLGKk6fiJFrYpbob-v3xoujUqEuyqRpYq2oLirLOfLKX0hfSdTMvkao4uDR1yRLO1E3cnHxcNUasGe6vpXiPl6SpOo8cRQHP6WQE9Zu9dbCeQ3HG_Dayh9vGwgP4ObHKTH0gFUn25Toc0O_scwweoNgJ4UIsoLH5gNFh4A9GkeXfrdeo9Ce882t_q_zmF1D_sOedDo9Q8i_wIwSfcI1ag_eWLFiyTmOKKn-6ubI-DO1Ts4O4loMHxmOh8ols"/>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-on-surface">Jordan Smith <span className="font-normal text-secondary">created task</span> Update Security Protocols</p>
                      <span className="text-xs text-secondary">2m ago</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <span className="text-label-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold">Urgent</span>
                      <span className="text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary">Security Team</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="absolute left-[-25px] top-1 w-4 h-4 rounded-full bg-outline-variant ring-4 ring-white"></div>
                  <img alt="Avatar" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX6P7chSXkHIVOTdTGsPzMqax20ztX6DWmb2lfJyl0LJIABz23RZshCdu0MGx5bA4fIkmo-f5g-3w7HIPm4HyHeKCSz9xVnCNheUjtzkO5YH9FsX71aoSqlFWh5EDnKeZW4MEDfI8ton5ZGdTXQbLKWE5hAXwXiWzgaGZh9FLLLWmCCIgl363ZVRM59Pl-QG08dxCegBn7rhYt-rlr1PDt8sd4WVcaX-kNwUsoaqqLXRjLJr3_70SlJ6uf10qQWmSw8keUbAqJWLo"/>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-on-surface">Sarah Chen <span className="font-normal text-secondary">completed</span> Finalize API Documentation</p>
                      <span className="text-xs text-secondary">45m ago</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-label-sm px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-bold">Completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="absolute left-[-25px] top-1 w-4 h-4 rounded-full bg-outline-variant ring-4 ring-white"></div>
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs">BT</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-on-surface">Backend Team <span className="font-normal text-secondary">updated status on</span> Database Migration</p>
                      <span className="text-xs text-secondary">3h ago</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-label-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-surface-variant shadow-sm rounded-xl overflow-hidden flex flex-col">
          <div className="p-stack-md border-b border-outline-variant bg-slate-50/50">
            <h3 className="font-semibold text-h3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">bolt</span>
              Quick Actions
            </h3>
          </div>
          <div className="p-stack-md space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-outline-variant hover:bg-slate-50 transition-all group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">add_task</span>
                <span className="font-bold">Create New Task</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-outline-variant hover:bg-slate-50 transition-all group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">group_add</span>
                <span className="font-bold">Invite Member</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-outline-variant hover:bg-slate-50 transition-all group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">file_upload</span>
                <span className="font-bold">Import CSV</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
            </button>
            <div className="pt-stack-md">
              <div className="p-stack-md bg-primary-container rounded-xl text-on-primary-container relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="font-bold text-white mb-1">Upgrade to Pro</p>
                  <p className="text-xs text-on-primary-container/80 mb-3">Unlock advanced analytics and unlimited projects for your entire team.</p>
                  <button className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-xs hover:bg-opacity-90 transition-all">Learn More</button>
                </div>
                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl opacity-10 rotate-12">rocket_launch</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
