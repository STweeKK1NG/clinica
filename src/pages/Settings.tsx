import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Layout, 
  Stethoscope, 
  Package,
  UserCog,
  Star,
  Calculator,
  Mail,
  FileText,
  User,
  Microscope,
  BarChart2,
  Box,
  DollarSign,
  Building
} from 'lucide-react';
import AgendasSettings from '../components/settings/agendas/AgendasSettings';
import ProfessionalsSettings from '../components/settings/professionals/ProfessionalsSettings';
import UsersSettings from '../components/settings/users/UsersSettings';
import CreateUser from '../components/settings/users/CreateUser';
import RoomsSettings from '../components/settings/rooms/RoomsSettings';
import ServicesSettings from '../components/settings/services/ServicesSettings';
import ProductsSettings from '../components/settings/products/ProductsSettings';
import PlansSettings from '../components/settings/plans/PlansSettings';
import BudgetsSettings from '../components/settings/budgets/BudgetsSettings';
import CashSalesSettings from '../components/settings/cashsales/CashSalesSettings';
import BasicDataSettings from '../components/settings/basicdata/BasicDataSettings';
import MailSettings from '../components/settings/mail/MailSettings';
import FileTypes from '../components/settings/files/FileTypes';
import CreateFileType from '../components/settings/files/CreateFileType';

const menuItems = [
  { id: 'basicdata', icon: Building, label: 'Datos Básicos' },
  { id: 'agendas', icon: Calendar, label: 'Agendas' },
  { id: 'profesionales', icon: Users, label: 'Profesionales' },
  { id: 'salas', icon: Box, label: 'Salas/Box' },
  { id: 'servicios', icon: Stethoscope, label: 'Servicios' },
  { id: 'productos', icon: Package, label: 'Productos' },
  { id: 'planes', icon: Layout, label: 'Planes' },
  { id: 'presupuestos', icon: Calculator, label: 'Presupuestos' },
  { id: 'cajayventas', icon: DollarSign, label: 'Caja y Ventas' },
  { id: 'usuarios', icon: UserCog, label: 'Usuarios' },
  { id: 'encuesta', icon: Star, label: 'Encuesta de satisfacción' },
  { id: 'mail', icon: Mail, label: 'Mail' },
  { id: 'fichas', icon: FileText, label: 'Fichas' },
  { id: 'pacientes', icon: User, label: 'Pacientes' },
  { id: 'examenes', icon: Microscope, label: 'Examenes' },
  { id: 'dashboard', icon: BarChart2, label: 'Dashboard' },
];

export default function Settings() {
  const [selectedSection, setSelectedSection] = useState('basicdata');

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#settings/')) {
        const [, section, action] = hash.split('/');
        setSelectedSection(section || 'basicdata');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleMenuClick = (id: string) => {
    setSelectedSection(id);
    window.location.hash = `#settings/${id}`;
  };

  const renderContent = () => {
    const hash = window.location.hash;
    
    // Handle user creation route specifically
    if (hash === '#settings/usuarios/create') {
      return <CreateUser />;
    }

    // Handle file type creation route
    if (hash === '#settings/fichas/create') {
      return <CreateFileType />;
    }

    switch (selectedSection) {
      case 'basicdata':
        return <BasicDataSettings />;
      case 'agendas':
        return <AgendasSettings />;
      case 'profesionales':
        return <ProfessionalsSettings />;
      case 'usuarios':
        return <UsersSettings />;
      case 'salas':
        return <RoomsSettings />;
      case 'servicios':
        return <ServicesSettings />;
      case 'productos':
        return <ProductsSettings />;
      case 'planes':
        return <PlansSettings />;
      case 'presupuestos':
        return <BudgetsSettings />;
      case 'cajayventas':
        return <CashSalesSettings />;
      case 'mail':
        return <MailSettings />;
      case 'fichas':
        return <FileTypes />;
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-600">
              {menuItems.find(item => item.id === selectedSection)?.label}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200 pt-6">
        <h2 className="px-4 text-lg font-semibold text-gray-700 mb-6">Configuración</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center px-4 py-2.5 text-sm font-medium transition-colors ${
                selectedSection === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${
                selectedSection === item.id ? 'text-primary' : 'text-gray-400'
              }`} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {menuItems.find(item => item.id === selectedSection)?.label}
          </h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}