import { useState } from 'react';
import {
  calculateLifePath,
  calculateAttitude,
  calculateDestiny,
  calculateSoulUrge,
  calculatePersonality,
  getNumberMeaning
} from '../utils/numerology';

const Numerology = () => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !birthDate) {
      setError('Vui lòng nhập đầy đủ Họ Tên và Ngày Sinh.');
      return;
    }
    setError('');

    const lifePath = calculateLifePath(birthDate);
    const attitude = calculateAttitude(birthDate);
    const destiny = calculateDestiny(fullName);
    const soulUrge = calculateSoulUrge(fullName);
    const personality = calculatePersonality(fullName);

    if (lifePath === 0 && attitude === 0 && destiny === 0 && soulUrge === 0 && personality === 0) {
      setError('Không thể tính toán với thông tin đã nhập. Vui lòng kiểm tra lại.');
      setResults(null);
      return;
    }

    setResults({
      lifePath,
      attitude,
      destiny,
      soulUrge,
      personality,
      lifePathMeaning: getNumberMeaning(lifePath),
      attitudeMeaning: getNumberMeaning(attitude),
      destinyMeaning: getNumberMeaning(destiny),
      soulUrgeMeaning: getNumberMeaning(soulUrge),
      personalityMeaning: getNumberMeaning(personality),
    });
  };

  const getLuckyDay = (destinyNum) => {
    const days = ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Chủ nhật'];
    const dayIndex = (destinyNum - 1) % 7;
    const day = days[dayIndex];
    return day === 'Chủ nhật' ? day : `Thứ ${day}`;
  };

  const getLuckyColor = (destinyNum) => {
    const colors = ['Đỏ', 'Cam', 'Vàng', 'Xanh lá', 'Xanh dương', 'Tím', 'Hồng', 'Nâu', 'Trắng'];
    return colors[(destinyNum - 1) % 9];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12">
      
      <div className="w-full max-w-4xl bg-galaxy-dark/40 border border-galaxy-primary/30 p-8 md:p-12 rounded-3xl shadow-2xl shadow-galaxy-primary/10">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text mb-4">
            Luận Giải Thần Số Học 🔢
          </h1>
          <p className="text-gray-400">Khám phá ý nghĩa các con số và giải mã vận mệnh của bạn qua lăng kính Pythagoras.</p>
        </div>

        {!results ? (
          <form onSubmit={handleCalculate} className="max-w-xl mx-auto space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-center text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Họ và Tên Khai Sinh <span className="text-galaxy-light">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="VD: NGUYEN VAN A"
                className="w-full px-4 py-3 bg-galaxy-darkest border border-galaxy-primary/50 text-white rounded-xl focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all uppercase"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Ngày Tháng Năm Sinh <span className="text-galaxy-light">*</span>
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 bg-galaxy-darkest border border-galaxy-primary/50 text-white rounded-xl focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-4 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary hover:scale-[1.02] text-white font-bold text-lg rounded-xl shadow-lg shadow-galaxy-primary/20 transition-all duration-300"
            >
              Tra Cứu Các Chỉ Số ✨
            </button>
          </form>
        ) : (
          <div className="w-full space-y-8 animate-fade-in">
            {/* Header Result */}
            <div className="text-center p-6 bg-galaxy-darkest rounded-2xl border border-galaxy-primary/30">
              <p className="text-gray-400 text-sm mb-1">Kết quả phân tích cho:</p>
              <h2 className="text-2xl font-bold text-galaxy-light uppercase mb-1">{fullName}</h2>
              <p className="text-gray-400 text-sm">Ngày sinh: {birthDate.split('-').reverse().join('/')}</p>
            </div>

            {/* Custom Tabs */}
            <div className="flex border-b border-border-default/20 overflow-x-auto hide-scrollbar">
              {['basic', 'personality', 'destiny'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[120px] py-4 px-4 text-sm font-bold transition-all relative ${
                    activeTab === tab ? 'text-galaxy-light' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab === 'basic' ? 'CƠ BẢN' : tab === 'personality' ? 'TÍNH CÁCH' : 'SỨ MỆNH'}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-galaxy-light rounded-t-md"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab: Cơ Bản */}
            {activeTab === 'basic' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30 hover:border-galaxy-secondary transition-all">
                    <div className="text-4xl font-black text-white mb-2">{results.lifePath}</div>
                    <div className="text-sm font-bold text-galaxy-light mb-1 uppercase">Số Chủ Đạo (Đường Đời)</div>
                    <div className="text-gray-400 italic text-sm">{results.lifePathMeaning.title}</div>
                  </div>
                  <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30 hover:border-galaxy-secondary transition-all">
                    <div className="text-4xl font-black text-white mb-2">{results.attitude}</div>
                    <div className="text-sm font-bold text-galaxy-light mb-1 uppercase">Số Thái Độ</div>
                    <div className="text-gray-400 italic text-sm">{results.attitudeMeaning.title}</div>
                  </div>
                </div>
                <div className="p-6 bg-galaxy-darkest/50 rounded-2xl border border-galaxy-primary/10">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-galaxy-light"></span> 
                    Ý nghĩa Đường đời số {results.lifePath}:
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-justify">
                    {results.lifePathMeaning.description}. Cụ thể ở năng lượng tích cực, bạn là người {results.lifePathMeaning.positive.toLowerCase()}. Tuy nhiên bạn cần cẩn trọng vượt qua các bài học về sự {results.lifePathMeaning.negative.toLowerCase()}.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Tính Cách */}
            {activeTab === 'personality' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30 hover:border-galaxy-secondary transition-all">
                    <div className="text-4xl font-black text-white mb-2">{results.soulUrge}</div>
                    <div className="text-sm font-bold text-galaxy-light mb-1 uppercase">Số Linh Hồn (Khao Khát Nội Tâm)</div>
                    <div className="text-gray-400 italic text-sm">{results.soulUrgeMeaning.title}</div>
                  </div>
                  <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30 hover:border-galaxy-secondary transition-all">
                    <div className="text-4xl font-black text-white mb-2">{results.personality}</div>
                    <div className="text-sm font-bold text-galaxy-light mb-1 uppercase">Số Nhân Cách (Cách Bạn Thể Hiện)</div>
                    <div className="text-gray-400 italic text-sm">{results.personalityMeaning.title}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-galaxy-darkest/50 rounded-2xl border-l-4 border-emerald-500">
                    <div className="text-sm font-bold text-emerald-400 mb-2 uppercase">Điểm mạnh tự nhiên:</div>
                    <p className="text-gray-300 text-sm">{results.soulUrgeMeaning.positive}</p>
                  </div>
                  <div className="p-6 bg-galaxy-darkest/50 rounded-2xl border-l-4 border-rose-500">
                    <div className="text-sm font-bold text-rose-400 mb-2 uppercase">Góc khuất cần cải thiện:</div>
                    <p className="text-gray-300 text-sm">{results.soulUrgeMeaning.negative}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Sứ Mệnh */}
            {activeTab === 'destiny' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="bg-galaxy-darkest p-8 rounded-2xl border border-galaxy-primary/50 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-galaxy-light/10 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-galaxy-secondary mb-4 drop-shadow-lg">
                      {results.destiny}
                    </div>
                    <div className="text-lg font-bold text-galaxy-light mb-2 uppercase tracking-widest">Đại Số Sứ Mệnh</div>
                    <div className="text-gray-300 italic">{results.destinyMeaning.title}</div>
                  </div>
                </div>
                
                <div className="p-6 bg-galaxy-darkest/50 rounded-2xl border border-galaxy-primary/10">
                  <h3 className="text-lg font-bold text-white mb-3">Sứ mạng trọng đại:</h3>
                  <p className="text-gray-300 leading-relaxed text-justify mb-6">
                    {results.destinyMeaning.description}. Vũ trụ đưa bạn đến thế giới này để học hỏi và lan tỏa năng lượng đặc biệt của mình.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-galaxy-primary/20 border border-galaxy-primary/50 px-4 py-2 rounded-lg text-sm text-gray-200">
                      Màu sắc thu hút: <strong className="text-white ml-1">{getLuckyColor(results.destiny)}</strong>
                    </div>
                    <div className="bg-galaxy-secondary/20 border border-galaxy-secondary/50 px-4 py-2 rounded-lg text-sm text-gray-200">
                      Thời điểm bùng nổ: <strong className="text-white ml-1">{getLuckyDay(results.destiny)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-8 flex justify-center">
              <button
                onClick={() => setResults(null)}
                className="px-8 py-3 bg-transparent border border-gray-600 hover:border-galaxy-light text-gray-400 hover:text-white rounded-xl transition-all font-medium"
              >
                ⟲ Khảo sát thông tin khác
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Numerology;
