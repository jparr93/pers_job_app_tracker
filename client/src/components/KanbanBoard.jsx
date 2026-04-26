import React from 'react';

export default function KanbanBoard({ jobs, onUpdateStatus, onDeleteJob }) {
  const statuses = ['Saved', 'Started', 'Applied', 'Interview', 'Successful', 'Unsuccessful'];

  const getJobsByStatus = (status) => {
    return jobs.filter((job) => job.status === status);
  };

  const getStatusColor = (status) => {
    const colors = {
      Saved: 'bg-slate-50 dark:bg-slate-800',
      Started: 'bg-blue-50 dark:bg-blue-950',
      Applied: 'bg-indigo-50 dark:bg-indigo-950',
      Interview: 'bg-purple-50 dark:bg-purple-950',
      Successful: 'bg-emerald-50 dark:bg-emerald-950',
      Unsuccessful: 'bg-rose-50 dark:bg-rose-950',
    };
    return colors[status] || 'bg-slate-50 dark:bg-slate-800';
  };

  const getStatusBorderColor = (status) => {
    const colors = {
      Saved: 'border-slate-300 dark:border-slate-600',
      Started: 'border-blue-300 dark:border-blue-700',
      Applied: 'border-indigo-300 dark:border-indigo-700',
      Interview: 'border-purple-300 dark:border-purple-700',
      Successful: 'border-emerald-300 dark:border-emerald-700',
      Unsuccessful: 'border-rose-300 dark:border-rose-700',
    };
    return colors[status] || 'border-slate-300 dark:border-slate-600';
  };

  const getHeaderColor = (status) => {
    const colors = {
      Saved: 'bg-slate-600 dark:bg-slate-700',
      Started: 'bg-blue-600 dark:bg-blue-800',
      Applied: 'bg-indigo-600 dark:bg-indigo-800',
      Interview: 'bg-purple-600 dark:bg-purple-800',
      Successful: 'bg-emerald-600 dark:bg-emerald-800',
      Unsuccessful: 'bg-rose-600 dark:bg-rose-800',
    };
    return colors[status] || 'bg-slate-600 dark:bg-slate-700';
  };

  const getCardBorderColor = (status) => {
    const colors = {
      Saved: 'border-slate-200 dark:border-slate-700',
      Started: 'border-blue-200 dark:border-blue-800',
      Applied: 'border-indigo-200 dark:border-indigo-800',
      Interview: 'border-purple-200 dark:border-purple-800',
      Successful: 'border-emerald-200 dark:border-emerald-800',
      Unsuccessful: 'border-rose-200 dark:border-rose-800',
    };
    return colors[status] || 'border-slate-200 dark:border-slate-700';
  };

  const handleDragStart = (e, job, fromStatus) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('jobId', job.id);
    e.dataTransfer.setData('fromStatus', fromStatus);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, toStatus) => {
    e.preventDefault();
    const jobId = parseInt(e.dataTransfer.getData('jobId'));
    const fromStatus = e.dataTransfer.getData('fromStatus');

    if (fromStatus !== toStatus) {
      onUpdateStatus(jobId, toStatus);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 overflow-x-auto border border-slate-200 dark:border-slate-700">
      <div className="flex gap-4 min-w-max">
        {statuses.map((status) => (
          <div
            key={status}
            className={`flex-shrink-0 w-80 rounded-lg border-2 ${getStatusBorderColor(status)} overflow-hidden`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className={`${getHeaderColor(status)} text-white px-4 py-3 font-semibold text-sm flex items-center justify-between`}>
              <span>{status}</span>
              <span className="bg-white bg-opacity-20 px-2.5 py-1 rounded text-xs font-medium">
                {getJobsByStatus(status).length}
              </span>
            </div>

            <div className={`${getStatusColor(status)} p-3 min-h-96 rounded-b-lg`}>
              {getJobsByStatus(status).map((job) => (
                <div
                  key={job.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, job, status)}
                  className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm-pro dark:shadow-lg p-4 mb-3 cursor-move hover:shadow-md-pro dark:hover:shadow-lg transition-all duration-200 border-l-4 border-indigo-500 dark:border-indigo-400 ${getCardBorderColor(status)}`}
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 truncate text-sm">{job.title}</h3>

                  {job.link && (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-xs underline block mb-2 truncate"
                    >
                      View Job
                    </a>
                  )}

                  {job.applicationDate && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <strong>Applied:</strong> {new Date(job.applicationDate).toLocaleDateString()}
                    </p>
                  )}

                  {job.salaryExpectations && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <strong>Salary:</strong> {job.salaryExpectations}
                    </p>
                  )}

                  {job.keyContacts && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <strong>Contact:</strong> {job.keyContacts}
                    </p>
                  )}

                  {job.notes && (
                    <p className="text-xs text-slate-700 dark:text-slate-300 bg-amber-50 dark:bg-amber-900 dark:bg-opacity-20 p-2 rounded mt-2 max-h-20 overflow-y-auto">
                      {job.notes}
                    </p>
                  )}

                  <button
                    onClick={() => onDeleteJob(job.id)}
                    className="mt-2 w-full bg-rose-50 dark:bg-rose-900 dark:bg-opacity-20 hover:bg-rose-100 dark:hover:bg-rose-900 dark:hover:bg-opacity-40 text-rose-700 dark:text-rose-400 text-xs py-1.5 rounded font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
