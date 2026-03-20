
import React, { useState } from 'react';
import { RESTAURANTS } from '../App';

interface Props {
  onVoteClick: (id: string, status: string) => void;
  rooms: any[];
  onCreateGroup: () => void;
}

const ScheduleView: React.FC<Props> = ({ onVoteClick, rooms }) => {
  const [mainTab, setMainTab] = useState<'solo' | 'group'>('group');
  const [filterTab, setFilterTab] = useState<'voting' | 'completed' | 'history'>('voting');

  const mockSchedule = [
    { id: '1', title: 'New Year Party 6PM', status: 'voting', date: '2025.01.20', time: '18:00', place: 'City Hall/Euljiro', timeLeft: '22h left', members: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3'] },
    { id: '2', title: 'Friday Brunch Meetup', status: 'completed', date: '2025.01.22', time: '11:30', place: 'Gangnam Station', timeLeft: 'Vote Done', members: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5'] },
    { id: '3', title: 'Team Lunch Meeting', status: 'history', historyType: 'pending', date: '2025.01.10', time: '12:00', place: 'Jongno', members: ['https://i.pravatar.cc/150?u=6', 'https://i.pravatar.cc/150?u=7'], restaurantId: 'r1' },
    { id: '4', title: 'Haebangchon Trip', status: 'history', historyType: 'done', date: '2024.12.24', time: '19:00', place: 'Haebangchon', members: ['https://i.pravatar.cc/150?u=8', 'https://i.pravatar.cc/150?u=9'], restaurantId: 'r8' },
    { id: '5', title: 'Weekend Dinner', status: 'voting', date: '2025.01.21', time: '19:30', place: 'Hongdae', timeLeft: '1d left', members: ['https://i.pravatar.cc/150?u=10'] },
    { id: '6', title: 'Year-end Party 2024', status: 'history', historyType: 'done', date: '2024.12.31', time: '21:00', place: 'Itaewon', members: ['https://i.pravatar.cc/150?u=11', 'https://i.pravatar.cc/150?u=12'], restaurantId: 'r7' },
  ];

  const filteredSchedule = mockSchedule.filter(s => {
    if (filterTab === 'voting') return s.status === 'voting';
    if (filterTab === 'completed') return s.status === 'completed';
    return s.status === 'history';
  });

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-display">
      {/* Header */}
      <header className="shrink-0 border-b border-gray-100 p-5 pt-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h2>
        {/* Main tabs */}
        <div className="flex bg-muted rounded-lg p-1 gap-1">
          {(['solo', 'group'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={`flex-1 h-8 rounded-md font-medium text-xs transition-all ${mainTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-muted-fg'}`}
            >
              {tab === 'solo' ? 'Solo Dining' : 'Group Dining'}
            </button>
          ))}
        </div>
      </header>

      {mainTab === 'solo' ? (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-fg p-12 text-center gap-3">
          <span className="material-symbols-outlined text-4xl text-gray-300">restaurant</span>
          <p className="text-sm font-medium">No solo dining appointments yet.<br/>Start a new single dining plan!</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filter tabs */}
          <div className="shrink-0 bg-white border-b border-gray-100 flex gap-0 px-5 overflow-x-auto hide-scrollbar">
            {(['voting', 'completed', 'history'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterTab(status)}
                className={`py-3 px-1 mr-5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${filterTab === status ? 'border-primary text-primary' : 'border-transparent text-muted-fg'}`}
              >
                {status === 'voting' ? 'Active' : status === 'completed' ? 'Completed' : 'History'}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32 hide-scrollbar">
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 transition-all hover:border-primary/30">
                  {item.status === 'history' ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        <img src={RESTAURANTS.find(r => r.id === (item as any).restaurantId)?.img} className="size-16 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-1 truncate">
                            {RESTAURANTS.find(r => r.id === (item as any).restaurantId)?.name}
                          </h4>
                          <p className="text-xs text-muted-fg">{item.date} {item.time}</p>
                          <p className="text-xs text-muted-fg">{item.place}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex -space-x-2">
                          {item.members.map((m, idx) => <img key={idx} src={m} className="size-7 rounded-full border-2 border-white object-cover" />)}
                        </div>
                        <button className="h-8 px-4 bg-gray-900 text-white rounded-md text-xs font-medium active:scale-95 transition-all">Write Review</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide ${item.status === 'voting' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-primary/10 text-primary'}`}>
                          {item.status === 'voting' ? 'Voting' : 'Done'}
                        </span>
                        {item.status === 'voting' && (
                          <span className="text-xs font-medium text-red-500">{(item as any).timeLeft}</span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-fg mb-4">{item.date} {item.time} · {item.place}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex -space-x-2">
                          {item.members.map((m, idx) => <img key={idx} src={m} className="size-7 rounded-full border-2 border-white object-cover" />)}
                        </div>
                        <button
                          onClick={() => onVoteClick(item.id, item.status)}
                          className="h-8 px-4 bg-primary text-white rounded-md text-xs font-medium active:scale-95 transition-all hover:bg-primary-dark"
                        >
                          {item.status === 'voting' ? 'Go to Vote' : 'View Results'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-muted-fg text-sm">No schedules to display.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
