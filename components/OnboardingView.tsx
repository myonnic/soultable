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
                  if (window.confirm('나가시겠어요? 지금까지 변경한 내용은 반영되지 않습니다.')) {
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
              <p className="text-sm text-gray-500 mb-6">회원님의 기본 식습관을 알려주세요.</p>
              
              <div className="space-y-3">
                <OptionCard 
                  emoji="🍽️" title="I eat everything — no restrictions" subtitle="제한 없이 모두 먹음"
                  selected={dietType === 'all'} onClick={() => handleDietTypeSelect('all')}
                />
                <OptionCard 
                  emoji="🌿" title="I'm vegetarian or vegan" subtitle="채식주의자 / 비건"
                  selected={dietType === 'vegetarian_vegan'} onClick={() => handleDietTypeSelect('vegetarian_vegan')}
                />
                <OptionCard 
                  emoji="🕌" title="I follow religious dietary rules" subtitle="종교적 식이 규칙을 따름"
                  selected={dietType === 'religious'} onClick={() => handleDietTypeSelect('religious')}
                />
              </div>
            </div>
          )}

          {/* STEP 1.5A: Vegan Types */}
          {currentStep === 'step1.5A' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-xl font-bold text-gray-900 mb-1">What type of vegetarian/vegan are you?</h1>
              <p className="text-sm text-gray-500 mb-6">채식의 정확한 단계를 선택해 주세요.</p>
              
              <div className="space-y-3">
                {[
                  { id: 'flexitarian', emoji: '🥩', t: 'Flexitarian', d: '주로 채식, 가끔 육류 섭취' },
                  { id: 'pescatarian', emoji: '🐟', t: 'Pescatarian', d: '해산물은 섭취' },
                  { id: 'vegetarian', emoji: '🥚', t: 'Vegetarian', d: '유제품·달걀 섭취' },
                  { id: 'lacto', emoji: '🥛', t: 'Lacto-vegetarian', d: '유제품만 섭취' },
                  { id: 'vegan', emoji: '🌱', t: 'Vegan', d: '모든 동물성 식품 제외' },
                  { id: 'strict_vegan', emoji: '🌿', t: 'Strict Vegan', d: '젤라틴 등 숨겨진 동물성도 제외' }
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
              <p className="text-sm text-gray-500 mb-6">종교적 식이 규칙을 선택해 주세요.</p>
              
              <div className="space-y-3">
                {[
                  { id: 'halal', emoji: '☪️', t: 'Halal (Muslim)', d: '고기는 할랄 인증 필요' },
                  { id: 'kosher', emoji: '✡️', t: 'Kosher (Jewish)', d: '육류+유제품 혼합 불가' },
                  { id: 'hindu', emoji: '🕉️', t: 'Hindu', d: '소고기 금지 등' },
                  { id: 'buddhist', emoji: '☸️', t: 'Buddhist', d: '육류 빛 일부 향채소 제한' },
                  { id: 'other', emoji: '🙏', t: 'Other', d: '직접 입력' }
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
              <p className="text-sm text-gray-500 mb-4">절대 먹지 못하는 재료나 알레르기를 모두 선택해 주세요.</p>
              
              <Section 
                title="Meat & Animal Products (육류·동물성)"
                options={[
                  { id: 'pork', emoji: '🐷', t: 'Pork & pork products', d: '돼지고기 관련' },
                  { id: 'beef', emoji: '🐄', t: 'Beef', d: '소고기' },
                  { id: 'poultry', emoji: '🍗', t: 'Poultry', d: '닭고기, 오리고기' },
                  { id: 'shellfish', emoji: '🦐', t: 'Shellfish & seafood', d: '새우, 조개 등 해산물' },
                  { id: 'fish', emoji: '🐟', t: 'Fish', d: '생선' },
                  { id: 'eggs', emoji: '🥚', t: 'Eggs', d: '달걀' },
                  { id: 'dairy', emoji: '🥛', t: 'Dairy', d: '유제품' },
                  { id: 'honey', emoji: '🍯', t: 'Honey', d: '꿀' },
                ]}
                selected={cannotEat} toggle={toggleCannotEat}
              />
              
              <Section 
                title="Allergens (알레르기 유발)"
                options={[
                  { id: 'peanuts', emoji: '🥜', t: 'Peanuts', d: '땅콩' },
                  { id: 'tree_nuts', emoji: '🌰', t: 'Tree nuts', d: '아몬드, 호두 등' },
                  { id: 'gluten', emoji: '🌾', t: 'Gluten / Wheat', d: '글루텐, 밀' },
                  { id: 'soy', emoji: '🫘', t: 'Soy & soy products', d: '대두, 콩류' },
                  { id: 'sesame', emoji: '🌿', t: 'Sesame', d: '참깨' },
                ]}
                selected={cannotEat} toggle={toggleCannotEat}
              />

              <Section 
                title="⚠️ Hidden in Korean Food (한국 음식 주의)"
                options={[
                  { id: 'alcohol', emoji: '🍶', t: 'Alcohol (in cooking)', d: '요리용 알코올' },
                  { id: 'jeotgal', emoji: '🐠', t: 'Fermented seafood (jeotgal)', d: '새우젓, 멸치액젓' },
                  { id: 'garlic', emoji: '🧄', t: 'Garlic', d: '마늘' },
                  { id: 'msg', emoji: '💊', t: 'MSG / artificial flavor', d: '인공 조미료' },
                ]}
                selected={cannotEat} toggle={toggleCannotEat}
              />
              
              <div className="mt-6 mb-2">
                <OptionCard 
                  emoji="✅" title="None of the above" subtitle="해당 사항 없음"
                  selected={cannotEat.includes('none')} onClick={() => toggleCannotEat('none')}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Dislikes */}
          {currentStep === 'step3' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Anything you'd prefer to avoid?</h1>
              <p className="text-sm text-gray-500 mb-4">알레르기는 아니지만 피하고 싶은 음식이 있나요? (선택 사항)</p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { id: 'spicy', emoji: '🌶️', t: 'Very spicy food', d: '매우 매운 음식' },
                  { id: 'fermented', emoji: '🥢', t: 'Fermented foods', d: '김치 등 발효식품' },
                  { id: 'raw', emoji: '🥩', t: 'Raw meat/fish', d: '회, 육회 등 날것' },
                  { id: 'offal', emoji: '🫀', t: 'Offal & organ meats', d: '곱창, 내장류' },
                  { id: 'pungent', emoji: '💨', t: 'Strong pungent', d: '강한 향의 식재료' },
                  { id: 'mushroom', emoji: '🍄', t: 'Mushrooms', d: '버섯류' },
                  { id: 'tofu', emoji: '🧆', t: 'Tofu & soy-based', d: '두부 가공식품' },
                  { id: 'game', emoji: '🐾', t: 'Exotic meats', d: '특수 육류' },
                ].map(opt => (
                  <CompactOption 
                    key={opt.id} emoji={opt.emoji} title={opt.t} subtitle={opt.d}
                    selected={dislikes.includes(opt.id)} onClick={() => toggleDislike(opt.id)}
                  />
                ))}
              </div>
              
              <OptionCard 
                emoji="🎉" title="Nothing — I'm adventurous!" subtitle="다 괜찮습니다!"
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
