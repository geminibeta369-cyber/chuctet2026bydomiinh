
import React, { useState, useEffect } from 'react';
import FireworkCanvas from './components/FireworkCanvas';
import WishModal from './components/WishModal';
import { FALLBACK_WISHES } from './constants';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWish, setCurrentWish] = useState('');
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [audio] = useState(new Audio('https://cdn.pixabay.com/audio/2023/01/17/audio_d026388414.mp3'));

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isMusicOn) {
      audio.pause();
    } else {
      audio.play().catch(() => console.log("User interaction needed for audio"));
    }
    setIsMusicOn(!isMusicOn);
  };

  const openLuckyMoney = () => {
    const randomIdx = Math.floor(Math.random() * FALLBACK_WISHES.length);
    setCurrentWish(FALLBACK_WISHES[randomIdx].text);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <FireworkCanvas />

      {/* Decorative Lanterns */}
      <div className="fixed top-0 left-4 md:left-12 z-20 lantern-swing pointer-events-none opacity-80">
        <div className="w-0.5 h-16 md:h-24 bg-yellow-600/50 mx-auto" />
        <div className="w-16 h-20 md:w-24 md:h-32 bg-red-600 border-2 md:border-4 border-yellow-500 rounded-lg flex items-center justify-center shadow-2xl">
          <span className="text-xl md:text-3xl text-yellow-300 font-bold title-font">PHÚC</span>
        </div>
      </div>
      <div className="fixed top-0 right-4 md:right-12 z-20 lantern-swing pointer-events-none opacity-80" style={{ animationDelay: '1.2s' }}>
        <div className="w-0.5 h-10 md:h-16 bg-yellow-600/50 mx-auto" />
        <div className="w-16 h-20 md:w-24 md:h-32 bg-red-600 border-2 md:border-4 border-yellow-500 rounded-lg flex items-center justify-center shadow-2xl">
          <span className="text-xl md:text-3xl text-yellow-300 font-bold title-font">LỘC</span>
        </div>
      </div>

      {/* Centered Main Content */}
      <main className="z-10 flex flex-col items-center justify-center w-full max-w-2xl gap-8">
        {/* Header Text */}
        <div className="text-center space-y-2 mb-2">
          <div className="inline-block bg-red-600/80 backdrop-blur-md text-yellow-300 px-5 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.25em] border border-yellow-500/50 shadow-lg uppercase">
            XUÂN BÍNH NGỌ 2026
          </div>
          <h1 className="title-font text-5xl md:text-7xl text-yellow-400 drop-shadow-[0_5px_15px_rgba(255,215,0,0.6)] leading-tight">
            Chúc Mừng Năm Mới
          </h1>
          <h2 className="sub-title-font text-2xl md:text-4xl text-pink-300 drop-shadow-md">
            Mã Đáo Thành Công
          </h2>
        </div>

        {/* Lixi Button - Focused in center */}
        <div 
          onClick={openLuckyMoney}
          className="group relative cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 z-30"
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full scale-150 animate-pulse group-hover:bg-yellow-500/40" />
          
          <div className="w-56 h-40 md:w-64 md:h-48 bg-red-600 rounded-2xl shadow-[0_20px_50px_rgba(220,38,38,0.5)] border-4 border-yellow-500 flex items-center justify-center relative overflow-hidden animate-bounce">
            {/* Envelope flap */}
            <div className="absolute top-0 w-full h-[45%] bg-red-700 rounded-b-[40%] border-b-2 border-yellow-400/50 shadow-md transform -translate-y-2" />
            
            {/* Center seal */}
            <div className="z-10 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 text-red-700 w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center font-bold shadow-[inset_0_2px_10px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.3)] border-4 border-red-600 transform group-hover:rotate-12 transition-transform">
              <span className="text-[12px] md:text-sm tracking-widest leading-none mb-1 opacity-80 uppercase">Xuân</span>
              <span className="text-2xl md:text-3xl title-font">LÌ XÌ</span>
              <div className="w-8 h-0.5 bg-red-600/30 mt-1 rounded-full" />
            </div>
            
            {/* Decorative corners */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-500/20 rotate-45" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-500/20 -rotate-45" />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-yellow-200/90 font-bold tracking-[0.15em] text-sm uppercase drop-shadow-md animate-pulse">
              Nhấn nhận lộc đầu năm
            </p>
            <div className="flex justify-center gap-1 mt-2">
              <span className="inline-block w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" />
              <span className="inline-block w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping [animation-delay:0.2s]" />
              <span className="inline-block w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <button 
          onClick={toggleMusic}
          aria-label="Toggle Music"
          className="w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 group"
        >
          <span className="text-2xl group-hover:animate-bounce">{isMusicOn ? '🔊' : '🔇'}</span>
        </button>
      </div>

      {/* Bottom info */}
      <footer className="fixed bottom-6 z-10 text-gray-400/40 text-[10px] font-medium tracking-[0.3em] uppercase">
        Bính Ngọ • 2026 • AI Powered
      </footer>

      <WishModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialWish={currentWish} 
      />
    </div>
  );
};

export default App;
