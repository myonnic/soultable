
import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import { RESTAURANTS } from '../App';
import MenuView from './MenuView';
import ReviewsView from './ReviewsView';
import InfoView from './InfoView';

interface Props {
  restaurantId: string;
  onClose: () => void;
  recommendationList: string[] | null;
  onNavigate?: (id: string) => void;
}

const RestaurantDetailView: React.FC<Props> = ({ restaurantId, onClose, recommendationList, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.OVERVIEW);
  const resIndex = RESTAURANTS.findIndex(r => r.id === restaurantId);
  const res = RESTAURANTS[resIndex] || RESTAURANTS[0];

  useEffect(() => { setActiveTab(TabType.OVERVIEW); }, [restaurantId]);

  const currentIndex = recommendationList ? recommendationList.indexOf(restaurantId) : -1;
  const hasPrev = recommendationList && currentIndex > 0;
  const hasNext = recommendationList && currentIndex < recommendationList.length - 1;

  const handlePrev = () => {
    if (hasPrev && onNavigate) onNavigate(recommendationList![currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext && onNavigate) onNavigate(recommendationList![currentIndex + 1]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.OVERVIEW:
        return (
          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-4">Match Points</h3>
              <div className="grid grid-cols-3 gap-3">
                <MatchCard label="My Match Rate" percent={res.matchMe} color="text-primary bg-primary/5 border-primary/10" />
                <MatchCard label="Similar Users" percent={res.matchCohort} color="text-amber-500 bg-amber-50 border-amber-100" />
                <MatchCard label="Our Friends" percent={res.matchFriends} color="text-blue-500 bg-blue-50 border-blue-100" />
              </div>
            </section>
            
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-4">Location Info</h3>
              <div className="space-y-4 mb-6">
                <InfoItem label="Address" value={res.addressJibun} icon="location_on" />
                <InfoItem label="Street Address" value={res.addressRoad} icon="map" />
                <InfoItem label="Phone" value={res.phone} icon="call" />
              </div>
              <div className="w-full h-40 rounded-xl overflow-hidden border border-gray-200">
                 <img src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${res.location.lng.replace('px','')},${res.location.lat.replace('px','')},15/400x300?access_token=none`} className="w-full h-full object-cover grayscale opacity-80" alt="Map View" />
              </div>
            </section>
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Special Tags</h3>
              <div className="flex flex-wrap gap-2">
                {res.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-muted text-muted-fg border border-gray-200 rounded-md text-[11px] font-medium">{tag}</span>
                ))}
              </div>
            </section>
          </div>
        );
      case TabType.MENU: return <MenuView />;
      case TabType.REVIEWS: return <ReviewsView />;
      case TabType.INFO: return <InfoView />;
      default: return null;
    }
  };

  return (
    <div className="absolute inset-0 z-[350] bg-white flex flex-col overflow-hidden font-display">
      <header className="absolute top-0 left-0 right-0 z-[360] p-4 flex justify-between items-center">
        <button onClick={onClose} className="size-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-90 transition-all shadow-sm">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </button>
      </header>

        <div className={`flex-1 overflow-y-auto ${recommendationList ? 'pb-40' : 'pb-20'}`}>
        <img src={res.img} className="w-full h-64 object-cover" />
        <div className="relative -mt-6 rounded-t-2xl bg-white p-5 min-h-full border-t border-gray-100">
          <div className="mb-5 pt-1">
            <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{res.name}</h1>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {res.categories.map(c => (
                <span key={c} className="text-[10px] font-medium uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">{c}</span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 border-b border-gray-100 overflow-x-auto hide-scrollbar sticky top-0 bg-white z-20 -mx-5 px-5">
            {[TabType.OVERVIEW, TabType.MENU, TabType.PHOTOS, TabType.REVIEWS, TabType.INFO].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${activeTab === t ? 'border-primary text-primary' : 'border-transparent text-muted-fg'}`}>
                {t === TabType.OVERVIEW ? 'Home' : t === TabType.MENU ? 'Menu' : t === TabType.PHOTOS ? 'Photos' : t === TabType.REVIEWS ? 'Reviews' : 'Info'}
              </button>
            ))}
          </div>
          <div className="-mx-6">{renderTabContent()}</div>
        </div>
      </div>

      {recommendationList && (
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 p-6 pb-10 flex gap-3 z-[370]">
          <button 
            onClick={handlePrev}
            disabled={!hasPrev}
            className={`flex-1 h-11 rounded-lg font-medium text-xs active:scale-95 transition-all border flex items-center justify-center gap-1.5 ${hasPrev ? 'bg-white border-gray-200 text-gray-600 hover:bg-muted' : 'bg-gray-50 border-gray-100 text-gray-300'}`}
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
            Previous
          </button>
          <button 
            onClick={handleNext}
            disabled={!hasNext}
            className={`flex-1 h-11 rounded-lg font-medium text-xs active:scale-95 transition-all border flex items-center justify-center gap-1.5 ${hasNext ? 'bg-white border-gray-200 text-gray-600 hover:bg-muted' : 'bg-gray-50 border-gray-100 text-gray-300'}`}
          >
            Next
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  );
};

const MatchCard = ({ label, percent, color }: any) => (
  <div className={`p-3 rounded-lg border flex flex-col items-center justify-center text-center transition-all ${color}`}>
    <p className="text-lg font-bold leading-none">{percent}%</p>
    <p className="text-[8px] font-medium mt-1 opacity-70 whitespace-nowrap leading-tight">{label}</p>
  </div>
);

const InfoItem = ({ label, value, icon }: any) => (
  <div className="flex items-start gap-3">
    <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-muted-fg shrink-0">
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </div>
    <div className="flex-1">
      <p className="text-[10px] text-muted-fg font-medium uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-800 leading-tight">{value}</p>
    </div>
  </div>
);

export default RestaurantDetailView;
