import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';
import SelectField from './SelectField';
import TextField from './TextField';
import TextArea from './TextArea';
import HeadingField from './HeadingField';
import ParagraphField from './ParagraphField';
import DividerField from './DividerField';

interface FormFieldProps {
  field: {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    options?: { id: string; label: string; checked?: boolean }[];
    defaultValue?: string | string[];
    content?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    alignment?: 'left' | 'center' | 'right' | 'justify';
    styles?: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    };
    showCharCount?: boolean;
  };
  onUpdate: (updates: any) => void;
  onDelete?: (fieldId: string) => void;
}

export default function FormField({ field, onUpdate, onDelete }: FormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const renderField = () => {
    switch (field.type) {
      case 'checkbox':
        return (
          <CheckboxGroup
            id={field.id}
            label={field.label}
            options={field.options || []}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(field.id) : undefined}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            id={field.id}
            label={field.label}
            options={field.options || []}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(field.id) : undefined}
          />
        );
      case 'select':
        return (
          <SelectField
            id={field.id}
            label={field.label}
            options={field.options || []}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(field.id) : undefined}
          />
        );
      case 'text':
        return (
          <TextField
            field={field}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(field.id) : undefined}
          />
        );
      case 'textarea':
        return (
          <TextArea
            field={field}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(field.id) : undefined}
          />
        );
      case 'heading':
        return (
          <HeadingField
            field={field}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(field.id) : undefined}
          />
        );
      case 'paragraph':
        return (
          <ParagraphField
            field={field}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(field.id) : undefined}
          />
        );
      case 'divider':
        return (
          <DividerField
            field={field}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(field.id) : undefined}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative mb-4 cursor-move"
    >
      {renderField()}
    </div>
  );
}