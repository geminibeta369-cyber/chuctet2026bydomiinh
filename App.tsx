
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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-yellow-500/30">
      <FireworkCanvas />

      {/* Trang trí lồng đèn hai bên - Tối ưu cho khung hình */}
      <div className="fixed top-0 left-2 md:left-10 z-20 lantern-swing pointer-events-none hidden sm:block">
        <div className="w-0.5 h-20 md:h-32 bg-yellow-600/40 mx-auto" />
        <div className="w-16 h-24 md:w-20 md:h-30 bg-red-600 border-x-4 border-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.4)] relative">
          <div className="absolute inset-0 border-y-8 border-yellow-600/30 rounded-full" />
          <span className="text-xl md:text-2xl text-yellow-300 font-bold title-font relative z-10">PHÚC</span>
        </div>
      </div>
      
      <div className="fixed top-0 right-2 md:right-10 z-20 lantern-swing pointer-events-none hidden sm:block" style={{ animationDelay: '1.2s' }}>
        <div className="w-0.5 h-14 md:h-24 bg-yellow-600/40 mx-auto" />
        <div className="w-16 h-24 md:w-20 md:h-30 bg-red-600 border-x-4 border-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.4)] relative">
          <div className="absolute inset-0 border-y-8 border-yellow-600/30 rounded-full" />
          <span className="text-xl md:text-2xl text-yellow-300 font-bold title-font relative z-10">LỘC</span>
        </div>
      </div>

      {/* Main Container - Tối ưu khoảng cách để khớp khung hình */}
      <main className="z-10 flex flex-col items-center justify-between w-full max-w-2xl py-8 md:py-12 h-[80vh]">
        {/* Header Text */}
        <div className="text-center space-y-3 transform transition-all duration-1000 animate-in fade-in slide-in-from-top-10">
          <div className="inline-block bg-red-600/90 backdrop-blur-md text-yellow-300 px-6 py-2 rounded-full text-[10px] md:text-xs font-black tracking-[0.3em] border border-yellow-400/50 shadow-[0_5px_20px_rgba(220,38,38,0.3)] uppercase">
            XUÂN BÍNH NGỌ 2026
          </div>
          <h1 className="title-font text-5xl md:text-8xl text-yellow-400 drop-shadow-[0_8px_20px_rgba(255,215,0,0.5)] leading-tight">
            Chúc Mừng Năm Mới
          </h1>
          <h2 className="sub-title-font text-2xl md:text-4xl text-pink-300 drop-shadow-lg tracking-wide">
            Mã Đáo Thành Công
          </h2>
        </div>

        {/* Bao Lì Xì - Tinh chỉnh kích thước và hiệu ứng bóng đổ */}
        <div 
          onClick={openLuckyMoney}
          className="group relative cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 z-30 flex flex-col items-center"
        >
          {/* Vòng sáng hào quang phía sau */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/20 blur-[80px] rounded-full animate-pulse group-hover:bg-yellow-500/20 transition-colors" />
          
          <div className="w-48 h-64 md:w-56 md:h-72 bg-red-600 rounded-xl shadow-[0_30px_70px_-10px_rgba(220,38,38,0.7)] border-[3px] border-yellow-500/80 flex flex-col items-center relative overflow-hidden animate-bounce" style={{ animationDuration: '3s' }}>
            {/* Nắp bao lì xì */}
            <div className="absolute top-0 w-full h-[35%] bg-red-700 rounded-b-[50%] border-b-2 border-yellow-400/40 shadow-xl z-20 flex justify-center items-end pb-2">
              <div className="w-10 h-10 bg-yellow-500 rounded-full border-2 border-red-600 flex items-center justify-center text-red-700 text-xs font-bold shadow-inner">
                福
              </div>
            </div>
            
            {/* Thân bao lì xì - Nội dung trung tâm */}
            <div className="flex-1 w-full flex flex-col items-center justify-center mt-12 px-4 gap-4">
              <div className="z-10 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 text-red-700 w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center font-bold shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_-2px_6px_rgba(0,0,0,0.2)] border-2 border-red-600 group-hover:rotate-12 transition-transform">
                <span className="text-[10px] md:text-xs tracking-[0.2em] opacity-80 mb-1">CÁT TƯỜNG</span>
                <span className="text-2xl md:text-3xl title-font">LÌ XÌ</span>
                <div className="w-10 h-0.5 bg-red-600/20 mt-1 rounded-full" />
              </div>
              
              <div className="text-yellow-300/80 sub-title-font text-lg md:text-xl text-center leading-tight">
                Khai xuân <br/> Như ý
              </div>
            </div>
            
            {/* Trang trí góc vàng óng */}
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-yellow-500/10 rotate-45 border border-yellow-500/20" />
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-yellow-500/10 -rotate-45 border border-yellow-500/20" />
          </div>
          
          <div className="mt-10 text-center space-y-3">
            <p className="text-yellow-200/90 font-bold tracking-[0.2em] text-xs md:text-sm uppercase drop-shadow-md animate-pulse">
              Nhấn để nhận lộc đầu năm
            </p>
            <div className="flex justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Footer info - Cố định ở đáy container */}
        <div className="text-center opacity-40">
           <div className="text-[10px] text-gray-400 font-bold tracking-[0.5em] uppercase mb-1">
            Mã Đáo Thành Công
          </div>
          <div className="text-[9px] text-gray-500 font-medium tracking-[0.2em]">
            BÍNH NGỌ 2026 • GEMINI AI
          </div>
        </div>
      </main>

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <button 
          onClick={toggleMusic}
          aria-label="Toggle Music"
          className="w-12 h-12 md:w-14 md:h-14 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 group"
        >
          <span className="text-2xl transition-transform group-hover:scale-110">{isMusicOn ? '🔊' : '🔇'}</span>
        </button>
      </div>

      <WishModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialWish={currentWish} 
      />
    </div>
  );
};

export default App;
