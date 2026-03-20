
import React, { useState, useEffect } from 'react';
import { NavItem, RestaurantData, ChatRoom } from './types';
import HomeView from './components/HomeView';
import ScheduleView from './components/ScheduleView';
import ChatView from './components/ChatView';
import ProfileView from './components/ProfileView';
import RoleSelector from './components/RoleSelector';
import OnboardingView from './components/OnboardingView';
import PlanningFlow from './components/PlanningFlow';
import MockOS from './components/MockOS';
import MockMessenger from './components/MockMessenger';
import LoginView from './components/LoginView';
import RestaurantDetailView from './components/RestaurantDetailView';
import VotingDetailView from './components/VotingDetailView';
import ReviewWriteView from './components/ReviewWriteView';

export const RESTAURANTS: RestaurantData[] = [
  { id: 'r1', name: 'Chosun-ok', rating: 4.8, categories: ['Korean', 'Galbi'], description: '70-year tradition charcoal grilled beef ribs', matchMe: 92, matchCohort: 85, matchFriends: 78, img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2000', addressJibun: '229-1 Euljiro 3-ga, Jung-gu', addressRoad: '6-5 Euljiro 15-gil', phone: '02-2266-0333', tags: ['Halal Friendly', 'Old school', 'Beef'], priceRange: '$$$', location: { lat: '1200px', lng: '1400px' } },
  { id: 'r2', name: 'Green Garden', rating: 4.5, categories: ['Western', 'Vegan'], description: 'Fresh vegetable-focused dining experience', matchMe: 88, matchCohort: 72, matchFriends: 91, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000', addressJibun: '123-4 Itaewon-dong, Yongsan-gu', addressRoad: '56 Hoenamu-ro', phone: '02-790-1234', tags: ['Vegan', 'Eco-friendly', 'Date spot'], priceRange: '$$', location: { lat: '1600px', lng: '1200px' } },
  { id: 'r3', name: 'Seoul Palace', rating: 4.9, categories: ['Korean', 'Royal Cuisine'], description: 'Traditional Korean royal court cuisine', matchMe: 75, matchCohort: 94, matchFriends: 62, img: 'https://images.unsplash.com/photo-1553163147-622ab57b1801?q=80&w=2000', addressJibun: '1 Waryong-dong, Jongno-gu', addressRoad: '99 Yulgok-ro', phone: '02-3669-1234', tags: ['Halal Certified', 'Luxury', 'Private'], priceRange: '$$$$', location: { lat: '1300px', lng: '1700px' } },
  { id: 'r4', name: 'Halal Guys Itaewon', rating: 4.3, categories: ['Middle Eastern', 'Fast Food'], description: 'Famous white sauce from New York', matchMe: 95, matchCohort: 60, matchFriends: 88, img: 'https://images.unsplash.com/photo-1628102422204-748981440026?q=80&w=2000', addressJibun: '123 Itaewon-dong, Yongsan-gu', addressRoad: '187 Itaewon-ro', phone: '02-794-8308', tags: ['Certified Halal', 'Casual', 'Street food'], priceRange: '$', location: { lat: '1800px', lng: '1500px' } },
  { id: 'r5', name: 'Loving Hut', rating: 4.6, categories: ['Vegan', 'Cafe'], description: 'Global vegan chain restaurant', matchMe: 82, matchCohort: 80, matchFriends: 70, img: 'https://images.unsplash.com/photo-1540914124281-342729441458?q=80&w=2000', addressJibun: '1213-4 Gaepo-dong, Gangnam-gu', addressRoad: '36 Yangjaecheon-ro 7-gil', phone: '02-576-2158', tags: ['Strict Vegan', 'Healthy', 'Affordable'], priceRange: '$', location: { lat: '1400px', lng: '1100px' } },
  { id: 'r6', name: 'Osegyehyang', rating: 4.7, categories: ['Korean', 'Vegan'], description: 'Vegan hotspot in Insadong', matchMe: 77, matchCohort: 88, matchFriends: 85, img: 'https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=2000', addressJibun: '14-5 Gwanhun-dong, Jongno-gu', addressRoad: '14-5 Insadong 12-gil', phone: '02-735-7171', tags: ['Vegan', 'Traditional', 'Zen'], priceRange: '$$', location: { lat: '1100px', lng: '1300px' } },
  { id: 'r7', name: 'EID Halal', rating: 4.5, categories: ['Korean', 'Halal'], description: 'Halal-certified Korean in Itaewon', matchMe: 90, matchCohort: 82, matchFriends: 94, img: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=2000', addressJibun: '737-21 Hannam-dong, Yongsan-gu', addressRoad: '67 Usadan-ro 10-gil', phone: '02-749-0517', tags: ['Certified Halal', 'Muslim friendly', 'Bulgogi'], priceRange: '$$', location: { lat: '1500px', lng: '1800px' } },
  { id: 'r8', name: 'Casablanca', rating: 4.8, categories: ['Moroccan', 'Sandwich'], description: 'Moroccan sandwiches in Haebangchon', matchMe: 85, matchCohort: 90, matchFriends: 75, img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2000', addressJibun: '44-8 Yongsan-dong 2-ga, Yongsan-gu', addressRoad: '35 Sinheung-ro', phone: '02-797-8367', tags: ['Halal options', 'Exotic', 'Spicy'], priceRange: '$', location: { lat: '1000px', lng: '1500px' } },
  { id: 'r9', name: 'Vegetus', rating: 4.6, categories: ['Western', 'Vegan'], description: 'Vegan Western food in Haebangchon', matchMe: 80, matchCohort: 85, matchFriends: 82, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2000', addressJibun: '45-13 Yongsan-dong 2-ga, Yongsan-gu', addressRoad: '59 Sinheung-ro', phone: '02-749-1728', tags: ['Vegan', 'Gluten-free', 'Burger'], priceRange: '$$', location: { lat: '1900px', lng: '1100px' } },
  { id: 'r10', name: 'Makan Halal', rating: 4.4, categories: ['Korean', 'Halal'], description: 'Halal Korean food in Itaewon', matchMe: 89, matchCohort: 75, matchFriends: 90, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2000', addressJibun: '737-18 Hannam-dong, Yongsan-gu', addressRoad: '52 Usadan-ro 10-gil', phone: '02-6012-2231', tags: ['Certified Halal', 'K-Food', 'Cozy'], priceRange: '$$', location: { lat: '1200px', lng: '1900px' } },
];

type AppFlow = 'role_select' | 'os_lock' | 'messenger' | 'splash' | 'login' | 'onboarding' | 'main';

const App: React.FC = () => {
  const [role, setRole] = useState<'host' | 'guest_member' | 'guest_new' | null>(null);
  const [flow, setFlow] = useState<AppFlow>('role_select');
  const [view, setView] = useState<NavItem>(NavItem.EXPLORE);
  const [activeFlow, setActiveFlow] = useState<'none' | 'planning' | 'creating' | 'chat_ai'>('none');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  const [selectedResId, setSelectedResId] = useState<string | null>(null);
  const [recommendationList, setRecommendationList] = useState<string[] | null>(null);
  const [activeVotingId, setActiveVotingId] = useState<string | null>(null);
  const [showReviewWrite, setShowReviewWrite] = useState(false);
  
  const [rooms, setRooms] = useState<ChatRoom[]>([
    { id: 'chat_1', name: '1: Itaewon Crew (Host)', lastMsg: 'Vote Result: Chosun-ok selected!', time: '14:30', unread: 0, scenario: 1, members: ['Me', 'Elena', 'James'] },
    { id: 'chat_2', name: '2: Gangnam Foodies (Guest)', lastMsg: 'Shall we start the vote?', time: '12:00', unread: 2, scenario: 2, members: ['Elena', 'Daniel'] },
    { id: 'chat_3', name: '3: Veggies Unite (Newbie)', lastMsg: 'Inviting non-member friends...', time: '09:12', unread: 5, scenario: 3, members: ['Me', 'Sarah'] },
    { id: 'chat_4', name: '4: Family Weekend', lastMsg: 'See you later!', time: 'Yesterday', unread: 0, scenario: 0, members: [] },
    { id: 'chat_5', name: '5: Office Lunch', lastMsg: 'Menu is out', time: 'Yesterday', unread: 0, scenario: 0, members: [] },
    { id: 'chat_6', name: '6: Friday Night', lastMsg: 'Ready?', time: '2d ago', unread: 0, scenario: 0, members: [] },
    { id: 'chat_7', name: 'Hiking Club', lastMsg: 'Meeting point?', time: '2d ago', unread: 0, scenario: 0, members: [] },
    { id: 'chat_8', name: 'Coffee Lovers', lastMsg: 'New beans!', time: '3d ago', unread: 0, scenario: 0, members: [] },
    { id: 'chat_9', name: 'Book Club', lastMsg: 'Next read?', time: '4d ago', unread: 0, scenario: 0, members: [] },
    { id: 'chat_10', name: 'Tennis Group', lastMsg: 'Court booked', time: '5d ago', unread: 0, scenario: 0, members: [] },
  ]);

  useEffect(() => {
    if (flow === 'splash') {
      const timer = setTimeout(() => {
        if (role === 'guest_member') {
          setFlow('main');
          setView(NavItem.GROUPS);
          setActiveChatId('chat_2');
        } else if (role === 'guest_new') {
          setFlow('login');
        } else {
          setFlow('main');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flow, role]);

  const isAtDepth = !!selectedResId || !!activeVotingId || activeFlow !== 'none' || showReviewWrite;

  const addRoom = (room: ChatRoom) => {
    setRooms(prev => [room, ...prev]);
  };

  const openResDetail = (id: string, list: string[] | null = null) => {
    setSelectedResId(id);
    setRecommendationList(list);
  };

  const closeResDetail = () => {
    setSelectedResId(null);
    setRecommendationList(null);
  };

  const renderView = () => {
    switch (view) {
      case NavItem.EXPLORE: 
        return <HomeView 
          onPlanClick={() => setActiveFlow('planning')} 
          onRestaurantClick={(id) => openResDetail(id)}
        />;
      case NavItem.DINING: 
        return <ScheduleView 
          onVoteClick={(id, status) => { setView(NavItem.GROUPS); setActiveChatId('chat_1'); }} 
          rooms={rooms}
          onCreateGroup={() => setActiveFlow('creating')}
        />;
      case NavItem.GROUPS: 
        return <ChatView 
          role={role!} 
          activeChatId={activeChatId} 
          onChatSelect={setActiveChatId} 
          onVotingClick={(id) => setActiveVotingId(id)}
          rooms={rooms}
          onBackToRoot={() => { setActiveChatId(null); }}
          onResDetail={(id, list) => openResDetail(id, list)}
          onAiRecommendationTrigger={() => setActiveFlow('chat_ai')}
          onReviewWriteTrigger={() => setShowReviewWrite(true)}
          pendingAiVote={null}
          onAiVoteConsumed={() => {}}
        />;
      case NavItem.PROFILE: return <ProfileView />;
      default: return <HomeView onPlanClick={() => {}} onRestaurantClick={(id) => openResDetail(id)} />;
    }
  };

  if (flow === 'role_select') return <RoleSelector onSelect={(r) => { setRole(r); if (r === 'host') setFlow('main'); else if (r === 'guest_member') setFlow('os_lock'); else setFlow('messenger'); }} />;
  if (flow === 'os_lock') return <MockOS onNotificationClick={() => setFlow('splash')} />;
  if (flow === 'messenger') return <MockMessenger onLinkClick={() => setFlow('splash')} />;
  if (flow === 'splash') return <div className="flex flex-col items-center justify-center h-screen bg-primary text-white"><span className="material-symbols-outlined text-8xl animate-bounce">restaurant</span><h1 className="text-3xl font-black mt-4">SoulTable</h1></div>;
  if (flow === 'login') return <LoginView onLogin={() => setFlow('onboarding')} />;
  if (flow === 'onboarding') return <OnboardingView onComplete={() => setFlow('main')} />;

  return (
    <div className="flex justify-center bg-gray-950 min-h-screen font-display overflow-hidden">
      <div className="relative w-full max-w-[430px] bg-white shadow-2xl h-screen flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto relative bg-gray-50 pb-20">
          {renderView()}

          {activeVotingId && (
            <VotingDetailView 
              onClose={() => setActiveVotingId(null)}
              onOpenStoreDetail={(id) => openResDetail(id, RESTAURANTS.slice(0, 3).map(r => r.id))}
              hostName="Daniel Lee"
              promiseTitle="Itaewon Crew Weekend"
              promiseDate="2025.01.20"
              promiseLocation="Itaewon-ro"
            />
          )}

          {activeFlow !== 'none' && (
            <PlanningFlow 
              mode={activeFlow as any} 
              onClose={() => setActiveFlow('none')}
              onDone={(newRoom, aiResult) => { 
                if (activeFlow === 'chat_ai' && aiResult) {
                  setActiveFlow('none');
                } else {
                  if (newRoom) addRoom(newRoom); 
                  setActiveFlow('none'); 
                  setView(NavItem.GROUPS); 
                }
              }}
              onRestaurantClick={(id, list) => openResDetail(id, list)}
              rooms={rooms}
            />
          )}

          {selectedResId && (
            <RestaurantDetailView 
              restaurantId={selectedResId} 
              onClose={closeResDetail}
              recommendationList={recommendationList}
              onNavigate={(id) => setSelectedResId(id)}
            />
          )}

          {showReviewWrite && (
            <ReviewWriteView 
              onClose={() => setShowReviewWrite(false)}
              restaurantName={RESTAURANTS[0].name}
            />
          )}
        </div>

        {!activeChatId && !isAtDepth && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 pt-3 pb-8 flex justify-between items-center z-[100]">
            <NavBtn active={view === NavItem.EXPLORE} icon="explore" label="Home" onClick={() => setView(NavItem.EXPLORE)} />
            <NavBtn active={view === NavItem.DINING} icon="calendar_month" label="Schedule" onClick={() => setView(NavItem.DINING)} />
            <NavBtn active={view === NavItem.GROUPS} icon="forum" label="Chat" onClick={() => setView(NavItem.GROUPS)} />
            <NavBtn active={view === NavItem.PROFILE} icon="person" label="My" onClick={() => setView(NavItem.PROFILE)} />
          </nav>
        )}

        {!isAtDepth && !activeChatId && (
          <button 
            onClick={() => { setRole(null); setFlow('role_select'); setView(NavItem.EXPLORE); setActiveChatId(null); }}
            className="absolute top-12 left-6 z-[101] size-10 bg-white/80 backdrop-blur-md shadow-lg text-gray-900 rounded-full flex items-center justify-center border border-gray-100 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

const NavBtn = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary' : 'text-gray-300 hover:text-gray-400'}`}>
    <span className="material-symbols-outlined" style={{ fontVariationSettings: active ? "'FILL' 1" : "" }}>{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-tight">{label}</span>
  </button>
);

export default App;
