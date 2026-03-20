
import React, { useState, useMemo, useEffect } from 'react';
import { Contact, ChatRoom, RestaurantData } from '../types';
import { RESTAURANTS } from '../App';

interface Props {
  mode: 'planning' | 'creating' | 'chat_ai';
  onClose: () => void;
  onDone: (newRoom?: ChatRoom, aiResult?: string[]) => void;
  onRestaurantClick: (id: string, list: string[] | null) => void;
  rooms: ChatRoom[];
}

type FlowStep = 
  | 'CHOICE' 
  | 'GROUP_SELECT'
  | 'EXISTING_SETUP' 
  | 'NEW_CONTACTS' 
  | 'NEW_SETUP' 
  | 'NEW_RESULT' 
  | 'AI_LOADING' 
  | 'AI_RESULT';

const PlanningFlow: React.FC<Props> = ({ mode, onClose, onDone, onRestaurantClick, rooms }) => {
  const [step, setStep] = useState<FlowStep>(
    mode === 'planning' ? 'CHOICE' : 
    mode === 'chat_ai' ? 'AI_LOADING' : 'NEW_CONTACTS'
  );
  
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [aiStatus, setAiStatus] = useState<'searching' | 'found'>(mode === 'chat_ai' ? 'searching' : 'searching');
  const [recommendations, setRecommendations] = useState<RestaurantData[]>([]);

  useEffect(() => {
    if (step === 'AI_LOADING') {
      startAiRecommendation();
    }
  }, [step]);

  const friends: Contact[] = useMemo(() => {
    const names = ['Elena Park', 'James Kim', 'Daniel Lee', 'Sarah Jenkins', 'Miki Tanaka', 'John Doe', 'Alice Wonderland', 'Bob Marley'];
    return names.map((n, i) => ({
      id: `f_${i}`,
      name: n,
      isMember: i < 5,
      avatar: `https://i.pravatar.cc/150?u=${n}`
    }));
  }, []);

  const toggleContact = (id: string) => {
    setSelectedContacts(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const startAiRecommendation = () => {
    setAiStatus('searching');
    setTimeout(() => {
      setAiStatus('found');
      setRecommendations(RESTAURANTS.slice(0, 3));
    }, 4000);
  };

  const handleFinish = () => {
    if (mode === 'chat_ai') {
      onDone(undefined, recommendations.map(r => r.id));
    } else {
      const newRoom: ChatRoom = {
        id: 'dynamic_' + Date.now(),
        name: groupName || 'New Foodie Group',
        lastMsg: 'AI recommendation vote has started.',
        time: 'Now',
        unread: 0,
        scenario: 2, 
        members: ['Me', ...friends.filter(f => selectedContacts.includes(f.id)).map(f => f.name)]
      };
      onDone(newRoom);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'CHOICE':
        return (
          <div className="p-5 pt-20 flex flex-col h-full bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Plan a Meeting</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => setStep('AI_LOADING')} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 text-left active:scale-95 transition-all hover:border-primary/40">
                <div className="size-12 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">person</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Solo Dining</h4>
                  <p className="text-xs text-muted-fg mt-0.5">Single Table</p>
                </div>
                <span className="material-symbols-outlined text-gray-300 ml-auto">chevron_right</span>
              </button>
              <button onClick={() => setStep('GROUP_SELECT')} className="flex items-center gap-4 p-4 bg-gray-900 text-white rounded-xl text-left active:scale-95 transition-all shadow-sm">
                <div className="size-12 rounded-lg bg-white/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <div>
                  <h4 className="font-semibold">Group Dining</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Friends & Family</p>
                </div>
                <span className="material-symbols-outlined text-gray-500 ml-auto">chevron_right</span>
              </button>
            </div>
          </div>
        );

      case 'GROUP_SELECT':
        return (
          <div className="p-0 flex flex-col h-full bg-white overflow-hidden relative">
            <div className="p-5 pt-12 pb-3 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Select Group</h2>
              <p className="text-sm text-muted-fg">Choose a group to plan an appointment.</p>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pb-32 hide-scrollbar">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => setStep('EXISTING_SETUP')}
                  className="w-full flex items-center gap-3 px-5 py-4 group text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="size-12 rounded-xl bg-muted flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-xl" style={{fontVariationSettings:"'FILL' 1"}}>group</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{room.name}</p>
                    <p className="text-xs text-muted-fg">{room.members.length} members</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 text-lg">chevron_right</span>
                </button>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent">
              <button
                onClick={() => setStep('NEW_CONTACTS')}
                className="w-full h-11 bg-primary text-white rounded-lg font-semibold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-primary-dark"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Create New Group
              </button>
            </div>
          </div>
        );

      case 'NEW_CONTACTS':
        return (
          <div className="p-5 pt-12 flex flex-col h-full bg-white overflow-hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Select Friends</h2>
            <p className="text-sm text-muted-fg mb-6">Choose friends to invite. ({selectedContacts.length} selected)</p>
            <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
              {friends.map(c => (
                <button
                  key={c.id}
                  onClick={() => toggleContact(c.id)}
                  className={`w-full flex items-center justify-between p-3.5 border rounded-lg transition-all ${selectedContacts.includes(c.id) ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} className="size-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{c.name}</p>
                      <p className="text-[10px] text-muted-fg mt-0.5">{c.isMember ? 'Member' : 'Non-member'}</p>
                    </div>
                  </div>
                  <div className={`size-5 rounded-md border-2 flex items-center justify-center transition-colors ${selectedContacts.includes(c.id) ? 'bg-primary border-primary text-white' : 'border-gray-300'}`}>
                    <span className="material-symbols-outlined text-xs">check</span>
                  </div>
                </button>
              ))}
            </div>
            <button
              disabled={selectedContacts.length === 0}
              onClick={() => setStep('NEW_SETUP')}
              className={`h-11 mt-5 rounded-lg font-semibold text-sm transition-all ${selectedContacts.length > 0 ? 'bg-primary text-white active:scale-95 hover:bg-primary-dark' : 'bg-muted text-muted-fg'}`}
            >
              Next
            </button>
          </div>
        );

      case 'NEW_SETUP':
        return (
          <div className="p-5 pt-12 flex flex-col h-full bg-white text-center">
            <div className="flex -space-x-3 mb-8 justify-center">
              {selectedContacts.slice(0, 3).map(id => <img key={id} src={friends.find(f => f.id === id)?.avatar} className="size-16 rounded-xl border-2 border-white shadow-md" />)}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Set Group Name</h2>
            <div className="flex-1">
              <input
                autoFocus
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="e.g. Weekend Brunch Crew"
                className="w-full h-12 bg-muted border border-gray-200 rounded-lg px-4 font-medium text-center text-lg focus:border-primary focus:outline-none focus:ring-0"
              />
            </div>
            <button onClick={() => setStep('NEW_RESULT')} className="h-11 bg-primary text-white rounded-lg font-semibold text-sm active:scale-95 transition-all mb-6 hover:bg-primary-dark">Create Group</button>
          </div>
        );

      case 'NEW_RESULT':
        return (
          <div className="p-5 flex flex-col h-full bg-white text-center justify-center items-center">
            <div className="size-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5">
              <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings:"'FILL' 1"}}>celebration</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Group Created!</h2>
            <p className="text-sm text-muted-fg mb-10">Shall we plan a delicious meeting now?</p>
            <button onClick={() => setStep('EXISTING_SETUP')} className="w-full h-11 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark active:scale-95 transition-all">Go Plan Appointment</button>
          </div>
        );

      case 'EXISTING_SETUP':
        return (
          <div className="p-5 pt-12 flex flex-col h-full bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Appointment Details</h2>
            <div className="flex-1 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-fg">Title</label>
                <input placeholder="e.g. Gourmet Tour" className="w-full h-11 bg-muted rounded-lg px-4 border border-gray-200 font-medium text-sm focus:border-primary focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-fg">Date</label>
                <input type="date" className="w-full h-11 bg-muted rounded-lg px-4 border border-gray-200 font-medium text-sm focus:border-primary focus:outline-none" />
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-xs font-medium text-muted-fg">Location</label>
                <select className="w-full h-11 bg-muted rounded-lg px-4 border border-gray-200 font-medium text-sm appearance-none focus:border-primary focus:outline-none">
                  <option>Gangnam/Yeoksam</option>
                  <option>Itaewon/Yongsan</option>
                  <option>Hongdae/Hapjeong</option>
                  <option>Euljiro/City Hall</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-8 text-muted-fg pointer-events-none text-lg">keyboard_arrow_down</span>
              </div>
            </div>
            <button onClick={() => setStep('AI_LOADING')} className="h-11 bg-primary text-white rounded-lg font-semibold text-sm active:scale-95 transition-all mb-6 hover:bg-primary-dark">Get AI Recommendation</button>
          </div>
        );

      case 'AI_LOADING':
        return (
          <div className="p-6 flex flex-col h-full bg-white items-center justify-center text-center">
            <style>{`
              @keyframes bounce-spin {
                0% { transform: translateY(0) rotate(0deg) scale(1); }
                25% { transform: translateY(-30px) rotate(90deg) scale(1.1); }
                50% { transform: translateY(0) rotate(180deg) scale(1); }
                75% { transform: translateY(-30px) rotate(270deg) scale(1.1); }
                100% { transform: translateY(0) rotate(360deg) scale(1); }
              }
              .salad-animation {
                display: inline-block;
                font-size: 100px;
                animation: bounce-spin 2s infinite cubic-bezier(0.45, 0, 0.55, 1);
                filter: drop-shadow(0 20px 25px rgba(0,0,0,0.1));
              }
              .pulse-ring {
                position: absolute;
                border: 3px solid #0BBA37;
                border-radius: 50%;
                animation: ring-pulse 2s infinite;
              }
              @keyframes ring-pulse {
                0% { transform: scale(0.8); opacity: 0.8; }
                100% { transform: scale(1.5); opacity: 0; }
              }
            `}</style>
            {aiStatus === 'searching' ? (
              <div className="flex flex-col items-center">
                <div className="relative size-64 mb-16 flex items-center justify-center">
                  <div className="pulse-ring inset-0"></div>
                  <div className="pulse-ring inset-0" style={{ animationDelay: '0.5s' }}></div>
                  <div className="salad-animation">🥗</div>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">Analyzing best<br/>restaurants for you...</h2>
                <p className="text-sm text-gray-400 font-bold max-w-[200px]">AI is matching member tastes and location info in real-time.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="size-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                  <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>check</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">Match Complete!</h2>
                <p className="text-sm text-muted-fg mb-10">We found 3 perfect places for you.</p>
                <button onClick={() => setStep('AI_RESULT')} className="w-full h-11 bg-primary text-white rounded-lg font-semibold text-sm active:scale-95 transition-all hover:bg-primary-dark">Check Results</button>
              </div>
            )}
          </div>
        );

      case 'AI_RESULT':
        return (
          <div className="p-5 pt-12 flex flex-col h-full bg-white overflow-hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-5">AI Recommendations</h2>
            <div className="flex-1 space-y-3 overflow-y-auto pb-4 hide-scrollbar">
              {recommendations.map(res => (
                <div key={res.id} onClick={() => onRestaurantClick(res.id, recommendations.map(r => r.id))} className="flex gap-3 p-3.5 bg-white rounded-xl border border-gray-200 active:scale-95 transition-all cursor-pointer hover:border-primary/30">
                  <img src={res.img} className="size-20 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1 truncate text-sm">{res.name}</h4>
                    <div className="space-y-0.5 mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 bg-primary rounded-full"></div>
                        <p className="text-[10px] font-medium text-primary">My Match {res.matchMe}%</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 bg-amber-500 rounded-full"></div>
                        <p className="text-[10px] font-medium text-amber-500">Similar Users {res.matchCohort}%</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 bg-blue-500 rounded-full"></div>
                        <p className="text-[10px] font-medium text-blue-500">Friends {res.matchFriends}%</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {res.tags.slice(0, 2).map(t => <span key={t} className="px-2 py-0.5 bg-muted text-muted-fg rounded-md text-[8px] font-medium">#{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 flex gap-2 mb-6">
              <button onClick={() => setStep('AI_LOADING')} className="flex-1 h-11 border border-gray-200 text-muted-fg rounded-lg font-medium text-xs hover:bg-muted">Recommend Again</button>
              <button onClick={handleFinish} className="flex-1 h-11 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark">Start Vote</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[500] bg-white flex flex-col overflow-hidden">
      {renderContent()}
      <button onClick={onClose} className="absolute top-12 right-5 z-[600] size-9 rounded-lg border border-gray-200 flex items-center justify-center text-muted-fg active:scale-90 transition-all bg-white">
        <span className="material-symbols-outlined text-xl">close</span>
      </button>
    </div>
  );
};

export default PlanningFlow;
