
import React from 'react';

const InfoView: React.FC = () => {
  return (
    <div className="py-6">
      <div className="px-4 mb-4">
        <h2 className="text-xl font-black text-gray-900">Location & Details</h2>
      </div>
      {/* Map Section */}
      <div className="p-4">
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC4oOdXQ-VNkx281kwaEkSH1yheHm34sDs4fdGEFcgp5EmwCxxqZtJUIZyE18s0j3sDNM3By30B6zgL5fKRoGF2d_bcZWVm8sk9nEqeuNlyjXqhh9WRHm9j714Gr7eLaoH7S7nqqz60r4HgzndCg79039TB5wO3ghoarkH1I96yQinIkNqi1D0Z_GPpGhUVd0R2LWSBisD2vv3sa7sha-klUKZWbo1PBzBVlxA-SLdWfK5fTcATrkP4Dj1zCmaJnzECQJCp7oVHcc" 
            className="w-full h-48 object-cover"
            alt="Itaewon Map"
          />
          <div className="p-4 bg-white flex flex-col gap-3">
            <div>
              <p className="text-lg font-black text-gray-900">123, Itaewon-ro, Yongsan-gu</p>
              <p className="text-sm text-gray-400">Seoul, South Korea 04350</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 rounded-xl h-11 bg-primary text-white font-bold text-sm">
                <span className="material-symbols-outlined text-lg">map</span>
                Open in KakaoMap
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-700 border border-gray-100">
                <span className="material-symbols-outlined">content_copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-black text-gray-900 mb-4">Operating Hours</h3>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-bold text-gray-800">Monday - Sunday (Open Now)</span>
          </div>
          <div className="p-4 space-y-3">
             {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
               <div key={day} className={`flex justify-between text-sm ${day === 'Thursday' ? 'text-primary font-bold' : 'text-gray-500'}`}>
                 <span>{day}{day === 'Thursday' ? ' (Today)' : ''}</span>
                 <span>{idx >= 4 ? '11:00 - 23:00' : '11:00 - 22:00'}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Facility Grid */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-black text-gray-900 mb-4">Dietary & Facilities</h3>
        <div className="grid grid-cols-2 gap-3">
          <FacilityCard icon="verified_user" title="Certified Halal" subtitle="KMF Certified" highlighted />
          <FacilityCard icon="eco" title="Vegan Friendly" subtitle="Options available" highlighted />
          <FacilityCard icon="wifi" title="Free Wi-Fi" subtitle="High speed" />
          <FacilityCard icon="local_parking" title="Parking" subtitle="Available nearby" />
        </div>
      </div>
    </div>
  );
};

const FacilityCard: React.FC<{ icon: string, title: string, subtitle: string, highlighted?: boolean }> = ({ icon, title, subtitle, highlighted }) => (
  <div className={`flex items-center gap-3 p-3 rounded-2xl border ${highlighted ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 border-gray-100'}`}>
    <div className={`size-10 flex items-center justify-center rounded-xl ${highlighted ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </div>
    <div>
      <p className="text-xs font-bold text-gray-800 leading-tight">{title}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export default InfoView;
