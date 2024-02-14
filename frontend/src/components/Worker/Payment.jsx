import React, { useState } from 'react';

export default function Payment() {
  const currentbalance="";
    
    return (
      <div>
      <div className="container mt-5 mb-5 border border-dark rounded">
        <div className="container mt-3">
          <div className="row mb-4">
            <div className="col">
              <p><strong>Payment History:</strong> {currentbalance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );

    }