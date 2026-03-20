
import React, { useState, useEffect, useRef } from 'react';
import { RESTAURANTS } from '../App';

interface Props {
  onPlanClick: () => void;
  onRestaurantClick: (id: string) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const GANGNAM_LAT = 37.4979;
const GANGNAM_LNG = 127.0276;

type MapStatus = 'loading' | 'ready' | 'error' | 'no_key';

const HomeView: React.FC<Props> = ({ onPlanClick, onRestaurantClick }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [mapStatus, setMapStatus] = useState<MapStatus>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const overlaysRef = useRef<any[]>([]);

  const apiKey = (window as any).__KAKAO_APP_KEY__ || '';

  const filtered = filters.length === 0
    ? RESTAURANTS
    : RESTAURANTS.filter(r => r.tags.some(t => filters.includes(t)));

  const toggleFilter = (f: string) => {
    setFilters(prev => prev.includes(f) ? prev.filter(i => i !== f) : [...prev, f]);
  };

  // Kakao Maps SDK 동적 로드
  useEffect(() => {
    if (!apiKey) {
      setMapStatus('no_key');
      return;
    }

    // 이미 로드됨
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => setMapStatus('ready'));
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-sdk';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer&autoload=false`;
    script.async = true;
    script.onload = () => {
      try {
        window.kakao.maps.load(() => setMapStatus('ready'));
      } catch (e) {
        setErrorMsg('카카오 지도 초기화 실패');
        setMapStatus('error');
      }
    };
    script.onerror = () => {
      setErrorMsg('도메인이 등록되지 않았거나 API 키가 잘못됐습니다.\n카카오 개발자센터 → 앱 → 일반 → 앱 대표 도메인에\nhttp://localhost:3000 을 추가해주세요.');
      setMapStatus('error');
    };
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('kakao-map-sdk');
      if (existing) existing.remove();
    };
  }, [apiKey]);

  // 지도 초기화
  useEffect(() => {
    if (mapStatus !== 'ready' || !mapContainerRef.current) return;
    if (!window.kakao || !window.kakao.maps) return;

    try {
      const options = {
        center: new window.kakao.maps.LatLng(GANGNAM_LAT, GANGNAM_LNG),
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapContainerRef.current, options);
      mapRef.current = map;

      // 내 위치 마커 (강남역)
      const myEl = document.createElement('div');
      myEl.innerHTML = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;width:36px;height:36px;background:rgba(59,130,246,0.2);border-radius:50%;"></div>
          <div style="width:14px;height:14px;background:#3b82f6;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);position:relative;z-index:1;"></div>
        </div>`;
      new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(GANGNAM_LAT, GANGNAM_LNG),
        content: myEl,
        zIndex: 10,
      }).setMap(map);

      placeMarkers(map, RESTAURANTS);
    } catch (e: any) {
      setErrorMsg(e?.message || '지도 초기화 오류');
      setMapStatus('error');
    }
  }, [mapStatus]);

  // 필터 변경 시 마커 재렌더
  useEffect(() => {
    if (mapRef.current && mapStatus === 'ready') {
      placeMarkers(mapRef.current, filtered);
    }
  }, [filters, mapStatus]);

  const placeMarkers = (map: any, restaurants: typeof RESTAURANTS) => {
    overlaysRef.current.forEach(o => o.setMap(null));
    overlaysRef.current = [];

    restaurants.forEach(res => {
      if (!res.latlng) return;
      const position = new window.kakao.maps.LatLng(res.latlng.lat, res.latlng.lng);
      const el = document.createElement('div');
      el.style.cursor = 'pointer';
      el.style.transform = 'translateX(-50%)';
      el.innerHTML = `
        <div style="background:white;border:1.5px solid #e5e7eb;border-radius:8px;padding:4px 8px 4px 6px;display:flex;align-items:center;gap:4px;box-shadow:0 2px 8px rgba(0,0,0,0.12);white-space:nowrap;margin-bottom:4px;font-family:Inter,sans-serif;">
          <span style="font-size:9px;color:#0BBA37;font-weight:700;">★</span>
          <span style="font-size:11px;font-weight:600;color:#111827;max-width:90px;overflow:hidden;text-overflow:ellipsis;">${res.name}</span>
        </div>
        <div style="width:10px;height:10px;background:#0BBA37;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(11,186,55,0.5);margin:0 auto;"></div>`;
      el.addEventListener('click', () => onRestaurantClick(res.id));
      const overlay = new window.kakao.maps.CustomOverlay({ position, content: el, yAnchor: 1.2, zIndex: 5 });
      overlay.setMap(map);
      overlaysRef.current.push(overlay);
    });
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-gray-100 font-display">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-[110] p-4 pt-12 flex flex-col gap-2 pointer-events-none">
        <div className="flex gap-2">
          <div className="w-9 h-9 shrink-0" />
          <div className="flex-1 bg-white border border-gray-200 rounded-lg h-10 px-3 flex items-center gap-2 pointer-events-auto shadow-sm">
            <span className="material-symbols-outlined text-muted-fg text-lg">search</span>
            <input
              placeholder="강남역 주변 맛집 검색..."
              className="bg-transparent border-none focus:ring-0 text-sm flex-1 text-gray-700 placeholder:text-muted-fg focus:outline-none"
            />
          </div>
          <button className="size-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center pointer-events-auto shadow-sm">
            <span className="material-symbols-outlined text-lg text-muted-fg">notifications</span>
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pointer-events-auto pb-1 pl-11">
          {['Certified Halal', 'Vegan', 'Date spot', 'Casual'].map(f => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`h-7 px-3 text-xs font-medium rounded-md whitespace-nowrap border transition-all ${
                filters.includes(f)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 지도 컨테이너 */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* 상태 오버레이 */}
      {mapStatus === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-50">
          <div className="size-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm text-muted-fg font-medium">지도를 불러오는 중...</p>
        </div>
      )}

      {mapStatus === 'no_key' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-50 p-8">
          <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined text-3xl">map</span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">카카오 지도 API 키 필요</h3>
          <div className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs font-mono text-gray-700 mt-2">
            index.html → window.__KAKAO_APP_KEY__ = '<span className="text-primary">키 입력</span>'
          </div>
        </div>
      )}

      {mapStatus === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-50 p-8">
          <div className="size-14 rounded-xl bg-red-50 flex items-center justify-center text-red-500 mb-4">
            <span className="material-symbols-outlined text-3xl">error</span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">지도 로드 실패</h3>
          <p className="text-xs text-muted-fg text-center leading-relaxed whitespace-pre-line">{errorMsg}</p>
        </div>
      )}

      {/* Plan Meeting FAB */}
      <button
        onClick={onPlanClick}
        className="fixed bottom-28 right-5 h-11 px-5 rounded-lg bg-primary text-white shadow-md flex items-center gap-1.5 active:scale-95 transition-transform z-[110] font-medium text-sm hover:bg-primary-dark"
      >
        <span className="material-symbols-outlined text-lg">add</span>
        Plan Meeting
      </button>
    </div>
  );
};

export default HomeView;
