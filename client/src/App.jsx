import React, { useState, useEffect } from 'react';
import { Plus, Search, Download, RefreshCw } from 'lucide-react';
import Statistics from './components/Statistics';
import DeviceForm from './components/DeviceForm';
import DeviceTable from './components/DeviceTable';
import { deviceAPI } from './services/api';
import './App.css';

function App() {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    repair: 0,
    broken: 0,
    totalValue: 0
  });
  const [showModal, setShowModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Kompyuter',
    purchaseDate: '',
    price: '',
    assignedTo: '',
    status: 'Faol',
    notes: ''
  });

  
  useEffect(() => {
    loadDevices();
    loadStatistics();
  }, []);

 
  useEffect(() => {
    let result = devices;

    if (searchTerm) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter((d) => d.status === filterStatus);
    }

    setFilteredDevices(result);
  }, [devices, searchTerm, filterStatus]);

  const loadDevices = async () => {
    try {
      setLoading(true);
      const response = await deviceAPI.getAll();
      setDevices(response.data.data);
    } catch (error) {
      console.error('Qurilmalarni yuklashda xatolik:', error);
      alert('Qurilmalarni yuklashda xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      setStatsLoading(true);
      const response = await deviceAPI.getStatistics();
      setStats(response.data.data);
    } catch (error) {
      console.error('Statistikani yuklashda xatolik:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDevice) {
        await deviceAPI.update(editingDevice.id, formData);
        alert('Qurilma muvaffaqiyatli yangilandi!');
      } else {
        await deviceAPI.create(formData);
        alert('Qurilma muvaffaqiyatli qo\'shildi!');
      }

      resetForm();
      loadDevices();
      loadStatistics();
    } catch (error) {
      console.error('Xatolik:', error);
      alert(error.response?.data?.message || 'Xatolik yuz berdi!');
    }
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
    setFormData({
      name: device.name,
      category: device.category,
      purchaseDate: device.purchaseDate,
      price: device.price,
      assignedTo: device.assignedTo,
      status: device.status,
      notes: device.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Rostdan ham o\'chirmoqchimisiz?')) {
      try {
        await deviceAPI.delete(id);
        alert('Qurilma muvaffaqiyatli o\'chirildi!');
        loadDevices();
        loadStatistics();
      } catch (error) {
        console.error('O\'chirishda xatolik:', error);
        alert('Qurilmani o\'chirishda xatolik yuz berdi!');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Kompyuter',
      purchaseDate: '',
      price: '',
      assignedTo: '',
      status: 'Faol',
      notes: ''
    });
    setEditingDevice(null);
    setShowModal(false);
  };

  const exportToCSV = () => {
    const headers = ['Nomi', 'Kategoriya', 'Sana', 'Narxi', 'Foydalanuvchi', 'Holat', 'Eslatma'];
    const rows = devices.map((d) => [
      d.name,
      d.category,
      d.purchaseDate,
      d.price,
      d.assignedTo,
      d.status,
      d.notes || ''
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devices_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Qurilmalar Inventarizatsiyasi
              </h1>
              <p className="text-gray-600">Kompaniya jihozlarini boshqarish tizimi</p>
            </div>
            <button
              onClick={() => {
                loadDevices();
                loadStatistics();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <RefreshCw size={20} />
              Yangilash
            </button>
          </div>
        </div>

        <Statistics stats={stats} loading={statsLoading} />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Qidirish..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Barcha Holatlar</option>
              <option value="Faol">Faol</option>
              <option value="Ta'mirda">Ta'mirda</option>
              <option value="Ishlamayapti">Ishlamayapti</option>
            </select>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Qo'shish
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Download size={20} />
              Export
            </button>
          </div>
        </div>

        <DeviceTable
          devices={filteredDevices}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {editingDevice ? 'Qurilmani Tahrirlash' : 'Yangi Qurilma'}
                </h2>
                <DeviceForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={resetForm}
                  editingDevice={editingDevice}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

