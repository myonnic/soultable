import React, { useState } from 'react';
import { OnboardingData } from './OnboardingView';

type ProfileViewProps = {
  onOpenSettings?: () => void;
  onEditRestrictions?: () => void;
  userDietProfile?: OnboardingData | null;
  onLogout?: () => void;
};

// --- MAPPINGS ---
const DIET_MAP: Record<string, [string, string]> = {
  all: ['🍽️', 'No restrictions'],
  vegetarian_vegan: ['🌿', 'Vegetarian / Vegan'],
  religious: ['🕌', 'Religious rules'],
};
const VEGAN_MAP: Record<string, [string, string]> = {
  flexitarian: ['🥩', 'Flexitarian'], pescatarian: ['🐟', 'Pescatarian'],
  vegetarian: ['🥚', 'Vegetarian'], lacto: ['🥛', 'Lacto-vegetarian'],
  vegan: ['🌱', 'Vegan'], strict_vegan: ['🌿', 'Strict Vegan'],
};
const RELIGION_MAP: Record<string, [string, string]> = {
  halal: ['☪️', 'Halal'], kosher: ['✡️', 'Kosher'], 
  hindu: ['🕉️', 'Hindu'], buddhist: ['☸️', 'Buddhist'],
};
const CANNOT_MAP: Record<string, [string, string]> = {
  pork: ['🐷', 'Pork'], beef: ['🐄', 'Beef'], poultry: ['🍗', 'Poultry'],
  shellfish: ['🦐', 'Shellfish'], fish: ['🐟', 'Fish'], eggs: ['🥚', 'Eggs'],
  dairy: ['🥛', 'Dairy'], honey: ['🍯', 'Honey'], peanuts: ['🥜', 'Peanuts'],
  tree_nuts: ['🌰', 'Tree nuts'], gluten: ['🌾', 'Gluten / Wheat'], soy: ['🫘', 'Soy'],
  sesame: ['🌿', 'Sesame'], alcohol: ['🍶', 'Alcohol'], jeotgal: ['🐠', 'Jeotgal'],
  garlic: ['🧄', 'Garlic'], msg: ['💊', 'MSG'],
};
const DISLIKE_MAP: Record<string, [string, string]> = {
  spicy: ['🌶️', 'Spicy'], fermented: ['🥢', 'Fermented'], raw: ['🥩', 'Raw meat/fish'],
  offal: ['🫀', 'Offal'], pungent: ['💨', 'Pungent flavor'], mushroom: ['🍄', 'Mushrooms'],
  tofu: ['🧆', 'Tofu'], game: ['🐾', 'Exotic meat'],
};

const ProfileView: React.FC<ProfileViewProps> = ({ onOpenSettings, onEditRestrictions, userDietProfile, onLogout }) => {
  const [showDetail, setShowDetail] = useState(false);

  // Summary generation logic
  const getSummaryTags = () => {
    if (!userDietProfile) return <span className="inline-block text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md mt-2">No dietary data</span>;
    
    const tags = [];
    
    // 1. Diet Type
    if (userDietProfile.diet_type === 'all') {
      tags.push(<Tag key="diet" text="🍽️ No restrictions" />);
    } else if (userDietProfile.diet_type === 'vegetarian_vegan' && userDietProfile.vegan_type) {
      const mapped = VEGAN_MAP[userDietProfile.vegan_type];
      if (mapped) tags.push(<Tag key="diet" text={`${mapped[0]} ${mapped[1]}`} />);
    } else if (userDietProfile.diet_type === 'religious') {
      if (userDietProfile.religion_type?.startsWith('other:')) {
        tags.push(<Tag key="diet" text={`🙏 ${userDietProfile.religion_type.split(':')[1]}`} />);
      } else if (userDietProfile.religion_type) {
        const mapped = RELIGION_MAP[userDietProfile.religion_type];
        if (mapped) tags.push(<Tag key="diet" text={`${mapped[0]} ${mapped[1]}`} />);
      }
    }

    // 2. Cannot Eat
    const cant = userDietProfile.cannot_eat || [];
    if (cant.length > 0 && !cant.includes('none')) {
      if (cant.length <= 2) {
        cant.forEach(c => {
          const m = CANNOT_MAP[c];
          if (m) tags.push(<Tag key={`cant_${c}`} alert text={`${m[0]} ${m[1]}`} />);
        });
      } else {
        tags.push(<Tag key="cant_summary" alert text={`🚫 Allergies ${cant.length}`} />);
      }
    }

    return (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {tags.slice(0, 2)}
        {tags.length > 2 && <span className="text-[11px] font-medium text-gray-400 self-center ml-1">+{tags.length - 2} more</span>}
      </div>
    );
  };

  const renderBadge = (emoji: string, label: string, isAlert = false) => (
    <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${isAlert ? 'border-red-100 bg-red-50 text-red-700' : 'border-gray-200 bg-white text-gray-700'} shadow-sm text-xs font-semibold`}>
      <span className="text-sm">{emoji}</span>
      <span>{label}</span>
    </div>
  );

  // --- DETAIL VIEW ---
  if (showDetail) {
    let dietBadge = renderBadge('🍽️', 'No restrictions');
    if (userDietProfile?.diet_type === 'vegetarian_vegan' && userDietProfile.vegan_type) {
      const m = VEGAN_MAP[userDietProfile.vegan_type];
      if (m) dietBadge = renderBadge(m[0], m[1]);
    } else if (userDietProfile?.diet_type === 'religious') {
      if (userDietProfile.religion_type?.startsWith('other:')) {
        dietBadge = renderBadge('🙏', userDietProfile.religion_type.split(':')[1]);
      } else if (userDietProfile.religion_type) {
        const m = RELIGION_MAP[userDietProfile.religion_type];
        if (m) dietBadge = renderBadge(m[0], m[1]);
      }
    }

    const cant = userDietProfile?.cannot_eat || [];
    const dislikes = userDietProfile?.dislike || [];

    return (
      <div className="bg-gray-50 min-h-full flex flex-col cursor-auto animate-in slide-in-from-right-4 duration-300">
        <div className="px-5 pt-4 pb-4 border-b border-gray-200 bg-white flex items-center sticky top-0 z-10 shadow-sm">
          <button onClick={() => setShowDetail(false)} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h2 className="text-lg font-semibold text-gray-900 ml-2">Profile Details</h2>
        </div>
        
        <div className="p-5 flex items-center justify-between border-b border-gray-200 bg-white mb-3">
          <div className="flex items-center gap-4">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV_Dfh-VauPwgyHDyf9vazrRySA4xZdaVu7wtOEV_WxZIXcmMpG7uGezlpWaRyzC1glfdaJqERDTRaCl4LYxRJ0ee-BbO8qrtKK_KC1VLWxXsYUjv4xp2Kw1k2u4m1QoJluhhGLpMzZ_TXjHwR7zusIr_O5IAoP1qNPJXuaqUCoBCAMxTPsOtiObkIzcfApEnob0amEHOIZuuYuKj8RjEi0mEwvov3MAzkCHgLJF4FlZd6UgyB6BDjWUCYG6kulsyVA3zuO_-7QUs" className="size-16 rounded-xl object-cover border border-gray-100 shadow-sm" />
             <div>
               <h3 className="font-bold text-gray-900 text-lg">Sarah Jenkins</h3>
               <p className="text-xs text-muted-fg mt-0.5">sarah@example.com</p>
             </div>
          </div>
          <button className="text-xs font-semibold text-gray-600 px-3 py-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:bg-gray-50 flex items-center gap-1 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[14px]">edit</span>
            Edit
          </button>
        </div>

        <div className="px-5 py-6 bg-white border-y border-gray-200">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-gray-900">Dietary Settings</h3>
              <button 
                onClick={onEditRestrictions} 
                className="text-xs font-bold text-primary bg-primary/10 px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-[14px] fill-current" style={{fontVariationSettings:"'FILL' 1"}}>edit_document</span>
                Edit Restrictions
              </button>
           </div>
           
           {!userDietProfile ? (
             <div className="py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
               <span className="material-symbols-outlined text-gray-400 text-3xl mb-2">assignment</span>
               <p className="text-sm text-gray-500 font-medium">No dietary settings found.</p>
               <button onClick={onEditRestrictions} className="mt-3 text-xs font-semibold text-primary underline underline-offset-2">Setup now</button>
             </div>
           ) : (
             <div className="space-y-6">
               <div>
                 <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide">Diet Type</p>
                 <div className="flex items-center gap-2">
                   {dietBadge}
                 </div>
               </div>
               
               <div>
                 <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide">Cannot Eat</p>
                 <div className="flex flex-wrap gap-2">
                   {cant.length === 0 || cant.includes('none') ? (
                     <span className="text-sm text-gray-500">None</span>
                   ) : (
                     cant.map(c => {
                       const m = CANNOT_MAP[c];
                       return m ? renderBadge(m[0], m[1], true) : null;
                     })
                   )}
                 </div>
               </div>

               {dislikes.length > 0 && !dislikes.includes('none') && (
                 <div>
                   <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide">Prefer to Avoid</p>
                   <div className="flex flex-wrap gap-2">
                     {dislikes.map(d => {
                       const m = DISLIKE_MAP[d];
                       return m ? renderBadge(m[0], m[1]) : null;
                     })}
                   </div>
                 </div>
               )}
             </div>
           )}
        </div>
      </div>
    );
  }

  // --- MAIN VIEW ---
  return (
    <div className="bg-white min-h-full">
      {/* Header */}
      <div className="px-5 pt-4 pb-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">My Profile</h2>
        <div className="flex items-center gap-2">
          <button onClick={onOpenSettings} className="size-9 bg-white border border-gray-200 rounded-lg flex shrink-0 items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">settings</span>
          </button>
          <button onClick={onLogout} className="size-9 bg-white border border-gray-200 rounded-lg flex shrink-0 items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>

      {/* Profile card (Clickable to enter details) */}
      <button 
        onClick={() => setShowDetail(true)}
        className="w-full text-left px-5 py-6 flex items-center justify-between gap-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="size-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0 shadow-sm">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV_Dfh-VauPwgyHDyf9vazrRySA4xZdaVu7wtOEV_WxZIXcmMpG7uGezlpWaRyzC1glfdaJqERDTRaCl4LYxRJ0ee-BbO8qrtKK_KC1VLWxXsYUjv4xp2Kw1k2u4m1QoJluhhGLpMzZ_TXjHwR7zusIr_O5IAoP1qNPJXuaqUCoBCAMxTPsOtiObkIzcfApEnob0amEHOIZuuYuKj8RjEi0mEwvov3MAzkCHgLJF4FlZd6UgyB6BDjWUCYG6kulsyVA3zuO_-7QUs" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-[17px]">Sarah Jenkins</h3>
            <p className="text-xs text-muted-fg mt-0.5">sarah@example.com</p>
            {getSummaryTags()}
          </div>
        </div>
        <span className="material-symbols-outlined text-gray-300 text-xl group-hover:text-gray-500 transition-colors">chevron_right</span>
      </button>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-5 py-5 border-b border-gray-100">
        <div className="bg-gray-50/80 rounded-xl p-4 text-center border border-gray-100">
          <p className="text-2xl font-bold text-gray-900 font-sans tracking-tight">12</p>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mt-1">Visits</p>
        </div>
        <div className="bg-gray-50/80 rounded-xl p-4 text-center border border-gray-100">
          <p className="text-2xl font-bold text-gray-900 font-sans tracking-tight">45</p>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mt-1">Saved</p>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 py-5 space-y-1 pb-28">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Settings</p>
        <ProfileBtn icon="bookmark" label="My Saved Restaurants" />
        <ProfileBtn icon="notifications" label="Notification Settings" />
        <ProfileBtn icon="shield" label="Privacy & Security" />
        <ProfileBtn icon="settings" label="App Settings" onClick={onOpenSettings} />
        <ProfileBtn icon="help" label="Support Center" />
        <div className="pt-2">
          <ProfileBtn icon="logout" label="Sign Out" danger />
        </div>
      </div>
    </div>
  );
};

const Tag: React.FC<{ text: string, alert?: boolean }> = ({ text, alert = false }) => (
  <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
    alert ? 'bg-red-50 text-red-600 border-red-100' : 'bg-primary/10 text-primary border-primary/20'
  }`}>
    {text}
  </span>
);

const ProfileBtn = ({ icon, label, danger, onClick }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-gray-50 transition-all group ${danger ? '' : ''}`}>
    <div className="flex items-center gap-3">
      <span className={`material-symbols-outlined text-[20px] ${danger ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-700'}`}>{icon}</span>
      <span className={`text-sm font-semibold ${danger ? 'text-red-500' : 'text-gray-700 group-hover:text-gray-900'}`}>{label}</span>
    </div>
    {!danger && <span className="material-symbols-outlined text-gray-300 text-xl group-hover:translate-x-0.5 transition-transform">chevron_right</span>}
  </button>
);

export default ProfileView;
