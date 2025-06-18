import React, { useState } from 'react';
import { Role } from '../types';
import { ROLE_STYLES, PREPARATION_BUTTON_TEXT, CLEANUP_BUTTON_TEXT, DONATION_BUTTON_TEXT } from '../constants';

interface ParticipantInputFormProps {
  onAddParticipant: (name: string, role: Role) => void;
}

const ParticipantInputForm: React.FC<ParticipantInputFormProps> = ({ onAddParticipant }) => {
  const [name, setName] = useState('');

  const handleSubmit = (role: Role) => {
    if (name.trim()) {
      onAddParticipant(name.trim(), role);
      setName('');
    } else {
      alert("名前を入力してください。");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSubmit(Role.UNASSIGNED);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="participantName" className="block text-sm font-medium text-gray-700 mb-1">
          参加者を追加:
        </label>
        <input
          id="participantName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="例: 山田太郎 (Enterで未割り当て追加)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => handleSubmit(Role.PREPARATION)}
          className={`w-full font-semibold py-2 px-3 rounded-lg shadow hover:shadow-md transition-all duration-150 flex items-center justify-center space-x-2 ${ROLE_STYLES[Role.PREPARATION].button}`}
        >
          <span>{ROLE_STYLES[Role.PREPARATION].icon}</span>
          <span>{PREPARATION_BUTTON_TEXT}</span>
        </button>
        <button
          onClick={() => handleSubmit(Role.CLEANUP)}
          className={`w-full font-semibold py-2 px-3 rounded-lg shadow hover:shadow-md transition-all duration-150 flex items-center justify-center space-x-2 ${ROLE_STYLES[Role.CLEANUP].button}`}
        >
          <span>{ROLE_STYLES[Role.CLEANUP].icon}</span>
          <span>{CLEANUP_BUTTON_TEXT}</span>
        </button>
        <button
          onClick={() => handleSubmit(Role.DONATION)}
          className={`w-full font-semibold py-2 px-3 rounded-lg shadow hover:shadow-md transition-all duration-150 flex items-center justify-center space-x-2 ${ROLE_STYLES[Role.DONATION].button}`}
        >
          <span>{ROLE_STYLES[Role.DONATION].icon}</span>
          <span>{DONATION_BUTTON_TEXT}</span>
        </button>
      </div>
    </div>
  );
};

export default ParticipantInputForm;
