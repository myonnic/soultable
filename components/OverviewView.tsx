
import React from 'react';

const OverviewView: React.FC = () => {
  return (
    <div>
      {/* Top Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 border border-white/30">
          <p className="text-white text-xs font-bold leading-normal tracking-[0.015em]">KR | EN</p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[320px]">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoPFF6howvJG3-XYyUCFyXVgh4Xa61uJAV1s1cNTUCwcwuKqpuAx-CUr0l2gIfH6qKVdh87bTcCR_F0vmTVhmzO9x7K134zTJiUaXPr8AQhGxAg7vhqa6NrkOAfs6jehRcS7dJJ58cVj2P13CS6rWW7yEwGztB7J73Zxw2SSs0H2ZAviZ5wMN3LU1yssU5fZQg06WdV7cGAuB-LWP_OvV6wCd8w26IicdjgehccpwOEOXkNhGzSiEg4prDJ1uLL7QyRk232Ety8pA" 
          alt="Restaurant Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Card */}
      <div className="relative -mt-6 rounded-t-3xl bg-white px-4 pt-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900">SoulTable</h1>
              <p className="text-sm text-gray-500 mt-1">123 Itaewon-ro, Yongsan-gu, Seoul</p>
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold text-sm">4.8</span>
            </div>
          </div>

          <div className="flex gap-2 py-2 flex-wrap">
            <div className="flex h-7 items-center gap-1 rounded-lg bg-primary/10 px-3 border border-primary/20">
              <span className="material-symbols-outlined text-[14px] text-green-700">verified</span>
              <p className="text-green-700 text-[12px] font-bold">Halal Certified</p>
            </div>
            <div className="flex h-7 items-center gap-1 rounded-lg bg-green-50 px-3 border border-green-200">
              <span className="material-symbols-outlined text-[14px] text-green-700">eco</span>
              <p className="text-green-700 text-[12px] font-bold">Vegan Friendly</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">120+ Reviews • Casual Dining • $$</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 py-5 border-b border-gray-50">
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-xl text-gray-700">star_rate</span>
            <span className="text-[11px] font-bold text-gray-600">Rate Now</span>
          </button>
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-xl text-gray-700">bookmark</span>
            <span className="text-[11px] font-bold text-gray-600">Save</span>
          </button>
          <button className="flex-[1.5] flex items-center justify-center gap-2 rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-xl">groups</span>
            <span className="text-sm font-bold">Invite to Go</span>
          </button>
        </div>

        {/* Quick Details */}
        <div className="py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Summary</h3>
              <button className="flex items-center gap-1 text-primary text-sm font-bold">
                <span className="material-symbols-outlined text-lg">share</span>
                Share
              </button>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              Authentic Korean flavors meets international standards. SoulTable is renowned for its strictly supervised Halal kitchen and diverse plant-based traditional dishes. Located in the heart of Itaewon.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 p-2 rounded-xl">
                <span className="material-symbols-outlined text-primary">schedule</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-800">Business Hours</span>
                  <span className="text-[9px] bg-primary text-white px-1.5 py-0.5 rounded-full uppercase font-black">Open Now</span>
                </div>
                <p className="text-sm text-gray-500">11:00 AM - 10:00 PM (Last Order 9:15 PM)</p>
              </div>
            </div>
            
            <div className="h-px bg-gray-200 w-full"></div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 p-2 rounded-xl">
                <span className="material-symbols-outlined text-primary">call</span>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-800">Contact</span>
                <p className="text-sm text-primary font-bold">+82 2-1234-5678</p>
              </div>
            </div>

            <div className="h-px bg-gray-200 w-full"></div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-xl">
                  <span className="material-symbols-outlined text-primary">map</span>
                </div>
                <span className="text-sm font-bold text-gray-800">Location</span>
              </div>
              <div className="rounded-2xl overflow-hidden h-36 w-full border border-gray-200 mt-1">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsGVSSShoQF8585KJ0qm8ghcHiF_cwAbVrWnoPEHi-M3rD8231eu0OLNApmNEer7BWK5uzUvW_O4tjzTFVyWtAIU4bsgcPYeW1gcY8Yn_FpFTVWF5y7h8jRqkt3oh_9ENpbD0s5L35Wtu6YK_7JXCtIDBgrZADqGMXh87wyIycBoAKSWA4usHvCFu60UuByKz9qJsB4mFGM14vO0XebK3O27JhP4Si-waS9-2rSe66F8xdbVUG3ONFlnTGf1CGpIVjz9vR6vGaOfA" 
                  className="w-full h-full object-cover" 
                  alt="Map Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
