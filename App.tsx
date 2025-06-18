
import React, { useState, useCallback } from 'react';
import { Participant, Role, ScreenView } from './types';
import { APP_TITLE } from './constants';
import InputScreen from './components/InputScreen';
import ResultsScreen from './components/ResultsScreen';

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentScreen, setCurrentScreen] = useState<ScreenView>(ScreenView.INPUT);
  const [draggedParticipantId, setDraggedParticipantId] = useState<string | null>(null);

  const addParticipant = useCallback((name: string, role: Role) => {
    if (name.trim() === '') return;
    setParticipants(prev => [...prev, { id: crypto.randomUUID(), name, role }]);
  }, []);

  const removeParticipant = useCallback((id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  }, []);

  const assignRolesAndProceed = useCallback(() => {
    const updatedParticipants = participants.map(p => {
      if (p.role === Role.UNASSIGNED) {
        return { ...p, role: Math.random() < 0.5 ? Role.PREPARATION : Role.CLEANUP };
      }
      return p;
    });
    setParticipants(updatedParticipants);
    setCurrentScreen(ScreenView.RESULTS);
  }, [participants]);

  const updateParticipantRole = useCallback((participantId: string, newRole: Role) => {
    setParticipants(prev => 
      prev.map(p => (p.id === participantId ? { ...p, role: newRole } : p))
    );
  }, []);

  const navigateToInput = useCallback(() => {
    setCurrentScreen(ScreenView.INPUT);
  }, []);

  const handleDragStart = useCallback((participantId: string) => {
    setDraggedParticipantId(participantId);
  }, []);

  const handleDrop = useCallback((targetRole: Role) => {
    if (draggedParticipantId) {
      const participant = participants.find(p => p.id === draggedParticipantId);
      const movableRoles = [Role.PREPARATION, Role.CLEANUP, Role.DONATION];

      if (participant && 
          movableRoles.includes(participant.role) && 
          movableRoles.includes(targetRole)) {
         updateParticipantRole(draggedParticipantId, targetRole);
      }
    }
    setDraggedParticipantId(null);
  }, [draggedParticipantId, participants, updateParticipantRole]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 bg-clip-text text-transparent pb-2">
          {APP_TITLE}
        </h1>
      </header>
      
      <main className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 md:p-10">
        {currentScreen === ScreenView.INPUT ? (
          <InputScreen
            participants={participants}
            onAddParticipant={addParticipant}
            onRemoveParticipant={removeParticipant}
            onProceed={assignRolesAndProceed}
          />
        ) : (
          <ResultsScreen
            participants={participants}
            onBack={navigateToInput}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        )}
      </main>
      <footer className="mt-12 text-center text-sm text-gray-700">
        <p>&copy; {new Date().getFullYear()} 筋通しましょうや. All Rights Reserved.</p>
        <p>Inspired by fairness and delicious meals.</p>
      </footer>
    </div>
  );
};

export default App;
