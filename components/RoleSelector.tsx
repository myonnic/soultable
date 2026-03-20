
import React from 'react';

interface Props {
  onSelect: (role: 'host' | 'guest_member' | 'guest_new') => void;
}

const RoleSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex justify-center bg-white min-h-screen items-center p-6">
      <div className="w-full max-w-[400px] flex flex-col gap-10">
        {/* Logo */}
        <div className="text-center">
          <div className="size-14 bg-primary rounded-xl mx-auto flex items-center justify-center mb-5 shadow-sm">
            <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>restaurant</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">SoulTable</h1>
          <p className="text-sm text-muted-fg">Choose your flow to start</p>
        </div>

        {/* Role Cards */}
        <div className="flex flex-col gap-3">
          <RoleCard
            title="Host"
            desc="Create a group and invite friends"
            icon="admin_panel_settings"
            onClick={() => onSelect('host')}
          />
          <RoleCard
            title="Guest (Member)"
            desc="Join a group as an existing user"
            icon="person"
            onClick={() => onSelect('guest_member')}
          />
          <RoleCard
            title="Guest (New)"
            desc="Sign up and join a group"
            icon="person_add"
            onClick={() => onSelect('guest_new')}
          />
        </div>

        <p className="text-center text-xs text-muted-fg">
          By continuing, you agree to our{' '}
          <span className="text-primary font-medium">Terms of Service</span>
        </p>
      </div>
    </div>
  );
};

const RoleCard = ({ title, desc, icon, onClick }: any) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left active:scale-[0.98] group"
  >
    <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors shrink-0">
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </div>
    <div className="flex-1">
      <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
      <p className="text-muted-fg text-xs mt-0.5">{desc}</p>
    </div>
    <span className="material-symbols-outlined text-gray-300 text-lg group-hover:text-primary transition-colors">chevron_right</span>
  </button>
);

export default RoleSelector;
