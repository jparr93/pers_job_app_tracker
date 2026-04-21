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
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome, {user?.username}!
          </h1>
          <p className="text-xl text-gray-600">
            Track your job applications and land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.link}
              to={feature.link}
              className="transform hover:scale-105 transition duration-300"
            >
              <div className={`bg-gradient-to-br ${feature.color} rounded-xl shadow-lg p-8 text-white h-full`}>
                <div className="text-7xl mb-6">{feature.icon}</div>
                <h2 className="text-3xl font-bold mb-3">{feature.title}</h2>
                <p className="text-lg opacity-90">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
