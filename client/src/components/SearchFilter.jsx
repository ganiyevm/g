export default function SearchFilter({ devices, setFiltered }) {
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = devices.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.assignedTo?.toLowerCase().includes(term)
    );
    setFiltered(filtered);
  };

  const handleStatus = (e) => {
    const status = e.target.value;
    if (!status) setFiltered(devices);
    else setFiltered(devices.filter((d) => d.status === status));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Qidiruv (nomi yoki foydalanuvchi)"
        onChange={handleSearch}
        className="border rounded-lg px-4 py-2 w-full sm:w-80"
      />
      <select onChange={handleStatus} className="border rounded-lg px-4 py-2">
        <option value="">Barcha holatlar</option>
        <option value="faol">Faol</option>
        <option value="ishlamayapti">Ishlamayapti</option>
        <option value="ta’mirda">Ta’mirda</option>
      </select>
    </div>
  );
}