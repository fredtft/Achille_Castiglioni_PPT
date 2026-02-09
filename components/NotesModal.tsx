
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
      <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-md pointer-events-auto transform animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#ff4d00] font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
            <i className="fas fa-sticky-note"></i> Note per il Relatore
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="text-zinc-600 text-sm leading-relaxed max-h-48 overflow-y-auto italic">
          {notes || "Nessuna nota per questa diapositiva."}
        </div>
      </div>
    </div>
  );
};
