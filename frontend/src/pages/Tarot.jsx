import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { drawThreeCards, generateSynthesis } from '../utils/tarotData';
import { getDetailForMajor, SUIT_THEMES } from '../utils/tarotDetails';

/* ──────────────────────────────────────────── */
/*  BlurOverlay: Lớp phủ yêu cầu đăng nhập     */
/* ──────────────────────────────────────────── */
const BlurOverlay = () => (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-galaxy-darkest/60 backdrop-blur-[2px] rounded-2xl border border-galaxy-primary/30">
    <div className="bg-galaxy-dark/90 p-6 rounded-xl border border-galaxy-secondary shadow-2xl shadow-galaxy-primary/20 text-center max-w-sm">
      <div className="text-4xl mb-3">🔒</div>
      <h3 className="text-xl font-bold text-galaxy-light mb-2">Mở Khóa Lời Giải Bài Tarot</h3>
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        Đăng nhập miễn phí để xem lời giải chi tiết của từng lá bài và tổng hợp bói toán liên kết 3 lá.
      </p>
      <div className="flex gap-3 justify-center">
        <Link to="/login" className="px-5 py-2.5 bg-galaxy-primary hover:bg-galaxy-secondary text-white font-medium rounded-lg transition-all shadow-lg shadow-galaxy-primary/30">Đăng Nhập</Link>
        <Link to="/register" className="px-5 py-2.5 bg-transparent border border-galaxy-light text-galaxy-light hover:bg-white/5 font-medium rounded-lg transition-all">Đăng Ký</Link>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────── */
/*  TarotCardComponent: Lá bài lật được         */
/* ──────────────────────────────────────────── */
const TarotCardComponent = ({ drawn, onFlip, isAuth }) => {
  const posLabels = { past: 'Quá Khứ', present: 'Hiện Tại', future: 'Tương Lai' };
  const posIcons = { past: '⏳', present: '🔮', future: '✨' };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
      {/* Nhãn vị trí */}
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-galaxy-light">{posIcons[drawn.position]} {posLabels[drawn.position]}</span>
      </div>

      {/* Lá bài */}
      <div
        onClick={() => !drawn.flipped && onFlip()}
        className={`relative w-44 h-72 rounded-2xl cursor-pointer transition-all duration-700 [transform-style:preserve-3d] ${drawn.flipped ? '[transform:rotateY(180deg)]' : 'hover:scale-105 hover:shadow-2xl hover:shadow-galaxy-primary/40'}`}
      >
        {/* Mặt sau */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden border-2 border-galaxy-primary shadow-xl">
          <img src="/tarot/card_back.png" alt="Lá bài Tarot" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.parentElement.classList.add('bg-gradient-to-br','from-galaxy-secondary','to-galaxy-darkest'); }} />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <p className="text-xs text-galaxy-light font-bold uppercase tracking-widest drop-shadow-lg">Lật bài</p>
          </div>
        </div>
        {/* Mặt trước */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden border-2 border-galaxy-light/50 shadow-xl">
          {/* Ảnh lá bài - Hiển thị cho tất cả các lá */}
          <img 
            src={`/tarot/${drawn.card.id}.png`} 
            alt={drawn.card.name} 
            className={`w-full h-full object-cover ${drawn.reversed ? 'rotate-180' : ''}`}
            onError={(e) => {
              // Nếu không có ảnh, ẩn ảnh và hiển thị fallback emoji
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          
          {/* Fallback UI (Emoji) - Ẩn mặc định, hiện khi img lỗi */}
          <div style={{ display: 'none' }} className="w-full h-full bg-gradient-to-br from-galaxy-dark to-galaxy-darkest flex flex-col items-center justify-center p-4">
            <div className={`text-4xl mb-2 ${drawn.reversed ? 'rotate-180' : ''}`}>
              {drawn.card.arcana === 'major' ? '🌟' : drawn.card.suit === 'wands' ? '🔥' : drawn.card.suit === 'cups' ? '💧' : drawn.card.suit === 'swords' ? '💨' : '🪙'}
            </div>
          </div>

          {/* Overlay tên lá bài */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <h3 className={`text-sm font-bold text-center ${drawn.reversed ? 'text-rose-300' : 'text-white'}`}>
              {drawn.card.name}
              {drawn.reversed && <span className="block text-[10px] text-rose-400 mt-0.5">⟲ Ngược</span>}
            </h3>
            <div className="flex flex-wrap justify-center gap-1 mt-1">
              {drawn.card.keywords.slice(0, 3).map((kw, i) => (
                <span key={i} className="text-[8px] bg-galaxy-primary/50 text-galaxy-light px-1.5 py-0.5 rounded-md">{kw}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lời giải (hiển thị khi lật xong) */}
      {drawn.flipped && (() => {
        const detail = drawn.card.arcana === 'major' ? getDetailForMajor(drawn.card.id) : null;
        const suitInfo = drawn.card.suit ? SUIT_THEMES[drawn.card.suit] : null;
        return (
          <div className="relative w-full animate-fade-in-up">
            {!isAuth && <BlurOverlay />}
            <div className={`bg-galaxy-darkest p-4 rounded-xl border border-galaxy-primary/20 space-y-3 ${!isAuth ? 'blur-[4px] select-none opacity-50' : ''}`}>
              {/* Ý nghĩa chính */}
              <div>
                <h4 className="text-sm font-bold text-galaxy-light mb-1">
                  {drawn.reversed ? '⟲ Ý nghĩa ngược:' : '☀ Ý nghĩa thuận:'}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {drawn.reversed ? drawn.card.reversedMeaning : drawn.card.uprightMeaning}
                </p>
              </div>
              {/* Suit info cho Minor Arcana */}
              {suitInfo && (
                <div className="bg-white/5 p-3 rounded-lg">
                  <span className="text-[10px] font-bold text-galaxy-light uppercase">{suitInfo.element} — {suitInfo.theme}</span>
                  <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{suitInfo.description}</p>
                </div>
              )}
              {/* Chi tiết 4 khía cạnh cho Major Arcana */}
              {detail && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <div className="bg-rose-500/10 p-2.5 rounded-lg">
                    <span className="text-[10px] font-bold text-rose-300">❤ Tình yêu</span>
                    <p className="text-[10px] text-gray-300 mt-1 leading-relaxed">{detail.love}</p>
                  </div>
                  <div className="bg-blue-500/10 p-2.5 rounded-lg">
                    <span className="text-[10px] font-bold text-blue-300">💼 Sự nghiệp</span>
                    <p className="text-[10px] text-gray-300 mt-1 leading-relaxed">{detail.career}</p>
                  </div>
                  <div className="bg-emerald-500/10 p-2.5 rounded-lg">
                    <span className="text-[10px] font-bold text-emerald-300">💰 Tài chính</span>
                    <p className="text-[10px] text-gray-300 mt-1 leading-relaxed">{detail.finance}</p>
                  </div>
                  <div className="bg-amber-500/10 p-2.5 rounded-lg">
                    <span className="text-[10px] font-bold text-amber-300">🏥 Sức khỏe</span>
                    <p className="text-[10px] text-gray-300 mt-1 leading-relaxed">{detail.health}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

/* ──────────────────────────────────────────── */
/*  Main Tarot Page Component                    */
/* ──────────────────────────────────────────── */
const Tarot = () => {
  const [phase, setPhase] = useState('landing'); // landing | shuffle | spread
  const [drawnCards, setDrawnCards] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  const handleStartReading = () => {
    setPhase('shuffle');
    setIsShuffling(true);

    // Giả lập hiệu ứng xào bài 2.5 giây
    setTimeout(() => {
      const cards = drawThreeCards();
      setDrawnCards(cards);
      setIsShuffling(false);
      setPhase('spread');
    }, 2500);
  };

  const handleFlip = (index) => {
    setDrawnCards(prev => prev.map((c, i) => i === index ? { ...c, flipped: true } : c));
  };

  const handleReset = () => {
    setPhase('landing');
    setDrawnCards([]);
  };

  const allFlipped = drawnCards.length > 0 && drawnCards.every(c => c.flipped);
  const synthesis = allFlipped ? generateSynthesis(drawnCards) : null;

  /* ── LANDING ── */
  if (phase === 'landing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12">
        <div className="w-full max-w-3xl text-center">
          <div className="text-7xl mb-6 animate-pulse">🔮</div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text mb-6">
            Trải Bài Tarot
          </h1>
          <p className="text-gray-400 text-lg mb-4 max-w-xl mx-auto leading-relaxed">
            Bộ bài Tarot 78 lá mang đến những thông điệp sâu sắc về hành trình cuộc đời bạn.
          </p>
          <p className="text-gray-500 text-sm mb-10 max-w-lg mx-auto">
            Trải bài <strong className="text-galaxy-light">3 lá</strong> — Quá khứ, Hiện tại & Tương lai — sẽ soi sáng những khía cạnh quan trọng nhất trong cuộc sống hiện tại của bạn.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
            <div className="bg-galaxy-dark/50 border border-galaxy-primary/20 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">⏳</div>
              <span className="text-xs font-bold text-galaxy-light uppercase">Quá Khứ</span>
              <p className="text-[10px] text-gray-500 mt-1">Điều đã qua</p>
            </div>
            <div className="bg-galaxy-dark/50 border border-galaxy-primary/20 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">🔮</div>
              <span className="text-xs font-bold text-galaxy-light uppercase">Hiện Tại</span>
              <p className="text-[10px] text-gray-500 mt-1">Điều đang xảy ra</p>
            </div>
            <div className="bg-galaxy-dark/50 border border-galaxy-primary/20 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">✨</div>
              <span className="text-xs font-bold text-galaxy-light uppercase">Tương Lai</span>
              <p className="text-[10px] text-gray-500 mt-1">Điều sắp đến</p>
            </div>
          </div>

          <button
            onClick={handleStartReading}
            className="px-10 py-4 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary hover:scale-[1.03] text-white font-bold text-lg rounded-xl shadow-lg shadow-galaxy-primary/30 transition-all"
          >
            Bắt Đầu Trải Bài ✨
          </button>
        </div>
      </div>
    );
  }

  /* ── SHUFFLE ── */
  if (phase === 'shuffle') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12">
        <div className="relative w-48 h-48 mb-8">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-28 h-44 -mt-22 -ml-14 bg-gradient-to-br from-galaxy-secondary to-galaxy-darkest border-2 border-galaxy-primary rounded-xl shadow-xl"
              style={{
                animation: `shuffle-spin 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                transform: `rotate(${i * 15 - 30}deg)`,
              }}
            />
          ))}
        </div>
        <p className="text-galaxy-light text-lg font-bold animate-pulse">Đang xào bài...</p>
        <p className="text-gray-500 text-sm mt-2">Hít thở sâu và tập trung vào câu hỏi của bạn</p>

        <style>{`
          @keyframes shuffle-spin {
            0%, 100% { transform: rotate(var(--r, 0deg)) translateY(0); }
            25% { transform: rotate(calc(var(--r, 0deg) + 10deg)) translateY(-20px); }
            50% { transform: rotate(calc(var(--r, 0deg) - 5deg)) translateY(10px); }
            75% { transform: rotate(calc(var(--r, 0deg) + 3deg)) translateY(-10px); }
          }
        `}</style>
      </div>
    );
  }

  /* ── SPREAD ── */
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-140px)] px-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text">
            Trải Bài Của Bạn
          </h1>
          <button onClick={handleReset} className="px-4 py-2 text-sm text-gray-400 hover:text-galaxy-light border border-gray-700 hover:border-galaxy-light rounded-lg transition-all">
            ⟲ Trải lại
          </button>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {drawnCards.map((drawn, i) => (
            <TarotCardComponent
              key={i}
              drawn={drawn}
              onFlip={() => handleFlip(i)}
              isAuth={isAuth}
            />
          ))}
        </div>

        {!allFlipped && (
          <p className="text-center text-gray-500 text-sm animate-pulse">
            👆 Nhấn vào từng lá bài để lật và xem lời giải
          </p>
        )}

        {/* Tổng hợp khi lật hết */}
        {synthesis && (
          <div className="relative animate-fade-in-up">
            {!isAuth && <BlurOverlay />}
            <div className={`bg-galaxy-darkest p-8 rounded-2xl border border-galaxy-primary/30 space-y-6 ${!isAuth ? 'blur-[4px] select-none opacity-50' : ''}`}>
              <h2 className="text-xl font-bold text-galaxy-light text-center uppercase tracking-wider">
                ✦ Tổng Hợp Lời Giải ✦
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-5 rounded-xl">
                  <h3 className="text-sm font-bold text-white mb-2">⚡ Năng Lượng Chủ Đạo</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{synthesis.energy}</p>
                </div>
                <div className="bg-white/5 p-5 rounded-xl">
                  <h3 className="text-sm font-bold text-white mb-2">🌊 Tâm Trạng Tổng Thể</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{synthesis.mood}</p>
                </div>
              </div>
              <div className="bg-galaxy-primary/10 border-l-4 border-galaxy-light p-5 rounded-r-xl">
                <h3 className="text-sm font-bold text-galaxy-light mb-2">💫 Lời Khuyên</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{synthesis.advice}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tarot;
