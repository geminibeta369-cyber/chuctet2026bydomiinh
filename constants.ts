
import { WishData } from './types';

export const FALLBACK_WISHES: WishData[] = [
  { id: '1', text: "Chúc mừng năm mới! Tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.", emoji: "🧧" },
  { id: '2', text: "Vạn sự như ý, tỷ sự như mơ, triệu triệu bất ngờ, không chờ cũng đến.", emoji: "🌸" },
  { id: '3', text: "Chúc bạn 12 tháng phú quý, 365 ngày phát tài, 8760 giờ sung túc.", emoji: "💰" },
  { id: '4', text: "Năm mới chúc nhau sức khỏe nhiều. Bạc tiền rủng rỉnh thoải mái tiêu.", emoji: "🎊" },
  { id: '5', text: "Hay ăn chóng béo, tiền nhiều như kẹo, tình chặt như keo, dẻo dai như mèo.", emoji: "🧧" }
];

export const THEMES = [
  { value: 'truyền thống', label: 'Truyền thống' },
  { value: 'hài hước', label: 'Hài hước' },
  { value: 'trang trọng', label: 'Trang trọng' },
  { value: 'về tiền bạc', label: 'Phát tài' },
  { value: 'về sức khỏe', label: 'Sức khỏe' }
];
