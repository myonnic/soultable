
import React from 'react';
import { MenuItem } from '../types';

const MENU_DATA: MenuItem[] = [
  {
    id: '1',
    name: 'Bibimbap',
    nameKr: '비빔밥',
    price: 12000,
    description: 'Mixed rice with seasonal greens and gochujang.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe3DX-qL2tBO_JOQ-gMHWntsQk96H4oNrbC8vWGECcHonUE9_TdpFvSyYOWm6zWqbpc44qnMgLepF7XiH0GGHWXGVAYtUTnG-x6TnZWIuHKBiLsV5su_o6dNPXYiepAIJutJNNT90iQ3wYSl1ufcOgVh-ta-KjJL_SbFiTjPeRlcx0yW6rEbvOf4fds98fzZDAZe1WYCm-dssTFxUQIp1-Zm-JwN92DmD_mTEBNZWFe3Jqj5iESGfMxp5tc5nV5WTvjvEm3mDkP8w',
    tags: ['Vegan', 'Halal']
  },
  {
    id: '2',
    name: 'Japchae',
    nameKr: '잡채',
    price: 15000,
    description: 'Sweet and savory stir-fried glass noodles.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB35g0Y9FGmMy5xHPVX3HTo5GrAcgBWaE2on9MPGB-BpSh68AIqrZTeiBtHvmP2z0Nz2klzkUJuFHS5bSv6S2AURrGpW5DMYZ_LxglWu26b-m56eLD1CQCT2Wy-YfbUQv8BHx_3KlPfEs1yZYAOs0T8-d8j6GZavpwbUGPOZ_dsi_X0DOn_yrcGCwVDS4qJO_FEVGOGavD7hkOCcSsC43DDkpQN4suM2jpw20VcUq6xAWhPeRRnoyLRDNJLw6qnX80Vz7eGvUso0nE',
    tags: ['Vegan Friendly', 'Gluten-Free']
  }
];

const MenuView: React.FC = () => {
  return (
    <div className="py-6">
      <div className="px-4 mb-4">
        <h2 className="text-xl font-black text-gray-900">Featured Menu</h2>
      </div>
      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="flex w-full items-center bg-gray-100 rounded-2xl h-12 shadow-inner px-4">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search menu items"
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder:text-gray-400 text-sm font-medium ml-2"
          />
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4">
        <div className="space-y-4">
          {MENU_DATA.map(item => (
            <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-50 rounded-2xl shadow-sm hover:border-primary/20 transition-colors">
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="size-24 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="text-base font-black text-gray-900 leading-tight">{item.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-1">{item.description}</p>
                </div>
                <div className="flex justify-between items-end">
                   <p className="text-primary font-black text-sm">₩{item.price.toLocaleString()}</p>
                   <button className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-lg">
                      ADD
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuView;
