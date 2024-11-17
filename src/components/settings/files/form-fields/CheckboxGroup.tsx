import React, { useState } from 'react';
import { Settings, Trash2, Plus, X, GripVertical } from 'lucide-react';

interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  id: string;
  label: string;
  options: CheckboxOption[];
  onUpdate: (updates: any) => void;
  onDelete?: () => void;
}

export default function CheckboxGroup({ id, label, options, onUpdate, onDelete }: CheckboxGroupProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);
  const [editedOptions, setEditedOptions] = useState(options);

  const handleAddOption = () => {
    const newOption: CheckboxOption = {
      id: Date.now().toString(),
      label: `Opción ${editedOptions.length + 1}`,
      checked: false
    };
    setEditedOptions([...editedOptions, newOption]);
  };

  const handleRemoveOption = (optionId: string) => {
    setEditedOptions(editedOptions.filter(opt => opt.id !== optionId));
  };

  const handleOptionLabelChange = (optionId: string, newLabel: string) => {
    setEditedOptions(editedOptions.map(opt => 
      opt.id === optionId ? { ...opt, label: newLabel } : opt
    ));
  };

  const handleOptionCheckedChange = (optionId: string) => {
    setEditedOptions(editedOptions.map(opt => 
      opt.id === optionId ? { ...opt, checked: !opt.checked } : opt
    ));
  };

  const handleSave = () => {
    onUpdate({
      label: editedLabel,
      options: editedOptions
    });
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 relative group">
      <div className="absolute left-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex justify-between items-start mb-4 pl-8">
        {isEditing ? (
          <input
            type="text"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        ) : (
          <h3 className="text-lg font-medium">{label}</h3>
        )}
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Settings className="h-5 w-5" />
          </button>
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1 text-red-400 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4 pl-8">
          {editedOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => handleOptionCheckedChange(option.id)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <input
                type="text"
                value={option.label}
                onChange={(e) => handleOptionLabelChange(option.id, e.target.value)}
                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
              <button
                onClick={() => handleRemoveOption(option.id)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            onClick={handleAddOption}
            className="flex items-center px-3 py-1 text-primary hover:text-primary/80"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar opción
          </button>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2 pl-8">
          {options.map((option) => (
            <label key={option.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => {}}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                disabled
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}