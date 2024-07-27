import React, { useEffect, useState } from 'react';

// TypeScript interface for customer data
interface Customer {
  id: number;
  name: string;
  email: string;
}

// Example component for displaying a list of customers
const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch customer data (adjust the URL as needed)
    fetch('/api/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
        setError('Failed to load customers.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customer List</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
