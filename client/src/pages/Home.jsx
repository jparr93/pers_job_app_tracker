import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Home({ user, onLogout }) {
  const features = [
    {
      title: 'Job Tracker',
      description: 'Manage your job applications with a Kanban board',
      icon: '📋',
      link: '/jobs',
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'Templates',
      description: 'Download CV and cover letter templates',
      icon: '📄',
      link: '/templates',
      color: 'from-green-500 to-green-700',
    },
    {
      title: 'Useful Advice',
      description: 'Get helpful job hunting tips',
      icon: '💡',
      link: '/advice',
      color: 'from-purple-500 to-purple-700',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Navigation user={user} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome, {user?.username}!
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Track your job applications and land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.link}
              to={feature.link}
              className="group"
            >
              <div className={`bg-gradient-to-br ${feature.color} rounded-xl shadow-md-pro hover:shadow-lg-pro transition-all duration-300 p-8 text-white h-full transform group-hover:translate-y--2`}>
                <div className="text-7xl mb-6">{feature.icon}</div>
                <h2 className="text-2xl font-bold mb-3">{feature.title}</h2>
                <p className="text-base opacity-95">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
