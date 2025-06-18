import React from 'react';
import { Participant, Role } from '../types'; // Added Role import
import { ROLE_STYLES } from '../constants';

interface ParticipantChipProps {
  participant: Participant;
  onRemove?: (id: string) => void;
  isDraggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
}

const ParticipantChip: React.FC<ParticipantChipProps> = ({ 
  participant, 
  onRemove,
  isDraggable = false,
  onDragStart
}) => {
  const style = ROLE_STYLES[participant.role];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragStart && isDraggable) {
      onDragStart(e, participant.id);
      e.dataTransfer.setData('text/plain', participant.id); 
      e.dataTransfer.effectAllowed = "move";
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-2.5 rounded-lg shadow text-sm font-medium ${style.chip} ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      draggable={isDraggable}
      onDragStart={isDraggable ? handleDragStart : undefined}
    >
      <span className="mr-2">{style.icon}</span>
      <span className="flex-grow">{participant.name}</span>
      {onRemove && (
        <button
          onClick={() => onRemove(participant.id)}
          className={`ml-2 p-1 rounded-full hover:bg-black/20 transition-colors text-xs leading-none ${participant.role === Role.DONATION ? 'text-black' : 'text-white'}`}
          aria-label={`Remove ${participant.name}`}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ParticipantChip;
