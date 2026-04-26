import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { jobsAPI } from '../utils/api';
import KanbanBoard from '../components/KanbanBoard';

export default function JobTracker({ user, onLogout }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    status: 'Saved',
    applicationDate: '',
    keyContacts: '',
    salaryExpectations: '',
    notes: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAll();
      setJobs(response.data);
    } catch (err) {
      setError('Failed to load jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title) {
        setError('Job title is required');
        return;
      }

      await jobsAPI.create(formData);
      setFormData({
        title: '',
        link: '',
        status: 'Saved',
        applicationDate: '',
        keyContacts: '',
        salaryExpectations: '',
        notes: '',
      });
      setShowForm(false);
      setError('');
      await fetchJobs();
    } catch (err) {
      setError('Failed to create job');
      console.error(err);
    }
  };

  const handleUpdateStatus = async (jobId, newStatus) => {
    try {
      // Optimistic update - update local state immediately
      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      );
      setJobs(updatedJobs);

      // Make API call in background
      await jobsAPI.update(jobId, { status: newStatus });
    } catch (err) {
      // Revert on error
      setError('Failed to update job status');
      await fetchJobs();
      console.error(err);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await jobsAPI.delete(jobId);
        await fetchJobs();
      } catch (err) {
        setError('Failed to delete job');
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Navigation user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Job Tracker</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm-pro"
          >
            {showForm ? 'Cancel' : '+ Add Job'}
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 dark:bg-rose-900 dark:bg-opacity-20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm-pro dark:shadow-lg dark:shadow-slate-900 p-6 mb-8 border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Job Link
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option>Saved</option>
                  <option>Started</option>
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Successful</option>
                  <option>Unsuccessful</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Application Date
                </label>
                <input
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Key Contacts
                </label>
                <input
                  type="text"
                  value={formData.keyContacts}
                  onChange={(e) => setFormData({ ...formData, keyContacts: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Name, email, or phone"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Salary Expectations
                </label>
                <input
                  type="text"
                  value={formData.salaryExpectations}
                  onChange={(e) => setFormData({ ...formData, salaryExpectations: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="e.g., £50,000 - £60,000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  rows="3"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm-pro"
            >
              Add Job
            </button>
          </form>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-lg text-slate-600 dark:text-slate-400">Loading jobs...</p>
          </div>
        ) : (
          <KanbanBoard
            jobs={jobs}
            onUpdateStatus={handleUpdateStatus}
            onDeleteJob={handleDeleteJob}
          />
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
