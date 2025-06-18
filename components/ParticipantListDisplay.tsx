import React from 'react';
import { Participant } from '../types';
import ParticipantChip from './ParticipantChip';

interface ParticipantListDisplayProps {
  participants: Participant[];
  onRemoveParticipant: (id: string) => void;
}

const ParticipantListDisplay: React.FC<ParticipantListDisplayProps> = ({ participants, onRemoveParticipant }) => {
  if (participants.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">まだ参加者がいません。</p>
    );
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
      <h3 className="text-md font-semibold text-gray-700 mb-3">参加者一覧:</h3>
      <div className="flex flex-wrap gap-2">
        {participants.map(p => (
          <ParticipantChip 
            key={p.id} 
            participant={p} 
            onRemove={onRemoveParticipant} 
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipantListDisplay;
