import React from 'react';

export default function CurrentJob() {
  // Assume you have variables for current job name and status
  const currentJobName = "";
  const currentJobStatus = "";

  return (
    <div>
      <div className="container mt-5 mb-5 border border-dark rounded">
        <div className="container mt-3">
          <div className="row mb-4">
            <div className="mt-3">
              <h5>Your Current Job Details</h5>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p><strong>Job Name:</strong> {currentJobName}</p>
            </div>
            <div className="col">
              <p><strong>Status:</strong> {currentJobStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
