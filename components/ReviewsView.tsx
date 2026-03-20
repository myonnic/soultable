
import React from 'react';
import { Review } from '../types';

const REVIEWS_DATA: Review[] = [
  {
    id: '1',
    user: 'Sarah Jenkins',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_Dfh-VauPwgyHDyf9vazrRySA4xZdaVu7wtOEV_WxZIXcmMpG7uGezlpWaRyzC1glfdaJqERDTRaCl4LYxRJ0ee-BbO8qrtKK_KC1VLWxXsYUjv4xp2Kw1k2u4m1QoJluhhGLpMzZ_TXjHwR7zusIr_O5IAoP1qNPJXuaqUCoBCAMxTPsOtiObkIzcfApEnob0amEHOIZuuYuKj8RjEi0mEwvov3MAzkCHgLJF4FlZd6UgyB6BDjWUCYG6kulsyVA3zuO_-7QUs',
    rating: 5,
    date: '2 days ago',
    text: 'Amazing experience! The staff was incredibly knowledgeable about cross-contamination.',
    tags: ['VEGAN', 'VERIFIED'],
    helpfulCount: 12
  }
];

const ReviewsView: React.FC = () => {
  return (
    <div className="py-6">
      <div className="px-4 mb-4">
        <h2 className="text-xl font-black text-gray-900">Community Reviews</h2>
      </div>
      <main className="px-4">
        <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20 mb-6">
          <div className="flex items-end gap-1">
            <span className="text-3xl font-black text-gray-900">4.8</span>
            <span className="text-sm text-gray-300 mb-1">/5</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Based on 128 community reviews</p>
        </div>

        <div className="space-y-4">
          {REVIEWS_DATA.map(review => (
            <div key={review.id} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <img src={review.avatar} className="size-10 rounded-full object-cover" alt={review.user} />
                  <div>
                    <p className="text-sm font-black text-gray-900 leading-tight">{review.user}</p>
                    <p className="text-[10px] text-gray-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReviewsView;
