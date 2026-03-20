
import React, { useState } from 'react';

const OnboardingView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="w-full max-w-[430px] flex flex-col p-6 pt-14">
        {/* Progress bar */}
        <div className="flex items-center gap-1.5 mb-10">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-primary' : 'bg-gray-100'}`}
            />
          ))}
        </div>

        <div className="flex-1">
          {step === 1 ? (
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2 leading-snug">Welcome to the Crew!</h1>
              <p className="text-sm text-muted-fg mb-8">
                To join "Itaewon Crew", we need to know your dietary restrictions first.
              </p>
              <div className="space-y-2.5">
                <OnboardingOption label="Halal Only" icon="verified" />
                <OnboardingOption label="Strict Vegan" icon="eco" />
                <OnboardingOption label="Vegetarian" icon="energy_savings_leaf" />
                <OnboardingOption label="No Pork / No Lard" icon="do_not_disturb_on" />
                <OnboardingOption label="No Preferences" icon="done_all" />
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center justify-center h-full pt-16">
              <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Go!</h2>
              <p className="text-sm text-muted-fg">Your preferences have been saved and applied to the group.</p>
            </div>
          )}
        </div>

        <button
          onClick={() => step === 1 ? setStep(2) : onComplete()}
          className="h-11 bg-primary text-white w-full rounded-lg font-semibold text-sm mt-8 active:scale-95 transition-transform hover:bg-primary-dark"
        >
          {step === 1 ? 'Next Step' : 'Join Group Chat'}
        </button>
      </div>
    </div>
  );
};

const OnboardingOption = ({ label, icon }: any) => {
  const [selected, setSelected] = useState(false);
  return (
    <button
      onClick={() => setSelected(!selected)}
      className={`w-full flex items-center gap-3 p-3.5 rounded-lg border transition-all text-left ${
        selected ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${selected ? 'bg-primary/10' : 'bg-muted'}`}>
        <span className={`material-symbols-outlined text-lg ${selected ? 'text-primary' : 'text-muted-fg'}`}>{icon}</span>
      </div>
      <span className={`font-medium text-sm ${selected ? 'text-gray-900' : 'text-gray-600'}`}>{label}</span>
      {selected && (
        <span className="material-symbols-outlined text-primary ml-auto text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
      )}
    </button>
  );
};

export default OnboardingView;
