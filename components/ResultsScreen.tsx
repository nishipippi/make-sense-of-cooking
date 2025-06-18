import React from 'react';
import { Participant, Role } from '../types';
import { ROLE_NAMES, APP_SUBTITLE_RESULTS } from '../constants';
import RoleColumn from './RoleColumn';

interface ResultsScreenProps {
  participants: Participant[];
  onBack: () => void;
  onDragStart: (participantId: string) => void;
  onDrop: (targetRole: Role) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  participants,
  onBack,
  onDragStart,
  onDrop,
}) => {
  const rolesToDisplay: Role[] = [Role.PREPARATION, Role.CLEANUP, Role.DONATION];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          {APP_SUBTITLE_RESULTS}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rolesToDisplay.map(role => (
          <RoleColumn
            key={role}
            role={role}
            title={ROLE_NAMES[role]}
            participants={participants.filter(p => p.role === role)}
            onDragStartParticipant={onDragStart}
            onDropIntoColumn={onDrop}
          />
        ))}
      </div>
      
      <button
        onClick={onBack}
        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out text-lg"
      >
        戻る
      </button>
    </div>
  );
};

export default ResultsScreen;
