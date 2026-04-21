import React from 'react';

export default function KanbanBoard({ jobs, onUpdateStatus, onDeleteJob }) {
  const statuses = ['Saved', 'Started', 'Applied', 'Interview', 'Successful', 'Unsuccessful'];

  const getJobsByStatus = (status) => {
    return jobs.filter((job) => job.status === status);
  };

  const getStatusColor = (status) => {
    const colors = {
      Saved: 'bg-gray-100',
      Started: 'bg-blue-100',
      Applied: 'bg-indigo-100',
      Interview: 'bg-purple-100',
      Successful: 'bg-green-100',
      Unsuccessful: 'bg-red-100',
    };
    return colors[status] || 'bg-gray-100';
  };

  const getStatusBorderColor = (status) => {
    const colors = {
      Saved: 'border-gray-300',
      Started: 'border-blue-300',
      Applied: 'border-indigo-300',
      Interview: 'border-purple-300',
      Successful: 'border-green-300',
      Unsuccessful: 'border-red-300',
    };
    return colors[status] || 'border-gray-300';
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
    <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        {statuses.map((status) => (
          <div
            key={status}
            className={`flex-shrink-0 w-80 rounded-lg border-2 ${getStatusBorderColor(status)}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="bg-gray-800 text-white px-4 py-3 rounded-t-md font-bold">
              {status}
              <span className="ml-2 bg-gray-600 px-2 py-1 rounded text-sm">
                {getJobsByStatus(status).length}
              </span>
            </div>

            <div className={`${getStatusColor(status)} p-3 min-h-96 rounded-b-lg`}>
              {getJobsByStatus(status).map((job) => (
                <div
                  key={job.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, job, status)}
                  className="bg-white rounded-lg shadow p-4 mb-3 cursor-move hover:shadow-lg transition border-l-4 border-blue-500"
                >
                  <h3 className="font-bold text-gray-800 mb-2 truncate">{job.title}</h3>

                  {job.link && (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm underline block mb-2 truncate"
                    >
                      View Job
                    </a>
                  )}

                  {job.applicationDate && (
                    <p className="text-xs text-gray-600 mb-1">
                      <strong>Applied:</strong> {new Date(job.applicationDate).toLocaleDateString()}
                    </p>
                  )}

                  {job.salaryExpectations && (
                    <p className="text-xs text-gray-600 mb-1">
                      <strong>Salary:</strong> {job.salaryExpectations}
                    </p>
                  )}

                  {job.keyContacts && (
                    <p className="text-xs text-gray-600 mb-1">
                      <strong>Contact:</strong> {job.keyContacts}
                    </p>
                  )}

                  {job.notes && (
                    <p className="text-xs text-gray-700 bg-yellow-50 p-2 rounded mt-2 max-h-20 overflow-y-auto">
                      {job.notes}
                    </p>
                  )}

                  <button
                    onClick={() => onDeleteJob(job.id)}
                    className="mt-2 w-full bg-red-100 hover:bg-red-200 text-red-700 text-xs py-1 rounded transition"
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
