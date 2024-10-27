import React, { useState } from 'react';
import { useGameStore } from '../store';
import { User } from '../types';
import { UserPlus, Users } from 'lucide-react';

export function UserSelect() {
  const { users, currentUser, addUser, setCurrentUser } = useGameStore();
  const [name, setName] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [showExisting, setShowExisting] = useState(false);
  const [error, setError] = useState('');

  if (currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !seatNumber.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const seatNum = parseInt(seatNumber);
    if (isNaN(seatNum) || seatNum < 1) {
      setError('Please enter a valid seat number');
      return;
    }

    if (users.some(u => u.seatNumber === seatNum)) {
      setError('This seat number is already taken');
      return;
    }

    addUser(name.trim(), seatNum);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-100 p-4 rounded-full">
            <UserPlus className="w-12 h-12 text-indigo-600" />
          </div>
        </div>

        {!showExisting ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Join Word Weaver</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seat Number
              </label>
              <input
                type="number"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your seat number"
                min="1"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Playing
            </button>

            {users.length > 0 && (
              <button
                type="button"
                onClick={() => setShowExisting(true)}
                className="w-full flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-700"
              >
                <Users className="w-4 h-4" />
                <span>Select Existing Player</span>
              </button>
            )}
          </form>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Select Your Profile</h2>
            
            <div className="grid gap-3">
              {users.map((user: User) => (
                <button
                  key={user.id}
                  onClick={() => setCurrentUser(user)}
                  className="flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-gray-500">Seat {user.seatNumber}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowExisting(false)}
              className="w-full text-indigo-600 hover:text-indigo-700"
            >
              Create New Player
            </button>
          </div>
        )}
      </div>
    </div>
  );
}