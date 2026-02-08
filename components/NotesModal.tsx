
import React from 'react';

interface NotesModalProps {
  isOpen: boolean;
  notes?: string;
  onClose: () => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({ isOpen, notes, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 pointer-events-none">
      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg shadow-2xl w-full max-w-md pointer-events-auto transform animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#ff4d00] font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
            <i className="fas fa-sticky-note"></i> Note per il Relatore
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="text-zinc-300 text-sm leading-relaxed max-h-48 overflow-y-auto italic">
          {notes || "Nessuna nota per questa diapositiva."}
        </div>
      </div>
    </div>
  );
};
