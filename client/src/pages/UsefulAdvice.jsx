import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function UsefulAdvice({ user, onLogout }) {
  const tips = [
    {
      category: 'Before Applying',
      tips: [
        'Research the company thoroughly - understand their mission, values, and recent news',
        'Customize your CV and cover letter for each position',
        'Read the job description carefully and match your skills to their requirements',
        'Check the company\' Glassdoor or Indeed reviews to understand the work culture',
        'Prepare examples of your achievements that align with the job requirements',
      ],
    },
    {
      category: 'During Application',
      tips: [
        'Use a professional email address and maintain consistent contact information',
        'Follow application instructions precisely - if they ask for a specific format, use it',
        'Use keywords from the job description in your CV',
        'Keep cover letters concise - recruiters spend an average of 30 seconds reading one',
        'Proofread everything multiple times before submitting',
      ],
    },
    {
      category: 'Interview Preparation',
      tips: [
        'Practice common interview questions with the STAR method (Situation, Task, Action, Result)',
        'Prepare 2-3 questions to ask the interviewer about the role and company',
        'Do a practice run with someone to build confidence',
        'Test your technology if it\'s a video interview - check camera, microphone, and internet',
        'Plan your route and timing if it\'s an in-person interview',
      ],
    },
    {
      category: 'During Interview',
      tips: [
        'Arrive 10-15 minutes early (or join 5 minutes early for video calls)',
        'Maintain eye contact and use a firm handshake for in-person interviews',
        'Speak clearly and at a steady pace - pause to let your answers breathe',
        'Listen actively and answer the question asked, not the one you prepared for',
        'Show enthusiasm for the role and company',
      ],
    },
    {
      category: 'After Interview',
      tips: [
        'Send a thank-you email within 24 hours mentioning specific points from the conversation',
        'If you don\' t hear back after the stated timeline, follow up politely',
        'Keep applying to other roles - don\' t put all your eggs in one basket',
        'Reflect on the interview and note areas for improvement',
        'Stay organized by tracking your applications, dates, and contacts',
      ],
    },
    {
      category: 'General Tips',
      tips: [
        'Job search typically takes 3-6 months - stay persistent and positive',
        'Network actively - many jobs are filled through referrals',
        'Consider freelance or contract work while job hunting to build your experience',
        'Update your LinkedIn profile with a professional photo and compelling headline',
        'Take care of your mental health - job hunting can be stressful, stay active and connected',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Navigation user={user} onLogout={onLogout} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 text-center">
          Job Hunting Tips & Advice
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 text-lg">
          Expert advice to help you succeed in your job search
        </p>

        <div className="space-y-8">
          {tips.map((section) => (
            <div key={section.category} className="bg-white dark:bg-slate-800 rounded-xl shadow-md-pro dark:shadow-lg dark:shadow-slate-900 overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">{section.category}</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {section.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-indigo-600 dark:text-indigo-400 mr-3 font-bold text-lg flex-shrink-0">
                        •
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900 dark:bg-opacity-20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-8 mt-12 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Remember!</h2>
          <p className="text-slate-700 dark:text-slate-300 text-base mb-4">
            Rejection is not personal - many factors go into hiring decisions beyond just your qualifications.
            Stay resilient, keep improving, and the right opportunity will come along. Every interview is
            practice for the next one, and every application brings you closer to your goal!
          </p>
          <p className="text-slate-700 dark:text-slate-300 text-base font-semibold">
            You\'ve got this! 💪
          </p>
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
