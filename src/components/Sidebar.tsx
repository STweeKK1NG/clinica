import React from 'react';
import {
  Calendar,
  Stethoscope,
  FileText,
  DollarSign,
  Gift,
  BarChart2,
  Users,
  Image,
  Layout,
  Settings,
} from 'lucide-react';

const menuItems = [
  { icon: Calendar, label: 'Agenda', path: '#agenda' },
  { icon: Stethoscope, label: 'Odontograma', path: '#dental-chart' },
  { icon: FileText, label: 'Ficha Clínica', path: '#clinical-record' },
  { icon: DollarSign, label: 'Ventas', path: '#sales' },
  { icon: Gift, label: 'Giftcards', path: '#giftcards' },
  { icon: BarChart2, label: 'Reportes', path: '#reports' },
  { icon: Users, label: 'Pacientes', path: '#patients' },
  { icon: Image, label: 'Archivos', path: '#files' },
  { icon: Layout, label: 'Planes', path: '#plans' },
  { icon: Settings, label: 'Configuración', path: '#settings' },
];

export default function Sidebar() {
  const currentPath = window.location.hash || '#dashboard';

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600">DentalPro</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
              currentPath === item.path ? 'bg-indigo-50 text-indigo-600' : ''
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}