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
      await jobsAPI.update(jobId, { status: newStatus });
      await fetchJobs();
    } catch (err) {
      setError('Failed to update job status');
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
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Job Tracker</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            {showForm ? 'Cancel' : '+ Add Job'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Link
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Date
                </label>
                <input
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Contacts
                </label>
                <input
                  type="text"
                  value={formData.keyContacts}
                  onChange={(e) => setFormData({ ...formData, keyContacts: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Name, email, or phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Expectations
                </label>
                <input
                  type="text"
                  value={formData.salaryExpectations}
                  onChange={(e) => setFormData({ ...formData, salaryExpectations: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., £50,000 - £60,000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              Add Job
            </button>
          </form>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-lg text-gray-600">Loading jobs...</p>
          </div>
        ) : (
          <KanbanBoard
            jobs={jobs}
            onUpdateStatus={handleUpdateStatus}
            onDeleteJob={handleDeleteJob}
          />
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
