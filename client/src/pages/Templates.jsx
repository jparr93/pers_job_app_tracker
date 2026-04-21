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
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          CV & Cover Letter Templates
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Download professional templates to help you land your dream job
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <div
              key={template.downloadName}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-32 flex items-center justify-center">
                <span className="text-6xl">{template.emoji}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4 min-h-12">
                  {template.description}
                </p>
                <button
                  onClick={() => handleDownload(template.downloadName)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Using Templates</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Customize the template with your own information and experiences</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Tailor your CV and cover letter for each job application</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Keep your CV to one page if you have less than 5 years of experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Use clear, professional fonts and consistent formatting</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Proofread for spelling and grammar errors</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
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
