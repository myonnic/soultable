
import React, { useState } from 'react';
import { RESTAURANTS } from '../App';

interface Props {
  onClose: () => void;
  onOpenStoreDetail: (id: string) => void;
  hostName: string;
  promiseTitle: string;
  promiseDate: string;
  promiseLocation: string;
}

const VotingDetailView: React.FC<Props> = ({ 
  onClose, 
  onOpenStoreDetail, 
  hostName, 
  promiseTitle, 
  promiseDate, 
  promiseLocation 
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isVoted, setIsVoted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const candidates = RESTAURANTS.slice(0, 3).map((r, idx) => ({
    id: r.id,
    name: r.name,
    rating: r.rating,
    keywords: r.tags.slice(0, 2),
    img: r.img,
    votes: [12, 8, 5][idx]
  }));

  const toggleSelect = (id: string) => {
    if (isVoted) return;
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const handleVote = () => {
    if (selectedIds.length > 0) setIsVoted(true);
  };

  const handleReset = () => {
    setIsVoted(false);
    setSelectedIds([]);
    setShowResetConfirm(false);
  };

  return (
    <div className="absolute inset-0 z-[300] bg-white flex flex-col font-display overflow-hidden">
      <header className="h-14 flex items-center border-b border-gray-100 px-4 shrink-0 bg-white">
        <button onClick={onClose} className="size-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 mr-3">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
        <h2 className="flex-1 text-center font-semibold text-base text-gray-900 mr-8">Vote Details</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-5 pb-32 hide-scrollbar">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <img src="https://i.pravatar.cc/150?u=daniel" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">{hostName}</p>
            <p className="text-xs text-gray-400 font-medium">Just started a new vote</p>
          </div>
        </div>

        <div className="relative mb-6 p-4 bg-muted rounded-xl border border-gray-200">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-base font-semibold text-gray-900 leading-tight">{promiseTitle}</h3>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${isVoted ? 'bg-primary/10 text-primary' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
              {isVoted ? 'DONE' : 'ACTIVE'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6">
            <span>{promiseDate}</span>
            <span className="text-gray-300">|</span>
            <span>{promiseLocation}</span>
          </div>
          <div className="mb-2 flex justify-between items-end">
            <p className="text-xs font-black text-gray-900">{isVoted ? 'All members voted' : 'Voting in progress...'}</p>
            <p className="text-[10px] font-black text-primary">85% Participation</p>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-1000 ${isVoted ? 'w-full bg-primary' : 'w-2/3 bg-primary'}`} />
          </div>
        </div>

        <div className="space-y-4">
          {candidates.map((c) => {
            const orderIdx = selectedIds.indexOf(c.id);
            const isDisabled = !selectedIds.includes(c.id) && selectedIds.length >= 2;
            const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0) + (isVoted ? selectedIds.length : 0);
            const myVotePlus = (isVoted && selectedIds.includes(c.id)) ? 1 : 0;
            const percentage = totalVotes === 0 ? 0 : Math.round(((c.votes + myVotePlus) / totalVotes) * 100);

            return (
              <div 
                key={c.id} 
                className={`p-3.5 rounded-xl border transition-all ${selectedIds.includes(c.id) ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}`}
              >
                <div className="flex gap-4">
                  <button 
                    onClick={() => toggleSelect(c.id)}
                    disabled={isVoted || (isDisabled && !selectedIds.includes(c.id))}
                    className={`size-10 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                      selectedIds.includes(c.id) 
                        ? 'bg-primary border-primary text-white font-black' 
                        : (isDisabled ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 text-transparent')
                    }`}
                  >
                    {selectedIds.includes(c.id) ? (orderIdx + 1) : <span className="material-symbols-outlined text-sm">check</span>}
                  </button>

                  <div className="flex-1 flex gap-4" onClick={() => !isVoted && toggleSelect(c.id)}>
                    <img src={c.img} className="size-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-gray-900 leading-tight truncate">{c.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1.5 mb-2">
                        {c.keywords.map(kw => (
                          <span key={kw} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-[9px] font-black uppercase tracking-tighter">#{kw}</span>
                        ))}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onOpenStoreDetail(c.id); }}
                        className="flex items-center gap-1 h-8 px-3 rounded-md border border-gray-200 text-[10px] font-medium text-gray-700 active:scale-95 transition-all hover:bg-muted"
                      >
                        View Store <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>

                {isVoted && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Votes</p>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                      </div>
                      <p className="text-xs font-black text-gray-900">{c.votes + myVotePlus} votes</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 pb-10 bg-white/95 backdrop-blur-xl border-t border-gray-100 flex gap-3 z-[310]">
        {isVoted && (
          <button 
            onClick={() => setShowResetConfirm(true)}
            className="size-11 rounded-lg border border-gray-200 flex items-center justify-center text-muted-fg active:scale-90 transition-all hover:bg-muted"
          >
            <span className="material-symbols-outlined">restart_alt</span>
          </button>
        )}
        <button 
          disabled={!isVoted && selectedIds.length === 0}
          onClick={handleVote}
          className={`flex-1 h-11 rounded-lg font-semibold text-sm transition-all ${
            isVoted 
              ? 'bg-muted text-muted-fg' 
              : selectedIds.length > 0 ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-muted text-muted-fg'
          }`}
        >
          {isVoted ? 'VOTE DONE' : selectedIds.length > 0 ? 'VOTE NOW' : 'SELECT A PLACE'}
        </button>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 z-[400] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-[300px] shadow-lg border border-gray-100">
            <h4 className="text-lg font-bold text-gray-900 mb-1 text-center">Re-vote</h4>
            <p className="text-sm text-muted-fg text-center mb-6 leading-relaxed">Existing vote data will be reset.<br/>Do you want to continue?</p>
            <div className="flex gap-2">
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 h-11 bg-muted text-muted-fg font-medium rounded-lg text-sm active:scale-95 transition-all">Cancel</button>
              <button onClick={handleReset} className="flex-1 h-11 bg-primary text-white font-semibold rounded-lg text-sm active:scale-95 transition-all hover:bg-primary-dark">Re-vote</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingDetailView;
