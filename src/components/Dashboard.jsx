import { useEffect, useState } from "react";
import { Bell, AlertTriangle, BarChart2 } from "lucide-react";

export default function Dashboard() {
  const [equipment, setEquipment] = useState([
    { id: "EQX1001", type: "Excavator", site: "S003", checkout: "2025-04-01", checkin: "2025-04-16", engine: 1.5, idle: 10, opDays: 15, operator: "OP101" },
    { id: "EQX1002", type: "Crane", site: "NULL", checkout: "2025-03-10", checkin: "2025-03-11", engine: 5, idle: 5, opDays: 20, operator: "NULL" },
    { id: "EQX1003", type: "Bulldozer", site: "S002", checkout: "2025-04-05", checkin: "2025-04-15", engine: 7.5, idle: 2.5, opDays: 10, operator: "OP203" }
  ]);

  const today = new Date("2025-04-20"); // simulate current date

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipment(prev =>
        prev.map(eq => ({
          ...eq,
          idle: eq.idle + Math.random() * 0.5 // simulate idle hour increase
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatus = (checkin, idle) => {
    const dueDate = new Date(checkin);
    if (dueDate < today) return "Overdue";
    if (idle > 8) return "Idle-Anomaly";
    return "Active";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Smart Rental</h2>
        <ul className="space-y-4">
          <li>Dashboard</li>
          <li>Assets</li>
          <li>Check-In/Out</li>
          <li>Forecasting</li>
          <li>Reports</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Topbar */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Bell className="w-6 h-6 text-gray-700"/>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p>Total Assets</p>
            <h2 className="text-xl font-bold">50</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p>Active Rentals</p>
            <h2 className="text-xl font-bold">32</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p>Idle Equipment</p>
            <h2 className="text-xl font-bold">8</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center animate-pulse text-red-600">
            <AlertTriangle className="mr-2"/>
            <p>3 Overdue</p>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Rented Equipment (Live)</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">ID</th>
                <th>Type</th>
                <th>Site</th>
                <th>Check-Out</th>
                <th>Check-In</th>
                <th>Engine Hrs</th>
                <th>Idle Hrs</th>
                <th>Status</th>
                <th>Operator</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((eq, i) => {
                const status = getStatus(eq.checkin, eq.idle);
                return (
                  <tr key={i} className="border-b hover:bg-gray-100">
                    <td className="p-2">{eq.id}</td>
                    <td>{eq.type}</td>
                    <td>{eq.site}</td>
                    <td>{eq.checkout}</td>
                    <td>{eq.checkin}</td>
                    <td>{eq.engine.toFixed(1)}</td>
                    <td className={eq.idle > 8 ? "text-orange-600 font-semibold" : ""}>
                      {eq.idle.toFixed(1)}
                    </td>
                    <td>
                      <span className={
                        status === "Overdue" ? "bg-red-200 text-red-700 px-2 py-1 rounded" :
                        status === "Idle-Anomaly" ? "bg-yellow-200 text-yellow-700 px-2 py-1 rounded" :
                        "bg-green-200 text-green-700 px-2 py-1 rounded"
                      }>
                        {status}
                      </span>
                    </td>
                    <td>{eq.operator}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Forecasting / Utilization Graph Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center h-64">
          <BarChart2 className="w-12 h-12 text-gray-400"/>
          <p className="ml-4 text-gray-600">Forecasting & Utilization Graph (Live Data Placeholder)</p>
        </div>
      </div>
    </div>
  );
}
