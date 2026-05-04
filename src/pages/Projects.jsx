import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Projects = () => {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) setProjects(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [token]);

  return (
    <div className="flex-1 overflow-auto bg-surface p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-on-surface mb-2">Projects Directory</h1>
          <p className="font-body-md text-on-surface-variant">View and manage all active team projects.</p>
        </header>

        {user?.role === 'ADMIN' && (
          <div className="mb-6">
             <button className="bg-primary text-on-primary font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center gap-2">
               <span className="material-symbols-outlined">add</span>
               Create New Project
             </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            projects.map(project => (
              <div key={project.id} className="bg-surface-variant rounded-xl p-6 border border-outline">
                <h2 className="font-heading text-xl font-bold text-on-surface mb-2">{project.name}</h2>
                <p className="font-body-md text-on-surface-variant mb-4">{project.description || 'No description provided.'}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Owner ID: {project.ownerId}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
