import React from 'react';

const DeviceForm = ({ formData, setFormData, onSubmit, onCancel, editingDevice }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qurilma Nomi *
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masalan: Dell Latitude 5420"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategoriya *
          </label>
          <select
            name="category"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Kompyuter">Kompyuter</option>
            <option value="Monitor">Monitor</option>
            <option value="Printer">Printer</option>
            <option value="Scanner">Scanner</option>
            <option value="Telefon">Telefon</option>
            <option value="Boshqa">Boshqa</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sotib Olingan Sana *
          </label>
          <input
            type="date"
            name="purchaseDate"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Narxi (so'm) *
          </label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.price}
            onChange={handleChange}
            placeholder="12000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foydalanuvchi *
          </label>
          <input
            type="text"
            name="assignedTo"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.assignedTo}
            onChange={handleChange}
            placeholder="Ism Familiya"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Holat *
          </label>
          <select
            name="status"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Faol">Faol</option>
            <option value="Ta'mirda">Ta'mirda</option>
            <option value="Ishlamayapti">Ishlamayapti</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Eslatmalar
        </label>
        <textarea
          name="notes"
          rows="3"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Qo'shimcha ma'lumotlar..."
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onSubmit}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {editingDevice ? 'Saqlash' : 'Qo\'shish'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Bekor Qilish
        </button>
      </div>
    </div>
  );
};

export default DeviceForm;
