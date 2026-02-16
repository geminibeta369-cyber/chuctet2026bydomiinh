
import React, { useState, useRef, useEffect } from 'react';
import { generateAIWish } from '../services/geminiService';
import { WishTheme } from '../types';
import { THEMES } from '../constants';
import html2canvas from 'html2canvas';

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWish: string;
}

const WishModal: React.FC<WishModalProps> = ({ isOpen, onClose, initialWish }) => {
  const [wish, setWish] = useState(initialWish);
  const [emoji, setEmoji] = useState('🐎');
  const [title, setTitle] = useState('Chúc Mừng Năm Mới');
  const [theme, setTheme] = useState<WishTheme>('truyền thống');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setWish(initialWish);
  }, [isOpen, initialWish]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const newWish = await generateAIWish(theme);
    setWish(newWish);
    setIsGenerating(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUserImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    const element = cardRef.current;
    
    // Lưu lại style cũ để khôi phục sau khi chụp
    const originalMaxHeight = element.style.maxHeight;
    const originalOverflow = element.style.overflow;
    const originalHeight = element.style.height;

    // Tạm thời ẩn các nút điều khiển
    const controls = element.querySelectorAll('.no-capture');
    controls.forEach(el => (el as HTMLElement).style.display = 'none');
    
    // Ép phần tử hiển thị toàn bộ nội dung (không bị cắt bởi scrollbar)
    element.style.maxHeight = 'none';
    element.style.overflow = 'visible';
    element.style.height = 'auto';

    try {
      // Đợi một chút để browser re-render layout
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        backgroundColor: '#fffdf0',
        scale: 3, 
        useCORS: true,
        logging: false,
        allowTaint: true,
        scrollY: -window.scrollY,
        windowHeight: element.scrollHeight 
      });
      
      const link = document.createElement('a');
      link.download = `Chuc-Tet-2026-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 0.9);
      link.click();
    } catch (err) {
      console.error("Lỗi khi tải ảnh thiệp:", err);
      alert("Không thể tải thiệp. Vui lòng thử lại!");
    } finally {
      // Khôi phục lại trạng thái cũ
      element.style.maxHeight = originalMaxHeight;
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      controls.forEach(el => (el as HTMLElement).style.display = '');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg transition-opacity overflow-y-auto">
      <div className="min-h-full py-8 flex items-center justify-center w-full">
        <div 
          ref={cardRef}
          className="relative bg-[#fffdf0] border-[8px] border-double border-red-600 rounded-2xl shadow-2xl max-w-lg w-full p-8 md:p-10 text-center flex flex-col items-center"
          style={{
            backgroundImage: 'radial-gradient(#fecaca 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px'
          }}
        >
          <button 
            onClick={onClose}
            className="no-capture absolute top-4 right-4 text-red-700 hover:text-red-500 text-3xl font-bold leading-none z-20"
            title="Đóng"
          >
            &times;
          </button>

          <div className="flex justify-between w-full mb-4 px-2 opacity-40 select-none pointer-events-none">
            <span className="text-red-600 text-xl">🌸</span>
            <span className="text-red-600 text-xl">🌸</span>
          </div>

          <div className="bg-red-600 text-yellow-300 px-6 py-1.5 rounded-full text-sm font-bold tracking-[0.2em] mb-6 shadow-md border-2 border-yellow-500/50">
            XUÂN BÍNH NGỌ 2026
          </div>

          <div 
            contentEditable 
            suppressContentEditableWarning
            onBlur={(e) => setEmoji(e.currentTarget.textContent || '🐎')}
            className="text-7xl mb-4 cursor-pointer focus:outline-none hover:scale-110 transition-transform drop-shadow-sm"
          >
            {emoji}
          </div>

          <h1 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setTitle(e.currentTarget.textContent || 'Chúc Mừng Năm Mới')}
            className="title-font text-5xl text-red-600 mb-6 focus:outline-none px-4 min-w-[200px] leading-tight"
          >
            {title}
          </h1>

          {userImage && (
            <div className="relative mb-6 group w-full px-2">
              <div className="p-2 bg-white shadow-lg rounded-xl border border-gray-100 rotate-1 overflow-hidden">
                <img 
                  src={userImage} 
                  alt="Kỷ niệm" 
                  className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                />
              </div>
              <button 
                onClick={() => setUserImage(null)}
                className="no-capture absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-700 border-2 border-white"
              >
                &times;
              </button>
            </div>
          )}

          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-8 opacity-40" />

          <div 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setWish(e.currentTarget.textContent || '')}
            className="sub-title-font text-3xl md:text-4xl text-gray-800 leading-snug font-bold focus:outline-none min-h-[100px] w-full px-4 italic"
          >
            {wish}
          </div>

          <div className="mt-8 flex flex-col items-center gap-1">
            <div className="text-[12px] text-red-800 font-extrabold uppercase tracking-[0.4em]">
              • Mã Đáo Thành Công •
            </div>
            <div className="text-[10px] text-gray-400 font-semibold italic">
              Kỷ niệm Xuân Bính Ngọ
            </div>
          </div>

          <div className="no-capture mt-10 flex flex-col gap-6 w-full border-t border-red-100 pt-8">
            <div className="flex flex-wrap justify-center gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value as WishTheme)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all shadow-sm active:scale-95 ${theme === t.value ? 'bg-red-600 text-white scale-105' : 'bg-white text-red-600 border border-red-100 hover:bg-red-50'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3.5 rounded-2xl font-bold shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 text-xs"
              >
                {isGenerating ? 'Đang soạn...' : '🤖 AI Soạn Lời'}
              </button>
              
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3.5 rounded-2xl font-bold shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-xs">
                📸 Chèn Ảnh
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>

              <button 
                onClick={handleDownload}
                className="bg-yellow-500 hover:bg-yellow-600 text-red-900 px-4 py-3.5 rounded-2xl font-bold shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-xs"
              >
                💾 Tải Thiệp
              </button>
            </div>

            {/* Nút Trở Về mới */}
            <button 
              onClick={onClose}
              className="mt-2 w-full py-3 border-2 border-red-600 text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              ← Quay lại trang chính
            </button>

            <p className="text-[10px] text-gray-400 font-medium italic">
              💡 Chạm vào tiêu đề hoặc lời chúc để tự chỉnh sửa theo ý muốn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishModal;
