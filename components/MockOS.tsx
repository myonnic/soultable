
import React from 'react';

interface Props {
  onNotificationClick: () => void;
}

const MockOS: React.FC<Props> = ({ onNotificationClick }) => {
  return (
    <div className="flex justify-center bg-gray-950 min-h-screen items-center">
      <div className="w-full max-w-[430px] h-[932px] bg-[url('https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2064&auto=format&fit=crop')] bg-cover relative shadow-2xl overflow-hidden rounded-[60px] border-[8px] border-black">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-8 pt-6 text-white font-bold text-sm">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-sm">wifi</span>
            <span className="material-symbols-outlined text-sm rotate-90">battery_full</span>
          </div>
        </div>

        {/* Clock */}
        <div className="flex flex-col items-center mt-20 text-white/90">
          <h1 className="text-8xl font-thin tracking-tight">09:41</h1>
          <p className="text-xl font-medium mt-2">Monday, July 12</p>
        </div>

        {/* Notification */}
        <div className="absolute top-[340px] left-4 right-4">
          <button 
            onClick={onNotificationClick}
            className="w-full bg-white/10 backdrop-blur-3xl border border-white/20 p-4 rounded-[32px] flex items-center gap-4 text-left active:scale-95 transition-transform"
          >
            <div className="size-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white">restaurant</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <p className="text-white font-black text-sm">SoulTable</p>
                <p className="text-white/40 text-[10px]">Just now</p>
              </div>
              <p className="text-white/90 text-xs font-medium">Emily Brown started a new vote!</p>
              <p className="text-white/50 text-[10px] mt-1">Tap to join "Itaewon Crew" and choose a restaurant.</p>
            </div>
          </button>
        </div>

        {/* Bottom Lock Icon */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center text-white/40">
           <span className="material-symbols-outlined text-3xl">lock_open</span>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
           <div className="w-32 h-1.5 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MockOS;
