import React from 'react';
import { Participant, Role } from '../types';
import { APP_SUBTITLE_INPUT } from '../constants';
import ParticipantInputForm from './ParticipantInputForm';
import ParticipantListDisplay from './ParticipantListDisplay';

interface InputScreenProps {
  participants: Participant[];
  onAddParticipant: (name: string, role: Role) => void;
  onRemoveParticipant: (id: string) => void;
  onProceed: () => void;
}

const InputScreen: React.FC<InputScreenProps> = ({
  participants,
  onAddParticipant,
  onRemoveParticipant,
  onProceed,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-purple-700">{APP_SUBTITLE_INPUT}</h2>
      </div>
      
      <ParticipantInputForm onAddParticipant={onAddParticipant} />
      
      {participants.length > 0 && (
        <ParticipantListDisplay 
          participants={participants} 
          onRemoveParticipant={onRemoveParticipant} 
        />
      )}
      
      <button
        onClick={onProceed}
        disabled={participants.length === 0}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center space-x-2"
      >
        <span>🎲</span>
        <span>筋を通す</span>
        <span>🎲</span>
      </button>
    </div>
  );
};

export default InputScreen;
