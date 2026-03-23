import React, { useState } from 'react';

export interface OnboardingData {
  diet_type: string | null;
  vegan_type: string | null;
  religion_type: string | null;
  cannot_eat: string[];
  dislike: string[];
}

type OnboardingProps = {
  onComplete: (data: OnboardingData) => void;
  initialData?: OnboardingData;
  isEditMode?: boolean;
  onClose?: () => void;
};

const OnboardingView: React.FC<OnboardingProps> = ({ onComplete, initialData, isEditMode, onClose }) => {
  const [currentStep, setCurrentStep] = useState<string>('step1');
  
  const [dietType, setDietType] = useState<string | null>(initialData?.diet_type || null);
  const [veganType, setVeganType] = useState<string | null>(initialData?.vegan_type || null);
  
  const initRel = initialData?.religion_type || null;
  const isOther = initRel?.startsWith('other:');
  const [religionType, setReligionType] = useState<string | null>(isOther ? 'other' : initRel);
  const [otherReligion, setOtherReligion] = useState<string>(isOther ? initRel!.replace('other:', '') : '');
  
  const [cannotEat, setCannotEat] = useState<string[]>(initialData?.cannot_eat || []);
  const [dislikes, setDislikes] = useState<string[]>(initialData?.dislike || []);

  const handleDietTypeSelect = (type: string) => {
    if (dietType !== type) {
      setVeganType(null);
      setReligionType(null);
      setOtherReligion('');
    }
    setDietType(type);
  };

  const handleBack = () => {
    if (currentStep === 'step1.5A' || currentStep === 'step1.5B') {
      setCurrentStep('step1');
    } else if (currentStep === 'step2') {
      if (dietType === 'vegetarian_vegan') setCurrentStep('step1.5A');
      else if (dietType === 'religious') setCurrentStep('step1.5B');
      else setCurrentStep('step1');
    } else if (currentStep === 'step3') {
      setCurrentStep('step2');
    }
  };

  const handleNext = () => {
    if (currentStep === 'step1') {
      if (dietType === 'all') setCurrentStep('step2');
      else if (dietType === 'vegetarian_vegan') setCurrentStep('step1.5A');
      else if (dietType === 'religious') setCurrentStep('step1.5B');
    } else if (currentStep === 'step1.5A') {
      setCurrentStep('step2');
    } else if (currentStep === 'step1.5B') {
      setCurrentStep('step2');
    } else if (currentStep === 'step2') {
      setCurrentStep('step3');
    } else if (currentStep === 'step3') {
      onComplete({
        diet_type: dietType,
        vegan_type: veganType,
        religion_type: religionType === 'other' ? `other:${otherReligion}` : religionType,
        cannot_eat: cannotEat.includes('none') ? [] : cannotEat,
        dislike: dislikes.includes('none') ? [] : dislikes
      });
    }
  };

  const getProgress = () => {
    if (currentStep === 'step1') return 25;
    if (currentStep.startsWith('step1.5')) return 50;
    if (currentStep === 'step2') return 75;
    return 100;
  };

  const toggleCannotEat = (id: string) => {
    if (id === 'none') {
      setCannotEat(cannotEat.includes('none') ? [] : ['none']);
      return;
    }
    setCannotEat(prev => {
      const filtered = prev.filter(v => v !== 'none');
      if (filtered.includes(id)) return filtered.filter(v => v !== id);
      return [...filtered, id];
    });
  };

  const toggleDislike = (id: string) => {
    if (id === 'none') {
      setDislikes(dislikes.includes('none') ? [] : ['none']);
      return;
    }
    setDislikes(prev => {
      const filtered = prev.filter(v => v !== 'none');
      if (filtered.includes(id)) return filtered.filter(v => v !== id);
      return [...filtered, id];
    });
  };

  const canProceed = () => {
    if (currentStep === 'step1') return !!dietType;
    if (currentStep === 'step1.5A') return !!veganType;
    if (currentStep === 'step1.5B') return !!religionType && (religionType !== 'other' || otherReligion.trim().length > 0);
    if (currentStep === 'step2') return cannotEat.length > 0;
    return true; // Step 3 is optional (can skip)
  };

  return (
    <div className="flex justify-center bg-gray-100 h-screen font-display overflow-hidden">
      <div className="relative w-full max-w-[430px] bg-white shadow-sm border-x border-gray-200 h-full flex flex-col">
        
        {/* Header & Progress Bar */}
        <div className="shrink-0 pt-12 pb-4 px-5">
          <div className="flex items-center gap-3 mb-4">
            {currentStep !== 'step1' ? (
              <button onClick={handleBack} className="p-1 -ml-1 text-gray-500 hover:text-gray-900 transition-colors">
                <span className="material-symbols-outlined text-2xl">arrow_back</span>
              </button>
            ) : (
              <div className="size-8"></div>
            )}
            <div className="flex-1">
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>
            </div>
            {isEditMode ? (
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to exit? Your changes will not be saved.')) {
                    onClose?.();
                  }
                }} 
                className="p-1 -mr-1 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            ) : (
              <div className="size-8"></div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-40">
          
          {/* STEP 1 */}
          {currentStep === 'step1' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Which best describes your diet?</h1>
              <p className="text-sm text-gray-500 mb-6">Please tell us about your basic dietary habits.</p>
              
              <div className="space-y-3">
                <OptionCard 
                  emoji="🍽️" title="I eat everything — no restrictions" subtitle="Eat everything without restrictions"
                  selected={dietType === 'all'} onClick={() => handleDietTypeSelect('all')}
                />
                <OptionCard 
                  emoji="🌿" title="I'm vegetarian or vegan" subtitle="Vegetarian / Vegan"
                  selected={dietType === 'vegetarian_vegan'} onClick={() => handleDietTypeSelect('vegetarian_vegan')}
                />
                <OptionCard 
                  emoji="🕌" title="I follow religious dietary rules" subtitle="Follow religious dietary rules"
                  selected={dietType === 'religious'} onClick={() => handleDietTypeSelect('religious')}
                />
              </div>
            </div>
          )}

          {/* STEP 1.5A: Vegan Types */}
          {currentStep === 'step1.5A' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-xl font-bold text-gray-900 mb-1">What type of vegetarian/vegan are you?</h1>
              <p className="text-sm text-gray-500 mb-6">Please select your exact level of vegetarianism.</p>
              
              <div className="space-y-3">
                {[
                  { id: 'flexitarian', emoji: '🥩', t: 'Flexitarian', d: 'Mostly vegetarian, occasional meat' },
                  { id: 'pescatarian', emoji: '🐟', t: 'Pescatarian', d: 'Eats seafood' },
                  { id: 'vegetarian', emoji: '🥚', t: 'Vegetarian', d: 'Eats dairy and eggs' },
                  { id: 'lacto', emoji: '🥛', t: 'Lacto-vegetarian', d: 'Eats dairy only' },
                  { id: 'vegan', emoji: '🌱', t: 'Vegan', d: 'Excludes all animal products' },
                  { id: 'strict_vegan', emoji: '🌿', t: 'Strict Vegan', d: 'Excludes hidden animal products like gelatin' }
                ].map(opt => (
                  <OptionCard 
                    key={opt.id} emoji={opt.emoji} title={opt.t} subtitle={opt.d}
                    selected={veganType === opt.id} onClick={() => setVeganType(opt.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 1.5B: Religion Types */}
          {currentStep === 'step1.5B' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Which religious guidelines do you follow?</h1>
              <p className="text-sm text-gray-500 mb-6">Please select your religious dietary rules.</p>
              
              <div className="space-y-3">
                {[
                  { id: 'halal', emoji: '☪️', t: 'Halal (Muslim)', d: 'Meat must be halal certified' },
                  { id: 'kosher', emoji: '✡️', t: 'Kosher (Jewish)', d: 'Cannot mix meat and dairy' },
                  { id: 'hindu', emoji: '🕉️', t: 'Hindu', d: 'No beef, etc.' },
                  { id: 'buddhist', emoji: '☸️', t: 'Buddhist', d: 'Restricts meat and pungent vegetables' },
                  { id: 'other', emoji: '🙏', t: 'Other', d: 'Enter manually' }
                ].map(opt => (
                  <OptionCard 
                    key={opt.id} emoji={opt.emoji} title={opt.t} subtitle={opt.d}
                    selected={religionType === opt.id} onClick={() => setReligionType(opt.id)}
                  />
                ))}
                
                {religionType === 'other' && (
                  <input 
                    type="text" value={otherReligion} onChange={e => setOtherReligion(e.target.value)}
                    placeholder="Type details here..."
                    className="w-full border border-gray-200 rounded-xl p-4 text-sm mt-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Cannot Eat */}
          {currentStep === 'step2' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Any ingredients you absolutely cannot eat?</h1>
              <p className="text-sm text-gray-500 mb-4">Please select all ingredients you absolutely cannot eat or are allergic to.</p>
              
              <Section 
                title="Meat & Animal Products"
                options={[
                  { id: 'pork', emoji: '🐷', t: 'Pork & pork products', d: 'Pork related' },
                  { id: 'beef', emoji: '🐄', t: 'Beef', d: 'Beef' },
                  { id: 'poultry', emoji: '🍗', t: 'Poultry', d: 'Chicken, duck' },
                  { id: 'shellfish', emoji: '🦐', t: 'Shellfish & seafood', d: 'Shrimp, clams, etc.' },
                  { id: 'fish', emoji: '🐟', t: 'Fish', d: 'Fish' },
                  { id: 'eggs', emoji: '🥚', t: 'Eggs', d: 'Eggs' },
                  { id: 'dairy', emoji: '🥛', t: 'Dairy', d: 'Dairy products' },
                  { id: 'honey', emoji: '🍯', t: 'Honey', d: 'Honey' },
                ]}
                selected={cannotEat} toggle={toggleCannotEat}
              />
              
              <Section 
                title="Allergens"
                options={[
                  { id: 'peanuts', emoji: '🥜', t: 'Peanuts', d: 'Peanuts' },
                  { id: 'tree_nuts', emoji: '🌰', t: 'Tree nuts', d: 'Almonds, walnuts, etc.' },
                  { id: 'gluten', emoji: '🌾', t: 'Gluten / Wheat', d: 'Gluten, wheat' },
                  { id: 'soy', emoji: '🫘', t: 'Soy & soy products', d: 'Soybeans, legumes' },
                  { id: 'sesame', emoji: '🌿', t: 'Sesame', d: 'Sesame' },
                ]}
                selected={cannotEat} toggle={toggleCannotEat}
              />

              <Section 
                title="⚠️ Hidden in Korean Food"
                options={[
                  { id: 'alcohol', emoji: '🍶', t: 'Alcohol (in cooking)', d: 'Cooking alcohol' },
                  { id: 'jeotgal', emoji: '🐠', t: 'Fermented seafood (jeotgal)', d: 'Shrimp paste, fish sauce' },
                  { id: 'garlic', emoji: '🧄', t: 'Garlic', d: 'Garlic' },
                  { id: 'msg', emoji: '💊', t: 'MSG / artificial flavor', d: 'Artificial seasoning' },
                ]}
                selected={cannotEat} toggle={toggleCannotEat}
              />
              
              <div className="mt-6 mb-2">
                <OptionCard 
                  emoji="✅" title="None of the above" subtitle="None of the above"
                  selected={cannotEat.includes('none')} onClick={() => toggleCannotEat('none')}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Dislikes */}
          {currentStep === 'step3' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Anything you'd prefer to avoid?</h1>
              <p className="text-sm text-gray-500 mb-4">Are there any foods you'd prefer to avoid? (Optional)</p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { id: 'spicy', emoji: '🌶️', t: 'Very spicy food', d: 'Very spicy food' },
                  { id: 'fermented', emoji: '🥢', t: 'Fermented foods', d: 'Kimchi, fermented foods' },
                  { id: 'raw', emoji: '🥩', t: 'Raw meat/fish', d: 'Raw fish, raw meat' },
                  { id: 'offal', emoji: '🫀', t: 'Offal & organ meats', d: 'Tripe, offal' },
                  { id: 'pungent', emoji: '💨', t: 'Strong pungent', d: 'Strong smelling ingredients' },
                  { id: 'mushroom', emoji: '🍄', t: 'Mushrooms', d: 'Mushrooms' },
                  { id: 'tofu', emoji: '🧆', t: 'Tofu & soy-based', d: 'Processed tofu products' },
                  { id: 'game', emoji: '🐾', t: 'Exotic meats', d: 'Exotic meats' },
                ].map(opt => (
                  <CompactOption 
                    key={opt.id} emoji={opt.emoji} title={opt.t} subtitle={opt.d}
                    selected={dislikes.includes(opt.id)} onClick={() => toggleDislike(opt.id)}
                  />
                ))}
              </div>
              
              <OptionCard 
                emoji="🎉" title="Nothing — I'm adventurous!" subtitle="Everything is fine!"
                selected={dislikes.includes('none')} onClick={() => toggleDislike('none')}
              />
            </div>
          )}

        </div>

        {/* Bottom Action Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pt-4 shrink-0 z-10 w-full shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-full h-12 rounded-xl font-bold text-white transition-all ${
                canProceed() ? 'bg-primary hover:bg-primary/90 shadow-md shadow-primary/20' : 'bg-gray-300'
              }`}
            >
              {currentStep === 'step3' 
                ? (dislikes.length > 0 && !dislikes.includes('none') ? `Finish & Save (${dislikes.length})` : 'Finish & Save') 
                : currentStep === 'step2'
                  ? (cannotEat.length > 0 && !cannotEat.includes('none') ? `Next (${cannotEat.length})` : 'Next')
                  : 'Next'
              }
            </button>
            {currentStep === 'step3' && (
              <button 
                onClick={handleNext}
                className="w-full mt-3 h-11 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Skip for now
              </button>
            )}
          </div>
      </div>
    </div>
  );
};

const Section = ({ title, options, selected, toggle }: any) => (
  <div className="mt-5">
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
    <div className="grid grid-cols-1 gap-2">
      {options.map((opt: any) => (
        <OptionCard 
          key={opt.id} emoji={opt.emoji} title={opt.t} subtitle={opt.d}
          selected={selected.includes(opt.id)} onClick={() => toggle(opt.id)}
          compact
        />
      ))}
    </div>
  </div>
);

const OptionCard = ({ emoji, title, subtitle, selected, onClick, compact = false }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 text-left transition-all border rounded-xl ${compact ? 'p-3' : 'p-4'} ${
      selected ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
  >
    <div className={`shrink-0 flex items-center justify-center rounded-lg ${compact ? 'size-8 text-xl' : 'size-10 text-2xl'} ${selected ? 'bg-primary/10' : 'bg-gray-100'}`}>
      {emoji}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className={`font-semibold text-gray-900 truncate ${compact ? 'text-sm' : 'text-base'}`}>{title}</h4>
      <p className={`text-gray-500 truncate ${compact ? 'text-xs' : 'text-sm'}`}>{subtitle}</p>
    </div>
    <div className={`shrink-0 size-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'border-primary bg-primary' : 'border-gray-300'}`}>
      {selected && <span className="material-symbols-outlined text-white text-[14px]" style={{fontVariationSettings:"'FILL' 1"}}>check</span>}
    </div>
  </button>
);

const CompactOption = ({ emoji, title, subtitle, selected, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex flex-col items-center justify-center text-center p-3 transition-all border rounded-xl ${
      selected ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
  >
    <div className="text-2xl mb-1">{emoji}</div>
    <h4 className="font-semibold text-gray-900 text-xs truncate w-full">{title}</h4>
    <p className="text-[10px] text-gray-500 truncate w-full mt-0.5">{subtitle}</p>
  </button>
);

export default OnboardingView;
