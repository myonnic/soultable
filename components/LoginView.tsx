
import React from 'react';

interface Props {
  onLogin: () => void;
}

const LoginView: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8">
      {/* Logo */}
      <div className="size-12 bg-primary rounded-xl flex items-center justify-center mb-5 shadow-sm">
        <span className="material-symbols-outlined text-white text-2xl" style={{fontVariationSettings:"'FILL' 1"}}>restaurant</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">SoulTable</h1>
      <p className="text-sm text-muted-fg mb-10 text-center">
        Join the community and find your<br/>perfect dining spot in Seoul.
      </p>

      {/* Divider */}
      <div className="w-full max-w-sm space-y-3">
        {/* Kakao Button */}
        <button
          onClick={onLogin}
          className="w-full h-11 bg-[#FEE500] rounded-lg flex items-center justify-center gap-2.5 text-gray-900 font-semibold text-sm active:scale-95 transition-transform border border-[#FEE500]"
        >
          <div className="size-5 bg-black rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[10px] text-[#FEE500]">chat_bubble</span>
          </div>
          Continue with Kakao
        </button>

        {/* Or divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-muted-fg font-medium">or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Email */}
        <button className="w-full h-11 border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-gray-700 font-semibold text-sm active:scale-95 transition-transform hover:bg-muted">
          <span className="material-symbols-outlined text-lg text-muted-fg">mail</span>
          Continue with Email
        </button>
      </div>

      <p className="text-[11px] text-muted-fg mt-8 text-center leading-relaxed">
        By continuing, you agree to our{' '}
        <span className="text-primary font-medium">Terms of Service</span>
        {' '}and{' '}
        <span className="text-primary font-medium">Privacy Policy</span>
      </p>
    </div>
  );
};

export default LoginView;
