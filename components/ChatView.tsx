
import React, { useState, useEffect, useRef } from 'react';
import { ChatRoom, RestaurantData } from '../types';
import { RESTAURANTS } from '../App';

interface Message {
  id: string;
  user: string;
  text?: string;
  isMe: boolean;
  time: string;
  isVote?: boolean;
  isWinnerCard?: boolean;
  isReviewPrompt?: boolean;
  isReviewCard?: boolean;
  isRecommendation?: boolean;
  isAlert?: boolean;
  isDate?: boolean;
}

interface Props {
  role: string;
  activeChatId: string | null;
  onChatSelect: (id: string | null) => void;
  onVotingClick: (id: string) => void;
  rooms: ChatRoom[];
  onBackToRoot: () => void;
  onResDetail: (id: string, list: string[] | null) => void;
  onAiRecommendationTrigger: () => void;
  onReviewWriteTrigger?: () => void;
  pendingAiVote: {chatId: string, timestamp: number} | null;
  onAiVoteConsumed: () => void;
  onLogout: () => void;
}

const ChatView: React.FC<Props> = ({ role, activeChatId, onChatSelect, onVotingClick, rooms, onBackToRoot, onResDetail, onAiRecommendationTrigger, onReviewWriteTrigger, pendingAiVote, onAiVoteConsumed, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [recommendationPromptVisible, setRecommendationPromptVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentRoom = rooms.find(r => r.id === activeChatId);

  useEffect(() => {
    if (activeChatId) {
      initScenario(currentRoom?.scenario || 0);
    } else {
      setMessages([]);
      setRecommendationPromptVisible(false);
    }
  }, [activeChatId]);

  useEffect(() => {
    if (pendingAiVote && activeChatId === pendingAiVote.chatId) {
      const voteMsg: Message = { id: 'ai_vote_' + pendingAiVote.timestamp, user: 'System', isVote: true, isMe: true, time: 'Now' };
      setMessages(prev => [...prev, voteMsg]);
      onAiVoteConsumed();
      setRecommendationPromptVisible(false);
    }
  }, [pendingAiVote, activeChatId]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, recommendationPromptVisible]);

  const addMsg = (msg: Message) => setMessages(prev => [...prev, msg]);

  const initScenario = (scenario: number) => {
    switch(scenario) {
      case 1:
        setMessages([
          { id: '1', user: 'Me', text: 'Sent the vote for this meeting! Everyone please choose.', isMe: true, time: '14:00' },
          { id: 'v1', user: 'System', isVote: true, isMe: true, time: '14:05' },
          { id: '2', user: 'Elena', text: 'Chosun-ok looks great to me!', isMe: false, time: '14:10' },
          { id: '3', user: 'James', text: 'Oh, I also vote for Chosun-ok!', isMe: false, time: '14:15' },
          { id: 'winner_1', user: 'System', text: 'Vote Result: Chosun-ok selected as #1!', isMe: false, time: '14:30' },
          { id: '4', user: 'Elena', text: 'I heard it is really good here lol', isMe: false, time: '14:35' },
          { id: '5', user: 'James', text: 'The ribs smell amazing, I am already hungry', isMe: false, time: '14:40' },
          { id: '6', user: 'Me', text: 'See you all at 6 PM at Euljiro 3-ga station!', isMe: true, time: '15:00' },
          { id: '7', user: 'Elena', text: 'OK, I will be there on time', isMe: false, time: '15:05' },
          { id: '8', user: 'James', text: 'I might be a bit late ㅠㅠ will try to hurry', isMe: false, time: '15:10' },
          { id: 'c1', user: 'Elena', text: "Let's go to Euljiro foodie tour~", isMe: false, time: '15:20' },
          { id: 'c2', user: 'James', text: 'Wow, this place has great retro vibes', isMe: false, time: '15:25' },
          { id: 'c3', user: 'Elena', text: 'Should we order cold noodles too?', isMe: false, time: '18:10' },
          { id: 'c4', user: 'Me', text: 'Of course! Spicy cold noodles go-go', isMe: true, time: '18:12' },
          { id: 'c5', user: 'James', text: 'Ribs look insane...', isMe: false, time: '18:15' },
          { id: '9', user: 'Me', text: 'Glad you all enjoyed it!', isMe: true, time: '20:30' },
          { id: 'date_16', user: 'System', text: '2026.01.16', isMe: false, time: '', isDate: true },
          { id: 'review_prompt_msg', user: 'System', text: 'How was the restaurant? Please leave a review if you were satisfied!', isMe: false, time: '21:00' },
          { id: 'review_card_ui', user: 'System', isReviewCard: true, isMe: false, time: '21:00' }
        ]);
        break;
      case 2:
        setMessages([
          { id: '1', user: 'Host (Daniel)', text: 'Hello! Any thoughts on what to eat today?', isMe: false, time: '12:00' }
        ]);
        break;
      case 3:
        setMessages([
          { id: '1', user: 'Me', text: 'I invited my non-member friends.', isMe: true, time: '09:00' },
          { id: '2', user: 'Sarah', text: 'Oh! Is everyone finally meeting up?', isMe: false, time: '09:01' }
        ]);
        break;
      default:
        setMessages([]);
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const myMsg: Message = { id: Date.now().toString(), user: 'Me', text: text, isMe: true, time: 'Now' };
    setMessages(prev => [...prev, myMsg]);

    if (currentRoom?.scenario === 2) {
      setTimeout(() => {
        addMsg({ id: 'v2', user: 'System', isVote: true, isMe: false, time: 'Now' });
      }, 1500);
    } else if (currentRoom?.scenario === 3) {
      setTimeout(() => {
        addMsg({ id: 'a1', user: 'System', isAlert: true, text: 'Emily has entered the room.', isMe: false, time: 'Now' });
        setTimeout(() => {
          addMsg({ id: '3', user: 'Emily', text: 'Hello! Thank you for inviting me~', isMe: false, time: 'Now' });
          setRecommendationPromptVisible(true);
        }, 1000);
      }, 1500);
    } else {
      setTimeout(() => {
        addMsg({ id: Date.now().toString() + 'r', user: 'Friend', text: 'Great!', isMe: false, time: 'Now' });
      }, 1000);
    }
  };

  // Chat list view
  if (!activeChatId) {
    return (
      <div className="flex flex-col h-full bg-white">
        <header className="p-5 pt-4 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
            <div className="flex items-center gap-2">
              <button className="size-9 bg-white border border-gray-200 rounded-lg flex shrink-0 items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-lg">search</span>
              </button>
              <button onClick={onLogout} className="size-9 bg-white border border-gray-200 rounded-lg flex shrink-0 items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pb-24">
          {rooms.map(room => (
            <button key={room.id} onClick={() => onChatSelect(room.id)} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors">
              <div className="size-12 rounded-xl bg-muted flex items-center justify-center text-primary relative shrink-0">
                <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings:"'FILL' 1"}}>group</span>
                {room.scenario > 0 && room.scenario <= 6 && (
                  <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] font-semibold size-4 rounded-full flex items-center justify-center">
                    {room.scenario}
                  </div>
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-semibold text-sm text-gray-900 truncate">{room.name}</p>
                  <p className="text-[10px] text-muted-fg shrink-0 ml-2">{room.time}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-fg truncate">{room.lastMsg}</p>
                  {room.unread > 0 && (
                    <div className="bg-primary text-white text-[10px] font-semibold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 ml-2 shrink-0">{room.unread}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Chat room view
  return (
    <div className="flex flex-col h-full bg-gray-50 relative overflow-hidden font-display">
      <header className="pt-4 pb-3 px-4 bg-white flex items-center justify-between border-b border-gray-100 z-[110] sticky top-0">
        <div className="flex items-center gap-3">
          <button onClick={() => { onBackToRoot(); }} className="size-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <div>
            <h3 className="font-semibold text-sm text-gray-900 leading-tight">{currentRoom?.name}</h3>
            <p className="text-[10px] text-primary font-medium">{currentRoom?.members.length} members active</p>
          </div>
        </div>
        <button className="size-8 rounded-lg border border-gray-200 flex items-center justify-center text-muted-fg">
          <span className="material-symbols-outlined text-lg">more_vert</span>
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 hide-scrollbar">
        {messages.map(m => (
          <div key={m.id} className={`flex flex-col ${m.isAlert || m.isDate ? 'items-center' : (m.isMe ? 'items-end' : 'items-start')}`}>
            {m.isDate ? (
              <div className="bg-gray-200 px-4 py-1 rounded-full text-[10px] font-medium text-gray-600 my-6">
                {m.text}
              </div>
            ) : m.isAlert ? (
              <div className="bg-gray-200 px-4 py-1 rounded-full text-[10px] font-medium text-gray-600 my-3">
                {m.text}
              </div>
            ) : m.isVote ? (
              <VoteMsgCard onVoteClick={() => onVotingClick('v1')} isMe={m.isMe} />
            ) : m.isReviewCard ? (
              <ReviewPromptCard onReviewWrite={onReviewWriteTrigger} />
            ) : m.isWinnerCard ? (
              <WinnerCard res={RESTAURANTS[0]} onDetail={() => onResDetail(RESTAURANTS[0].id, null)} />
            ) : (
              <>
                {!m.isMe && m.user !== 'System' && <p className="text-[10px] text-muted-fg mb-1 ml-1 font-medium">{m.user}</p>}
                <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm ${
                  m.isMe
                    ? 'bg-primary text-white rounded-tr-sm'
                    : m.user === 'System'
                    ? 'bg-white border border-gray-200 text-gray-600 italic text-center mx-auto rounded-xl text-xs'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                }`}>
                  {m.text}
                </div>
                {m.time && <p className="text-[9px] text-muted-fg mt-1 font-medium">{m.time}</p>}
              </>
            )}
          </div>
        ))}

        {recommendationPromptVisible && (
          <div className="w-full flex justify-center pt-2">
            <button
              onClick={onAiRecommendationTrigger}
              className="w-full bg-primary text-white h-11 rounded-lg font-semibold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary-dark"
            >
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
              Want AI to continue recommendations?
            </button>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white p-3 pb-6 border-t border-gray-100 z-[120] sticky bottom-0">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
          <button className="text-muted-fg">
            <span className="material-symbols-outlined text-xl">add_circle</span>
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSend();
            }}
            placeholder="Type a message"
            className="flex-1 h-9 bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-muted-fg focus:outline-none"
          />
          <button onClick={handleSend} className="text-primary active:scale-90 transition-all">
            <span className="material-symbols-outlined text-xl" style={{fontVariationSettings:"'FILL' 1"}}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const WinnerCard = ({ res, onDetail }: { res: RestaurantData, onDetail: () => void }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 max-w-[280px]">
    <div className="flex items-center gap-1.5 mb-3 text-amber-500">
      <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>emoji_events</span>
      <p className="text-xs font-semibold">Vote Winner</p>
    </div>
    <div className="flex gap-3 mb-3">
      <img src={res.img} className="size-16 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-gray-900 leading-tight truncate">{res.name}</h4>
        <p className="text-xs text-muted-fg mt-1 line-clamp-2">{res.description}</p>
      </div>
    </div>
    <button
      onClick={onDetail}
      className="w-full h-9 bg-primary text-white rounded-lg font-medium text-xs active:scale-95 hover:bg-primary-dark"
    >
      View Details
    </button>
  </div>
);

const VoteMsgCard = ({ onVoteClick, isMe }: any) => (
  <div className={`w-full flex ${isMe ? 'justify-end' : 'justify-start'}`}>
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 max-w-[280px]">
      <div className="flex items-center gap-2 mb-3 text-primary">
        <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>how_to_vote</span>
        <p className="text-xs font-semibold">New Vote Arrived</p>
      </div>
      <div className="space-y-1.5 mb-4">
        {RESTAURANTS.slice(0, 3).map((res, i) => (
          <div key={i} className="flex items-center gap-2.5 p-2 bg-muted rounded-lg">
            <img src={res.img} className="size-9 rounded-md object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{res.name}</p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <p className="text-[10px] text-muted-fg">{res.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onVoteClick}
        className="w-full h-9 bg-primary text-white rounded-lg font-medium text-xs active:scale-95 hover:bg-primary-dark"
      >
        Go to Vote
      </button>
    </div>
  </div>
);

const ReviewPromptCard = ({ onReviewWrite }: { onReviewWrite?: () => void }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 w-full max-w-[300px] mx-auto mt-2">
    <div className="flex gap-3 mb-3">
      <img src={RESTAURANTS[0].img} className="size-14 rounded-lg object-cover shrink-0" alt="Restaurant" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">{RESTAURANTS[0].name}</h4>
        <div className="flex gap-1 mb-1">
          <span className="px-2 py-0.5 bg-muted text-[10px] font-medium text-muted-fg rounded-md">Old School</span>
          <span className="px-2 py-0.5 bg-muted text-[10px] font-medium text-muted-fg rounded-md">Traditional</span>
        </div>
        <p className="text-[10px] text-muted-fg">Party 6PM 1.15 · Itaewon</p>
      </div>
    </div>
    <button
      onClick={onReviewWrite}
      className="w-full h-9 bg-gray-900 text-white rounded-lg font-medium text-xs active:scale-95 transition-all"
    >
      Write Review
    </button>
  </div>
);

export default ChatView;
