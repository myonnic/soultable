
import React from 'react';

const ProfileView: React.FC = () => {
  return (
    <div className="bg-white min-h-full">
      {/* Header */}
      <div className="px-5 pt-14 pb-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">My Profile</h2>
      </div>

      {/* Profile card */}
      <div className="px-5 py-6 flex items-center gap-4 border-b border-gray-100">
        <div className="size-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV_Dfh-VauPwgyHDyf9vazrRySA4xZdaVu7wtOEV_WxZIXcmMpG7uGezlpWaRyzC1glfdaJqERDTRaCl4LYxRJ0ee-BbO8qrtKK_KC1VLWxXsYUjv4xp2Kw1k2u4m1QoJluhhGLpMzZ_TXjHwR7zusIr_O5IAoP1qNPJXuaqUCoBCAMxTPsOtiObkIzcfApEnob0amEHOIZuuYuKj8RjEi0mEwvov3MAzkCHgLJF4FlZd6UgyB6BDjWUCYG6kulsyVA3zuO_-7QUs" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">Sarah Jenkins</h3>
          <p className="text-xs text-muted-fg mt-0.5">sarah@example.com</p>
          <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-md mt-2">
            Vegan · Gluten-Free
          </span>
        </div>
        <button className="size-9 rounded-lg border border-gray-200 flex items-center justify-center text-muted-fg hover:bg-muted transition-colors shrink-0">
          <span className="material-symbols-outlined text-lg">edit</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-5 py-5 border-b border-gray-100">
        <div className="bg-muted rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-xs text-muted-fg font-medium mt-0.5">Visits</p>
        </div>
        <div className="bg-muted rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">45</p>
          <p className="text-xs text-muted-fg font-medium mt-0.5">Saved</p>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 py-5 space-y-1 pb-28">
        <p className="text-xs font-medium text-muted-fg uppercase tracking-wider mb-3">Settings</p>
        <ProfileBtn icon="bookmark" label="My Saved Restaurants" />
        <ProfileBtn icon="notifications" label="Notification Settings" />
        <ProfileBtn icon="shield" label="Privacy & Security" />
        <ProfileBtn icon="settings" label="App Settings" />
        <ProfileBtn icon="help" label="Support Center" />
        <div className="pt-2">
          <ProfileBtn icon="logout" label="Sign Out" danger />
        </div>
      </div>
    </div>
  );
};

const ProfileBtn = ({ icon, label, danger }: any) => (
  <button className={`w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-muted transition-all group ${danger ? '' : ''}`}>
    <div className="flex items-center gap-3">
      <span className={`material-symbols-outlined text-lg ${danger ? 'text-red-400' : 'text-muted-fg group-hover:text-gray-700'}`}>{icon}</span>
      <span className={`text-sm font-medium ${danger ? 'text-red-500' : 'text-gray-700'}`}>{label}</span>
    </div>
    {!danger && <span className="material-symbols-outlined text-gray-300 text-lg">chevron_right</span>}
  </button>
);

export default ProfileView;
