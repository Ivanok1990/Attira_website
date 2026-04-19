export default function SubscriptionsPage() {
  const mockSubscriptions = [
    { id: '1', user: 'Patrick Solis', plan: 'Premium', status: 'active', startDate: '2024-01-15', endDate: '2025-01-15' },
    { id: '2', user: 'Eduardo Obregon', plan: 'Basic', status: 'active', startDate: '2024-03-01', endDate: '2025-03-01' },
    { id: '3', user: 'Test User', plan: 'Premium', status: 'canceled', startDate: '2024-02-01', endDate: '2024-05-01' },
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Subscriptions</h2>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Coming soon:</strong> Subscriptions data will be integrated once Stripe integration is implemented.
        </p>
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockSubscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{sub.user}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{sub.plan}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sub.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : sub.status === 'canceled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{sub.startDate}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{sub.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
