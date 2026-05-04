import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, Circle, ArrowRight, Loader2, Plus } from 'lucide-react';
import CreateTaskModal from '../components/CreateTaskModal';

const Tasks = () => {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        // Filter tasks to only show ones assigned to the user
        const myTasks = data.filter(task => task.assigneeId === user?.id);
        setTasks(myTasks);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [token, user]);

  const handleTaskCreated = (newTask) => {
    // If the task is assigned to the current user, add it to the list
    if (newTask.assigneeId === user?.id) {
      setTasks(prev => [...prev, newTask]);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    pending: tasks.filter(t => t.status === 'TODO' || t.status === 'PENDING').length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT': return 'bg-rose-500/10 text-rose-600 border-rose-200';
      case 'HIGH': return 'bg-orange-500/10 text-orange-600 border-orange-200';
      case 'LOW': return 'bg-slate-500/10 text-slate-600 border-slate-200';
      default: return 'bg-blue-500/10 text-blue-600 border-blue-200'; // MEDIUM
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'IN_PROGRESS': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="flex-1 h-full overflow-auto bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">My Tasks</h1>
            <p className="text-slate-500 text-lg">Manage and track your assigned work across all projects.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors active:scale-95 shadow-sm shadow-indigo-200"
          >
            <Plus className="w-5 h-5" />
            Create Task
          </button>
        </motion.header>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        >
          {[
            { label: 'Total Tasks', value: stats.total, color: 'bg-indigo-500' },
            { label: 'In Progress', value: stats.inProgress, color: 'bg-blue-500' },
            { label: 'Completed', value: stats.completed, color: 'bg-emerald-500' },
            { label: 'Pending', value: stats.pending, color: 'bg-amber-500' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-1 h-full ${stat.color} transition-all duration-300 group-hover:w-2`} />
              <p className="text-slate-500 font-medium mb-1 pl-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-800 pl-2">{stat.value}</h3>
            </div>
          ))}
        </motion.div>

        {/* Task List */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-indigo-500" />
              Current Assignments
            </h2>
            <div className="text-sm font-medium text-slate-500">
              {tasks.length} tasks found
            </div>
          </div>
          
          <div className="p-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                <p className="text-lg font-medium">Loading your tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-slate-300" />
                </div>
                <p className="text-lg font-medium text-slate-500 mb-1">You're all caught up!</p>
                <p className="text-sm">No tasks assigned to you at the moment.</p>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-2"
              >
                <AnimatePresence>
                  {tasks.map(task => (
                    <motion.div 
                      key={task.id} 
                      variants={itemVariants}
                      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                    >
                      <div className="shrink-0 transition-transform group-hover:scale-110">
                        {getStatusIcon(task.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base font-semibold truncate ${task.status === 'COMPLETED' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-slate-500 truncate mt-0.5">
                            {task.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${getPriorityColor(task.priority)}`}>
                          {task.priority || 'MEDIUM'}
                        </span>
                        
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors opacity-0 group-hover:opacity-100">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTaskCreated={handleTaskCreated} 
      />
    </div>
  );
};

export default Tasks;
