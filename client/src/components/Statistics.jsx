import React from 'react';

const Statistics = ({ stats, loading }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
        <p className="text-gray-600 text-sm">Jami Qurilmalar</p>
        <p className="text-3xl font-bold text-blue-600">{stats.total || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
        <p className="text-gray-600 text-sm">Faol</p>
        <p className="text-3xl font-bold text-green-600">{stats.active || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
        <p className="text-gray-600 text-sm">Ta'mirda</p>
        <p className="text-3xl font-bold text-yellow-600">{stats.repair || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
        <p className="text-gray-600 text-sm">Ishlamayapti</p>
        <p className="text-3xl font-bold text-red-600">{stats.broken || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
        <p className="text-gray-600 text-sm">Umumiy Qiymat</p>
        <p className="text-xl font-bold text-purple-600">
          {formatPrice(stats.totalValue || 0)}
        </p>
      </div>
    </div>
  );
};

export default Statistics;