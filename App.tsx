
import React, { useState, useEffect } from 'react';
import { NavItem, RestaurantData, ChatRoom } from './types';
import HomeView from './components/HomeView';
import ScheduleView from './components/ScheduleView';
import ChatView from './components/ChatView';
import ProfileView from './components/ProfileView';
import RoleSelector from './components/RoleSelector';
import OnboardingView, { OnboardingData } from './components/OnboardingView';
import PlanningFlow from './components/PlanningFlow';
import MockOS from './components/MockOS';
import MockMessenger from './components/MockMessenger';
import LoginView from './components/LoginView';
import RestaurantDetailView from './components/RestaurantDetailView';
import VotingDetailView from './components/VotingDetailView';
import ReviewWriteView from './components/ReviewWriteView';
import SettingsView from './components/SettingsView';

export const RESTAURANTS: RestaurantData[] = [
  { id: 'r1', name: '조선옥 (Chosun-ok)', rating: 4.8, categories: ['한식', '갈비'], description: '70년 전통의 연탄 한우 갈비', matchMe: 92, matchCohort: 85, matchFriends: 78, img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2000', addressJibun: '강남구 역삼동 832-4', addressRoad: '테헤란로14길 6', phone: '02-555-0333', tags: ['Halal Friendly', 'Old school', 'Beef'], priceRange: '₩₩₩', location: { lat: '1200px', lng: '1400px' }, latlng: { lat: 37.5007, lng: 127.0336 } },
  { id: 'r2', name: 'Green Garden', rating: 4.5, categories: ['양식', '비건'], description: '신선한 채소 위주의 다이닝', matchMe: 88, matchCohort: 72, matchFriends: 91, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000', addressJibun: '강남구 역삼동 678-5', addressRoad: '강남대로94길 25', phone: '02-555-1234', tags: ['Vegan', 'Eco-friendly', 'Date spot'], priceRange: '₩₩', location: { lat: '1600px', lng: '1200px' }, latlng: { lat: 37.4960, lng: 127.0290 } },
  { id: 'r3', name: 'Seoul Palace', rating: 4.9, categories: ['한식', '궁중요리'], description: '정통 궁중 한정식의 맛', matchMe: 75, matchCohort: 94, matchFriends: 62, img: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=2000', addressJibun: '강남구 삼성동 154-3', addressRoad: '봉은사로 205', phone: '02-555-3669', tags: ['Halal Certified', 'Luxury', 'Private'], priceRange: '₩₩₩₩', location: { lat: '1300px', lng: '1700px' }, latlng: { lat: 37.5082, lng: 127.0561 } },
  { id: 'r4', name: 'Halal Guys Gangnam', rating: 4.3, categories: ['중동음식', '패스트푸드'], description: '뉴욕에서 온 화이트 소스', matchMe: 95, matchCohort: 60, matchFriends: 88, img: 'https://images.unsplash.com/photo-1628102422204-748981440026?q=80&w=2000', addressJibun: '강남구 역삼동 823-4', addressRoad: '테헤란로 119', phone: '02-555-8308', tags: ['Certified Halal', 'Casual', 'Street food'], priceRange: '₩', location: { lat: '1800px', lng: '1500px' }, latlng: { lat: 37.5001, lng: 127.0363 } },
  { id: 'r5', name: 'Loving Hut', rating: 4.6, categories: ['비건', '카페'], description: '전세계 비건 체인점', matchMe: 82, matchCohort: 80, matchFriends: 70, img: 'https://images.unsplash.com/photo-1540914124281-342729441458?q=80&w=2000', addressJibun: '강남구 대치동 945-2', addressRoad: '테헤란로 521', phone: '02-555-2158', tags: ['Strict Vegan', 'Healthy', 'Affordable'], priceRange: '₩', location: { lat: '1400px', lng: '1100px' }, latlng: { lat: 37.5050, lng: 127.0620 } },
  { id: 'r6', name: 'Osegyehyang', rating: 4.7, categories: ['한식', '비건'], description: '강남 비건 맛집', matchMe: 77, matchCohort: 88, matchFriends: 85, img: 'https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=2000', addressJibun: '강남구 논현동 146-5', addressRoad: '학동로 243', phone: '02-555-7171', tags: ['Vegan', 'Traditional', 'Zen'], priceRange: '₩₩', location: { lat: '1100px', lng: '1300px' }, latlng: { lat: 37.5117, lng: 127.0283 } },
  { id: 'r7', name: 'EID Halal', rating: 4.5, categories: ['한식', '할랄'], description: '강남 할랄 인증 한식당', matchMe: 90, matchCohort: 82, matchFriends: 94, img: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=2000', addressJibun: '강남구 역삼동 825-20', addressRoad: '테헤란로14길 15', phone: '02-555-0517', tags: ['Certified Halal', 'Muslim friendly', 'Bulgogi'], priceRange: '₩₩', location: { lat: '1500px', lng: '1800px' }, latlng: { lat: 37.4988, lng: 127.0313 } },
  { id: 'r8', name: 'Casablanca', rating: 4.8, categories: ['모로코음식', '샌드위치'], description: '강남 모로코 샌드위치', matchMe: 85, matchCohort: 90, matchFriends: 75, img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2000', addressJibun: '강남구 청담동 15-3', addressRoad: '도산대로 141', phone: '02-555-8367', tags: ['Halal options', 'Exotic', 'Spicy'], priceRange: '₩', location: { lat: '1000px', lng: '1500px' }, latlng: { lat: 37.5240, lng: 127.0438 } },
  { id: 'r9', name: 'Vegetus', rating: 4.6, categories: ['양식', '비건'], description: '선릉역 비건 양식당', matchMe: 80, matchCohort: 85, matchFriends: 82, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2000', addressJibun: '강남구 역삼동 735-4', addressRoad: '선릉로 428', phone: '02-555-1728', tags: ['Vegan', 'Gluten-free', 'Burger'], priceRange: '₩₩', location: { lat: '1900px', lng: '1100px' }, latlng: { lat: 37.5041, lng: 127.0488 } },
  { id: 'r10', name: 'Makan Halal', rating: 4.4, categories: ['한식', '할랄'], description: '강남 할랄 한식당', matchMe: 89, matchCohort: 75, matchFriends: 90, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2000', addressJibun: '강남구 논현동 239-4', addressRoad: '봉은사로 95', phone: '02-555-2231', tags: ['Certified Halal', 'K-Food', 'Cozy'], priceRange: '₩₩', location: { lat: '1200px', lng: '1900px' }, latlng: { lat: 37.5135, lng: 127.0383 } },
];


type AppFlow = 'splash_intro' | 'welcome' | 'role_select' | 'os_lock' | 'messenger' | 'splash' | 'login' | 'onboarding' | 'main';

const App: React.FC = () => {
  const [role, setRole] = useState<'host' | 'guest_member' | 'guest_new' | null>(null);
  const [flow, setFlow] = useState<AppFlow>('splash_intro');
  const [view, setView] = useState<NavItem>(NavItem.EXPLORE);
  const [activeFlow, setActiveFlow] = useState<'none' | 'planning' | 'creating' | 'chat_ai'>('none');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  const [showSettings, setShowSettings] = useState(false);
  const [showEditOnboarding, setShowEditOnboarding] = useState(false);
  const [userDietProfile, setUserDietProfile] = useState<OnboardingData | null>(null);
  const [appLanguage, setAppLanguage] = useState<'ko' | 'en'>('ko');
  
  const [selectedResId, setSelectedResId] = useState<string | null>(null);
  const [recommendationList, setRecommendationList] = useState<string[] | null>(null);
  const [activeVotingId, setActiveVotingId] = useState<string | null>(null);
  const [showReviewWrite, setShowReviewWrite] = useState(false);
  const [pendingAiVote, setPendingAiVote] = useState<{chatId: string, timestamp: number} | null>(null);
  
  const [rooms, setRooms] = useState<ChatRoom[]>([
    { id: 'chat_1', name: '1: Itaewon Crew (Host)', lastMsg: '투표 결과: 조선옥이 선정되었습니다!', time: '14:30', unread: 0, scenario: 1, members: ['Me', 'Elena', 'James'] },
    { id: 'chat_2', name: '2: Gangnam Foodies (Guest)', lastMsg: '투표 시작할까요?', time: '12:00', unread: 2, scenario: 2, members: ['Elena', 'Daniel'] },
    { id: 'chat_3', name: '3: Veggies Unite (Newbie)', lastMsg: '비회원 친구 초대중...', time: '09:12', unread: 5, scenario: 3, members: ['Me', 'Sarah'] },
    { id: 'chat_4', name: '4: Family Weekend', lastMsg: 'See you later!', time: 'Yesterday', unread: 0, scenario: 0, members: [] },
    { id: 'chat_5', name: '5: Office Lunch', lastMsg: 'Menu is out', time: 'Yesterday', unread: 0, scenario: 0, members: [] },
    { id: 'chat_6', name: '6: Friday Night', lastMsg: 'Ready?', time: '2d ago', unread: 0, scenario: 0, members: [] },
    { id: 'chat_7', name: 'Hiking Club', lastMsg: 'Meeting point?', time: '2d ago', unread: 0, scenario: 0, members: [] },
    { id: 'chat_8', name: 'Coffee Lovers', lastMsg: 'New beans!', time: '3d ago', unread: 0, scenario: 0, members: [] },
    { id: 'chat_9', name: 'Book Club', lastMsg: 'Next read?', time: '4d ago', unread: 0, scenario: 0, members: [] },
    { id: 'chat_10', name: 'Tennis Group', lastMsg: 'Court booked', time: '5d ago', unread: 0, scenario: 0, members: [] },
  ]);

  useEffect(() => {
    if (flow === 'splash_intro') {
      const timer = setTimeout(() => setFlow('welcome'), 2000);
      return () => clearTimeout(timer);
    }
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

  const isAtDepth = !!selectedResId || !!activeVotingId || activeFlow !== 'none' || showReviewWrite || showSettings || showEditOnboarding;

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

  const handleLogout = () => {
    setRole(null);
    setFlow('role_select');
    setView(NavItem.EXPLORE);
    setActiveChatId(null);
  };

  const renderView = () => {
    switch (view) {
      case NavItem.EXPLORE: 
        return <HomeView 
          onPlanClick={() => setActiveFlow('planning')} 
          onRestaurantClick={(id) => openResDetail(id)}
          onLogout={handleLogout}
        />;
      case NavItem.DINING: 
        return <ScheduleView 
          onVoteClick={(id, status) => { setView(NavItem.GROUPS); setActiveChatId('chat_1'); }} 
          rooms={rooms}
          onCreateGroup={() => setActiveFlow('creating')}
          onLogout={handleLogout}
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
          pendingAiVote={pendingAiVote}
          onAiVoteConsumed={() => setPendingAiVote(null)}
          onLogout={handleLogout}
        />;
      case NavItem.SAVED: return <div className="p-8 text-center text-gray-500 animate-in fade-in">Saved restaurants placeholder</div>;
      case NavItem.PROFILE: return (
        <ProfileView 
          userDietProfile={userDietProfile} 
          onOpenSettings={() => setShowSettings(true)} 
          onEditRestrictions={() => setShowEditOnboarding(true)}
          onLogout={handleLogout}
        />
      );
      default: return <HomeView onPlanClick={() => {}} onRestaurantClick={(id) => openResDetail(id)} onLogout={handleLogout} />;
    }
  };

  if (flow === 'splash_intro') return <div className="flex flex-col items-center justify-center h-screen bg-primary"><div className="size-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl animate-bounce"><span className="material-symbols-outlined text-primary text-5xl" style={{fontVariationSettings:"'FILL' 1"}}>restaurant</span></div><h1 className="text-3xl font-bold text-white tracking-tight">SoulTable</h1><p className="text-white/80 mt-2 font-medium text-sm">Everyone at the table.</p></div>;
  if (flow === 'welcome') return <div className="flex flex-col items-center justify-between h-screen bg-white p-6 pt-32 pb-12 animate-in fade-in duration-500"><div className="flex flex-col items-center text-center"><div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8"><span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings:"'FILL' 1"}}>restaurant</span></div><h1 className="text-2xl font-bold text-gray-900 mb-3">Welcome to SoulTable!</h1><p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">서로 다른 식단을 가진 모두가 함께 즐길 수 있는 식당을 찾아보세요.</p></div><button onClick={() => setFlow('onboarding')} className="w-full max-w-[430px] h-14 bg-primary text-white rounded-xl font-bold text-base shadow-lg shadow-primary/30 active:scale-95 transition-transform hover:bg-primary-dark">시작하기 (Get Started)</button></div>;
  if (flow === 'onboarding') return <OnboardingView onComplete={(data) => { setUserDietProfile(data); setFlow('role_select'); }} />;
  if (flow === 'role_select') return <RoleSelector onSelect={(r) => { setRole(r); if (r === 'host') setFlow('main'); else if (r === 'guest_member') setFlow('os_lock'); else setFlow('messenger'); }} />;
  if (flow === 'os_lock') return <MockOS onNotificationClick={() => setFlow('splash')} />;
  if (flow === 'messenger') return <MockMessenger onLinkClick={() => setFlow('splash')} />;
  if (flow === 'splash') return <div className="flex flex-col items-center justify-center h-screen bg-white"><div className="size-14 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-sm"><span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>restaurant</span></div><h1 className="text-xl font-bold text-gray-900">SoulTable</h1></div>;
  if (flow === 'login') return <LoginView onLogin={() => setFlow('main')} />;

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen font-display overflow-hidden">
      <div className="relative w-full max-w-[430px] bg-white shadow-sm border-x border-gray-200 h-screen flex flex-col overflow-hidden">
        
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
                  setPendingAiVote({ chatId: activeChatId!, timestamp: Date.now() });
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

          {showSettings && (
            <SettingsView 
              onClose={() => setShowSettings(false)}
              language={appLanguage}
              onLanguageChange={setAppLanguage}
              onLogout={() => { setShowSettings(false); setRole(null); setFlow('role_select'); setView(NavItem.EXPLORE); setActiveChatId(null); }}
            />
          )}
        </div>

        {!activeChatId && !isAtDepth && (
          <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pt-2 pb-[0.8rem] flex justify-between items-center z-[100]">
            <NavBtn active={view === NavItem.EXPLORE} icon="explore" label="Home" onClick={() => setView(NavItem.EXPLORE)} />
            <NavBtn active={view === NavItem.DINING} icon="calendar_month" label="Schedule" onClick={() => setView(NavItem.DINING)} />
            <NavBtn active={view === NavItem.GROUPS} icon="forum" label="Chat" onClick={() => setView(NavItem.GROUPS)} />
            <NavBtn active={view === NavItem.PROFILE} icon="person" label="My" onClick={() => setView(NavItem.PROFILE)} />
          </nav>
        )}
      </div>

      {/* Edit Onboarding Overlay */}
      {showEditOnboarding && (
        <div className="absolute inset-0 z-[200]">
          <OnboardingView 
            initialData={userDietProfile || undefined}
            isEditMode
            onClose={() => setShowEditOnboarding(false)}
            onComplete={(data) => {
              setUserDietProfile(data);
              setShowEditOnboarding(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

const NavBtn = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: active ? "'FILL' 1" : "" }}>{icon}</span>
    <span className={`text-[10px] font-semibold tracking-tight ${active ? 'text-primary' : ''}`}>{label}</span>
  </button>
);

export default App;
