import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Templates({ user, onLogout }) {
  const templates = [
    {
      name: 'Professional CV',
      description: 'A clean and professional CV template for job applications',
      emoji: '📄',
      downloadName: 'professional_cv.docx',
    },
    {
      name: 'Modern CV',
      description: 'A modern, visually appealing CV with color accents',
      emoji: '🎨',
      downloadName: 'modern_cv.docx',
    },
    {
      name: 'Academic CV',
      description: 'CV template designed for academic and research positions',
      emoji: '🎓',
      downloadName: 'academic_cv.docx',
    },
    {
      name: 'Cover Letter',
      description: 'Professional cover letter template for job applications',
      emoji: '💌',
      downloadName: 'cover_letter.docx',
    },
    {
      name: 'Cover Letter (Brief)',
      description: 'Concise cover letter template for shorter applications',
      emoji: '✉️',
      downloadName: 'cover_letter_brief.docx',
    },
    {
      name: 'Interview Prep',
      description: 'Checklist and tips for preparing for interviews',
      emoji: '🎤',
      downloadName: 'interview_prep.pdf',
    },
  ];

  const handleDownload = (templateName) => {
    // In a real application, this would download actual template files
    alert(`Download started for: ${templateName}\n\nNote: In production, this would download an actual template file.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Navigation user={user} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 text-center">
          CV & Cover Letter Templates
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 text-lg">
          Download professional templates to help you land your dream job
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <div
              key={template.downloadName}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md-pro dark:shadow-lg dark:shadow-slate-900 hover:shadow-lg-pro dark:hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 group"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 h-32 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-indigo-700 transition-all duration-300">
                <span className="text-6xl">{template.emoji}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {template.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 min-h-12 text-sm">
                  {template.description}
                </p>
                <button
                  onClick={() => handleDownload(template.downloadName)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm-pro"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Tips for Using Templates</h2>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
              <span>Customize the template with your own information and experiences</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
              <span>Tailor your CV and cover letter for each job application</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
              <span>Keep your CV to one page if you have less than 5 years of experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
              <span>Use clear, professional fonts and consistent formatting</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold">✓</span>
              <span>Proofread for spelling and grammar errors</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
