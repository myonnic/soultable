import React, { useState } from 'react';

type SettingsViewProps = {
  onClose: () => void;
  language: 'ko' | 'en';
  onLanguageChange: (lang: 'ko' | 'en') => void;
  onLogout: () => void;
};

const SettingsView: React.FC<SettingsViewProps> = ({ onClose, language, onLanguageChange, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy'>('account');
  const [showAdModal, setShowAdModal] = useState(false);

  // Notification states
  const [notifInvites, setNotifInvites] = useState(true);
  const [notifRecs, setNotifRecs] = useState(true);
  const [notifGroups, setNotifGroups] = useState(true);

  // Privacy states
  const [profileVis, setProfileVis] = useState<'everyone' | 'friends' | 'none'>('everyone');
  const [dataSharing, setDataSharing] = useState(true);

  // Ad Modal state
  const [adInterest, setAdInterest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock backend request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAdModal(false);
      alert(language === 'ko' ? '광고 관심사 정보가 벡엔드에 성공적으로 전송되었습니다.' : 'Ad preferences successfully submitted to the backend.');
    }, 1000);
  };

  const tabs = [
    { id: 'account', label: language === 'ko' ? '계정' : 'Account' },
    { id: 'notifications', label: language === 'ko' ? '알림' : 'Notifications' },
    { id: 'privacy', label: language === 'ko' ? '개인정보' : 'Privacy' },
  ];

  return (
    <div className="absolute inset-0 bg-gray-50 z-[200] flex flex-col h-full animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-lg font-semibold text-gray-900">{language === 'ko' ? '설정' : 'Settings'}</h2>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100 shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'account' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{language === 'ko' ? '언어 설정' : 'Language Settings'}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{language === 'ko' ? '앱 언어' : 'App Language'}</span>
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as 'ko' | 'en')}
                  className="bg-gray-50 border border-gray-200 text-sm rounded-lg py-1.5 px-3 outline-none focus:border-primary"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
              <button onClick={onLogout} className="w-full flex items-center justify-between py-2 text-red-500 hover:opacity-80 transition-opacity">
                <span className="text-sm font-medium">{language === 'ko' ? '로그아웃' : 'Log Out'}</span>
                <span className="material-symbols-outlined text-xl">logout</span>
              </button>
              <div className="h-px bg-gray-100 my-2"></div>
              <button 
                onClick={() => { 
                  if(window.confirm(language === 'ko' ? '정말 계정을 삭제하시겠습니까?' : 'Delete account?')) onLogout(); 
                }} 
                className="w-full flex items-center justify-between py-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <span className="text-sm font-medium">{language === 'ko' ? '계정 삭제' : 'Delete Account'}</span>
                <span className="material-symbols-outlined text-xl">delete_forever</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer" onClick={() => setNotifInvites(!notifInvites)}>
              <div>
                <p className="text-sm font-medium text-gray-900">{language === 'ko' ? '초대 알림' : 'Invite Notifications'}</p>
                <p className="text-xs text-gray-500 mt-0.5">{language === 'ko' ? '새로운 그룹이나 모임 초대 알림' : 'Alerts for new group or event invites'}</p>
              </div>
              <Toggle checked={notifInvites} onChange={() => setNotifInvites(!notifInvites)} />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer" onClick={() => setNotifRecs(!notifRecs)}>
              <div>
                <p className="text-sm font-medium text-gray-900">{language === 'ko' ? '추천 알림' : 'Recommendation Alerts'}</p>
                <p className="text-xs text-gray-500 mt-0.5">{language === 'ko' ? '나의 취향에 맞는 식당 추천 알림' : 'Alerts for personalized restaurant recommendations'}</p>
              </div>
              <Toggle checked={notifRecs} onChange={() => setNotifRecs(!notifRecs)} />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer" onClick={() => setNotifGroups(!notifGroups)}>
              <div>
                <p className="text-sm font-medium text-gray-900">{language === 'ko' ? '그룹 업데이트 알림' : 'Group Updates'}</p>
                <p className="text-xs text-gray-500 mt-0.5">{language === 'ko' ? '참여 중인 그룹의 투표 및 메시지 알림' : 'Alerts for active group votes and messages'}</p>
              </div>
              <Toggle checked={notifGroups} onChange={() => setNotifGroups(!notifGroups)} />
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{language === 'ko' ? '내 정보 공개 범위' : 'Who can see my info?'}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{language === 'ko' ? '프로필 공개' : 'Profile Visibility'}</span>
                  <select
                    value={profileVis}
                    onChange={(e) => setProfileVis(e.target.value as any)}
                    className="bg-gray-50 border border-gray-200 text-sm rounded-lg py-1.5 px-3 outline-none focus:border-primary"
                  >
                    <option value="everyone">{language === 'ko' ? '전체 공개' : 'Everyone'}</option>
                    <option value="friends">{language === 'ko' ? '친구만' : 'Friends only'}</option>
                    <option value="none">{language === 'ko' ? '비공개' : 'Only me'}</option>
                  </select>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setDataSharing(!dataSharing)}>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{language === 'ko' ? '데이터 공유 허용' : 'Data Sharing'}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{language === 'ko' ? '서비스 개선을 위한 익명 데이터 제공' : 'Share anonymous data to improve service'}</p>
                  </div>
                  <Toggle checked={dataSharing} onChange={() => setDataSharing(!dataSharing)} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-primary/20 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">campaign</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">{language === 'ko' ? '비즈니스 광고 설정' : 'Ad Preferences'}</h3>
                  <p className="text-xs text-gray-600 mt-1 mb-3">
                    {language === 'ko' ? '맞춤형 비즈니스 광고를 위해 관심사를 등록해 보세요.' : 'Register your interests for personalized business ads.'}
                  </p>
                  <button 
                    onClick={() => setShowAdModal(true)}
                    className="text-xs font-semibold bg-white border border-primary text-primary px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    {language === 'ko' ? '관심사 설정하기' : 'Set Preferences'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ad Preferences Modal */}
      {showAdModal && (
        <div className="absolute inset-0 z-[210] flex items-center justify-center p-5 bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden flex flex-col p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">{language === 'ko' ? '광고 관심사 설정' : 'Ad Preferences'}</h3>
              <button type="button" onClick={() => setShowAdModal(false)} className="text-gray-400 hover:text-gray-900">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              {language === 'ko' ? '관심 있는 광고 카테고리나 키워드를 입력해 주시면 더 관련성 높은 혜택을 제공해 드립니다.' : 'Enter ad categories or keywords you are interested in for more relevant offers.'}
            </p>
            <form onSubmit={handleAdSubmit} className="flex flex-col gap-4">
              <textarea 
                value={adInterest}
                onChange={(e) => setAdInterest(e.target.value)}
                placeholder={language === 'ko' ? '예: 비건 뷰티, 친환경 의류, 요가...' : 'e.g., Vegan beauty, Eco-friendly clothes...'}
                className="w-full h-24 p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-sm"
                required
              />
              <button 
                type="submit" 
                disabled={isSubmitting || !adInterest.trim()}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all ${isSubmitting || !adInterest.trim() ? 'bg-gray-300' : 'bg-primary hover:bg-primary/90 shadow-md shadow-primary/20'}`}
              >
                {isSubmitting ? (language === 'ko' ? '전송 중...' : 'Submitting...') : (language === 'ko' ? '저장하기' : 'Save')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple reusable Toggle component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button 
    type="button"
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-gray-200'}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

export default SettingsView;
