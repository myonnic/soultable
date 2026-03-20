
import React from 'react';

interface Props {
  onLinkClick: () => void;
}

const MockMessenger: React.FC<Props> = ({ onLinkClick }) => {
  return (
    <div className="flex justify-center bg-gray-900 min-h-screen items-center">
      <div className="w-full max-w-[430px] h-[932px] bg-[#abc1d1] relative shadow-2xl overflow-hidden flex flex-col rounded-[60px] border-[8px] border-black">
        
        {/* Header */}
        <header className="bg-[#abc1d1]/80 backdrop-blur-md pt-12 pb-4 px-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-gray-700">arrow_back</span>
              <h3 className="font-bold text-gray-800 text-lg">Emily Brown</h3>
           </div>
           <div className="flex items-center gap-4 text-gray-700">
              <span className="material-symbols-outlined">search</span>
              <span className="material-symbols-outlined">menu</span>
           </div>
        </header>

        {/* Message Area */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
           <div className="flex gap-2">
              <div className="size-10 rounded-2xl bg-gray-200 overflow-hidden shrink-0">
                 <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                 <p className="text-xs text-gray-600 ml-1">Emily Brown</p>
                 <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[280px]">
                    <p className="text-sm font-bold text-gray-800 mb-4 leading-relaxed">
                       You've been invited to SoulTable!<br/><br/>
                       I'm planning a group dinner. To reflect your tastes, please join the group through the link below.
                    </p>
                    <button 
                      onClick={onLinkClick}
                      className="w-full bg-primary/10 border border-primary/20 p-4 rounded-xl text-left hover:bg-primary/20 transition-all"
                    >
                       <p className="text-primary font-black text-xs uppercase mb-1">Invitation Link</p>
                       <p className="text-xs font-medium text-gray-500 underline break-all">https://app.seouleats.co.kr/ABCDEF</p>
                       <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">* Valid for 24 hours</p>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-4 pb-10 flex items-center gap-3">
           <span className="material-symbols-outlined text-gray-400">add</span>
           <div className="flex-1 h-10 bg-gray-100 rounded-full px-4 flex items-center text-sm text-gray-300">Type message...</div>
           <span className="material-symbols-outlined text-amber-400">sentiment_satisfied</span>
        </div>
      </div>
    </div>
  );
};

export default MockMessenger;
