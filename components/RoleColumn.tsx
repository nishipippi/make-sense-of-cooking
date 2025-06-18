
import React from 'react';
import { Participant, Role } from '../types';
import { ROLE_STYLES } from '../constants';
import ParticipantChip from './ParticipantChip';

interface RoleColumnProps {
  role: Role;
  title: string;
  participants: Participant[];
  onDragStartParticipant: (participantId: string) => void;
  onDropIntoColumn: (targetRole: Role) => void;
}

const RoleColumn: React.FC<RoleColumnProps> = ({ 
  role, 
  title, 
  participants,
  onDragStartParticipant,
  onDropIntoColumn
}) => {
  const style = ROLE_STYLES[role];
  const isDroppable = role === Role.PREPARATION || role === Role.CLEANUP || role === Role.DONATION;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDroppable) {
      e.preventDefault(); 
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDroppable) {
      e.preventDefault();
      onDropIntoColumn(role);
    }
  };
  
  return (
    <div 
      className={`p-4 rounded-lg shadow-lg min-h-[200px] border-2 ${style.border} bg-white/50 space-y-3 flex flex-col`}
      onDragOver={isDroppable ? handleDragOver : undefined}
      onDrop={isDroppable ? handleDrop : undefined}
    >
      <h3 className={`text-xl font-bold ${style.titleText} text-center pb-2 border-b-2 ${style.border}`}>
        {style.icon} {title}
      </h3>
      <div className="flex-grow space-y-2 overflow-y-auto py-2">
        {participants.length > 0 ? (
          participants.map(p => (
            <ParticipantChip
              key={p.id}
              participant={p}
              isDraggable={role === Role.PREPARATION || role === Role.CLEANUP || role === Role.DONATION}
              onDragStart={(e, id) => onDragStartParticipant(id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 italic pt-4">該当者なし</p>
        )}
      </div>
    </div>
  );
};

export default RoleColumn;
