import { useState, useEffect } from 'react';

export default function ProviderRequest() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/providers") 
      .then(response => response.json())
      .then(data => {
        setProviders(data);
      })
      .catch(error => {
        console.error('Error fetching providers:', error);
      });
  }, []);

  const handleClick = (id) => {
    
    fetch(`http://localhost:8080/providers/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
        
      },
      
      body: JSON.stringify({ approved: true }) 
    })
    .then(response => {
      if (response.ok) {
        alert(`Provider with ID ${id} approved successfully!`);
      } else {
        throw new Error('Failed to approve provider');
      }
    })
    .catch(error => {
      console.error('Error approving provider:', error);
      alert('Failed to approve provider');
    });
  };

  return (
    <div>
      <h1>Provider Requests</h1>
      <table style={{ border: '1px solid black' }}> 
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td>{provider.id}</td>
              <td>{provider.firstName}</td>
              <td>{provider.middleName}</td>
              <td>{provider.lastName}</td>
              <td>{provider.company}</td>
              <td><button onClick={() => handleClick(provider.id)}>Approve</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
