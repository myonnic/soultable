
import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  restaurantName: string;
}

const ReviewWriteView: React.FC<Props> = ({ onClose, restaurantName }) => {
  const [rating, setRating] = useState<'great' | 'good' | 'okay' | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');

  const keywords = [
    'Delicious food',
    'Friendly staff',
    'Clean facility',
    'Cool interior',
    'Great value',
    'Perfect for special days',
    'Fresh ingredients'
  ];

  const toggleKeyword = (kw: string) => {
    setSelectedKeywords(prev => 
      prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]
    );
  };

  return (
    <div className="fixed inset-0 z-[500] bg-white flex flex-col overflow-hidden font-display">
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
        <button onClick={onClose} className="size-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
        <h2 className="text-base font-semibold text-gray-900">Write Review</h2>
        <button
          disabled={!rating}
          onClick={onClose}
          className={`text-sm font-semibold px-3 py-1.5 rounded-lg ${rating ? 'text-primary hover:bg-primary/10' : 'text-gray-300'}`}
        >
          Submit
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-7 hide-scrollbar">
        <div className="text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-0.5">{restaurantName}</h3>
          <p className="text-xs text-muted-fg">How was your visit?</p>
        </div>

        <section>
          <div className="flex justify-center gap-8">
            <RatingBtn 
              type="okay" 
              active={rating === 'okay'} 
              icon="sentiment_dissatisfied" 
              label="Could be better" 
              onClick={() => setRating('okay')} 
            />
            <RatingBtn 
              type="good" 
              active={rating === 'good'} 
              icon="sentiment_satisfied" 
              label="Good" 
              onClick={() => setRating('good')} 
            />
            <RatingBtn 
              type="great" 
              active={rating === 'great'} 
              icon="sentiment_very_satisfied" 
              label="Excellent" 
              onClick={() => setRating('great')} 
            />
          </div>
        </section>

        <section>
          <h4 className="text-sm font-black text-gray-900 mb-4">What did you like? (Multi-select)</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map(kw => (
              <button
                key={kw}
                onClick={() => toggleKeyword(kw)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${
                  selectedKeywords.includes(kw)
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="w-full h-28 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-muted-fg hover:bg-muted transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-2xl">add_a_photo</span>
            <p className="text-xs font-medium">Add Photos</p>
          </div>
        </section>

        <section>
          <textarea
            rows={4}
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Please leave an honest review for other visitors."
            className="w-full bg-muted rounded-lg p-4 border border-gray-200 text-sm font-medium placeholder:text-muted-fg focus:border-primary focus:outline-none resize-none"
          ></textarea>
        </section>
      </div>

      <div className="p-5 pb-8 border-t border-gray-100 bg-white">
        <button
          disabled={!rating}
          onClick={onClose}
          className={`w-full h-11 rounded-lg font-semibold text-sm transition-all ${
            rating ? 'bg-primary text-white hover:bg-primary-dark active:scale-95' : 'bg-muted text-muted-fg'
          }`}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

const RatingBtn = ({ active, icon, label, onClick, type }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 transition-all ${active ? 'scale-110' : 'opacity-50'}`}
  >
    <div className={`size-14 rounded-xl flex items-center justify-center ${active ? 'bg-primary text-white' : 'bg-muted text-muted-fg'}`}>
      <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: active ? "'FILL' 1" : ""}}>{icon}</span>
    </div>
    <span className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-muted-fg'}`}>{label}</span>
  </button>
);

export default ReviewWriteView;
