import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateFullReport } from '../utils/numerology';
import { getCoreMeaning, MEANINGS } from '../utils/numerologyData';

const BlurOverlay = () => (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-galaxy-darkest/60 backdrop-blur-[2px] rounded-2xl border border-galaxy-primary/30">
    <div className="bg-galaxy-dark/90 p-6 rounded-xl border border-galaxy-secondary shadow-2xl shadow-galaxy-primary/20 text-center max-w-sm">
      <div className="text-4xl mb-3">🔒</div>
      <h3 className="text-xl font-bold text-galaxy-light mb-2">Nội dung độc quyền</h3>
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        Phần giải mã chi tiết và các biểu đồ chuyên sâu chỉ dành cho thành viên của AstroBunny. Đăng nhập ngay hoàn toàn miễn phí!
      </p>
      <div className="flex gap-3 justify-center">
        <Link to="/login" className="px-5 py-2.5 bg-galaxy-primary hover:bg-galaxy-secondary text-white font-medium rounded-lg transition-all shadow-lg shadow-galaxy-primary/30">
          Đăng nhập
        </Link>
        <Link to="/register" className="px-5 py-2.5 bg-transparent border border-galaxy-light text-galaxy-light hover:bg-white/5 font-medium rounded-lg transition-all">
          Đăng ký
        </Link>
      </div>
    </div>
  </div>
);

const Numerology = () => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check auth status
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !birthDate) {
      setError('Vui lòng nhập đầy đủ Họ Tên và Ngày Sinh.');
      return;
    }
    setError('');

    const calcObj = generateFullReport(fullName, birthDate);
    if (!calcObj.lifePath) {
      setError('Lỗi khi tính toán. Vui lòng kiểm tra lại ngày sinh.');
      return;
    }
    setReport(calcObj);
    setActiveTab('overview');
  };

  const tabs = [
    { id: 'overview', label: 'TỔNG QUAN' },
    { id: 'soul', label: 'LINH HỒN' },
    { id: 'destiny', label: 'SỨ MỆNH' },
    { id: 'charts', label: 'BIỂU ĐỒ' },
    { id: 'cycles', label: 'CHU KỲ VẬN SỐ' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12">
      <div className="w-full max-w-5xl bg-galaxy-dark/40 border border-galaxy-primary/30 p-6 md:p-10 rounded-3xl shadow-2xl shadow-galaxy-primary/10">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-galaxy-light to-white text-transparent bg-clip-text mb-4">
            Báo cáo thần số học toàn diện
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Khám phá 10+ chỉ số chuyên sâu, biểu đồ ngày sinh và chu kỳ vận mệnh của bạn theo trường phái Pythagoras nguyên thủy.
          </p>
        </div>

        {!report ? (
          <form onSubmit={handleCalculate} className="max-w-xl mx-auto space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-center text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Họ và tên khai sinh <span className="text-galaxy-light">*</span></label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="VD: NGUYEN VAN A" className="w-full px-4 py-3 bg-galaxy-darkest border border-galaxy-primary/50 text-white rounded-xl focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light uppercase transition-all" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Ngày tháng năm sinh <span className="text-galaxy-light">*</span></label>
              <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full px-4 py-3 bg-galaxy-darkest border border-galaxy-primary/50 text-white rounded-xl focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all" style={{ colorScheme: 'dark' }} />
            </div>
            <button type="submit" className="w-full py-4 mt-4 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary hover:scale-[1.02] text-white font-bold text-lg rounded-xl shadow-lg transition-all">
              Giải mã vận mệnh ✨
            </button>
          </form>
        ) : (
          <div className="w-full space-y-8 animate-fade-in">
            {/* Header Profile */}
            <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-galaxy-darkest rounded-2xl border border-galaxy-primary/30 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Hồ sơ của:</p>
                <h2 className="text-2xl font-bold text-galaxy-light uppercase">{fullName}</h2>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Ngày sinh:</p>
                <p className="text-xl font-medium text-white">{birthDate.split('-').reverse().join('/')}</p>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex overflow-x-auto whitespace-nowrap border-b border-galaxy-primary/30 custom-scrollbar pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-block px-6 py-3 text-sm font-bold transition-all relative ${
                    activeTab === tab.id ? 'text-galaxy-light' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-1 bg-galaxy-light rounded-t-md"></span>}
                </button>
              ))}
            </div>

            {/* TAB 1: TỔNG QUAN (Free cho mọi User) */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Đường đời */}
                  <div className="md:col-span-2 bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm font-bold text-galaxy-light uppercase">Số chủ đạo (đường đời)</div>
                        <div className="text-gray-400 italic text-sm">{getCoreMeaning(report.lifePath).title}</div>
                      </div>
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-galaxy-secondary">{report.lifePath}</div>
                    </div>
                    <p className="text-gray-300 text-justify leading-relaxed text-sm">{getCoreMeaning(report.lifePath).positive}</p>
                    <p className="text-gray-400 text-justify leading-relaxed text-sm mt-2"><span className="text-rose-400 font-medium">Lưu ý:</span> {getCoreMeaning(report.lifePath).negative}</p>
                  </div>
                  
                  {/* Thái độ & Ngày sinh */}
                  <div className="space-y-6">
                    <div className="bg-galaxy-darkest p-5 rounded-2xl border border-galaxy-primary/30 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-galaxy-light uppercase">Số thái độ</div>
                        <div className="text-xs text-gray-400">Cách phản ứng</div>
                      </div>
                      <div className="text-3xl font-black text-white">{report.attitude}</div>
                    </div>
                    <div className="bg-galaxy-darkest p-5 rounded-2xl border border-galaxy-primary/30 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-galaxy-light uppercase">Số ngày sinh</div>
                        <div className="text-xs text-gray-400">Năng lực bẩm sinh</div>
                      </div>
                      <div className="text-3xl font-black text-white">{report.birthDay}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-galaxy-darkest/50 rounded-2xl border border-galaxy-primary/10">
                  <h3 className="text-sm font-bold text-galaxy-light uppercase mb-2">Thái độ đối với thế giới:</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{MEANINGS.ATTITUDE[report.attitude]}</p>
                </div>
              </div>
            )}

            {/* TAB 2: LINH HỒN (Gated) */}
            {activeTab === 'soul' && (
              <div className="relative space-y-6 animate-fade-in-up">
                {!isAuth && <BlurOverlay />}
                <div className={!isAuth ? 'blur-[4px] select-none opacity-50' : ''}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30">
                      <div className="text-sm font-bold text-galaxy-light uppercase mb-1">Số linh hồn (khát vọng)</div>
                      <div className="text-4xl font-black text-white mb-4">{report.soulUrge}</div>
                      <p className="text-gray-300 text-sm">{getCoreMeaning(report.soulUrge).positive}</p>
                    </div>
                    <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30">
                      <div className="text-sm font-bold text-galaxy-light uppercase mb-1">Số nhân cách (vỏ bọc)</div>
                      <div className="text-4xl font-black text-white mb-4">{report.personality}</div>
                      <p className="text-gray-300 text-sm">{getCoreMeaning(report.personality).positive}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SỨ MỆNH & TRƯỞNG THÀNH (Gated) */}
            {activeTab === 'destiny' && (
              <div className="relative space-y-6 animate-fade-in-up">
                {!isAuth && <BlurOverlay />}
                <div className={!isAuth ? 'blur-[4px] select-none opacity-50' : ''}>
                  <div className="bg-galaxy-darkest p-8 rounded-2xl border border-galaxy-primary/30 text-center relative overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-galaxy-light/5 blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-galaxy-secondary mb-2">{report.destiny}</div>
                      <div className="text-lg font-bold text-galaxy-light uppercase tracking-widest mb-1">Đại số sứ mệnh</div>
                      <div className="text-gray-300 italic text-sm">{getCoreMeaning(report.destiny).title}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-galaxy-darkest/50 rounded-2xl border-l-4 border-galaxy-light">
                      <h3 className="font-bold text-white mb-2">Lời khuyên sứ mệnh</h3>
                      <p className="text-sm text-gray-300">{getCoreMeaning(report.destiny).advice}</p>
                    </div>
                    <div className="p-6 bg-galaxy-darkest/50 rounded-2xl border border-galaxy-primary/10 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-white mb-1">Bài học trưởng thành</h3>
                        <p className="text-xs text-gray-400">Đạt độ chín sau 35 tuổi</p>
                      </div>
                      <div className="text-4xl font-black text-galaxy-secondary">{report.maturity}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BIỂU ĐỒ & SỐ THIẾU (Gated) */}
            {activeTab === 'charts' && (
              <div className="relative space-y-6 animate-fade-in-up">
                {!isAuth && <BlurOverlay />}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${!isAuth ? 'blur-[4px] select-none opacity-50' : ''}`}>
                  <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30">
                    <h3 className="font-bold text-galaxy-light uppercase mb-4">Biểu đồ ngày sinh</h3>
                    <div className="grid grid-cols-3 gap-2 w-48 mx-auto mb-6">
                      {[1,2,3,4,5,6,7,8,9].map(num => (
                        <div key={num} className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg ${report.birthChart[num] > 0 ? 'bg-galaxy-primary text-white shadow-lg shadow-galaxy-primary/40' : 'bg-white/5 text-white/20'}`}>
                          {report.birthChart[num] > 0 ? num.toString().repeat(report.birthChart[num]) : ''}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-center text-gray-400">Bản đồ sức mạnh bẩm sinh của bạn.</p>
                  </div>

                  <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30">
                    <h3 className="font-bold text-galaxy-light uppercase mb-4">Phân tích bổ sung</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-gray-400 block mb-1">Đam mê tiềm ẩn:</span>
                        <div className="flex flex-wrap gap-2">
                          {report.hiddenPassion.length > 0 ? report.hiddenPassion.map(p => (
                            <span key={p} className="px-3 py-1 bg-galaxy-secondary/20 text-galaxy-light rounded-md text-sm font-bold">Số {p}</span>
                          )) : <span className="text-sm text-gray-500">Năng lượng đồng đều</span>}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <span className="text-sm text-gray-400 block mb-2">Bài học nghiệp quả (số thiếu):</span>
                        {report.missingNumbers.length > 0 ? (
                           <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                             {report.missingNumbers.map(m => (
                               <div key={m} className="bg-white/5 p-3 rounded-lg">
                                 <strong className="text-rose-400 text-sm">Số {m}: </strong>
                                 <span className="text-xs text-gray-300">{MEANINGS.MISSING_NUMBERS[m]}</span>
                               </div>
                             ))}
                           </div>
                        ) : <span className="text-sm text-emerald-400">Khá hiếm hoi, tên của bạn không bị khuyết số nào!</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: CHU KỲ (Gated) */}
            {activeTab === 'cycles' && (
              <div className="relative space-y-6 animate-fade-in-up">
                {!isAuth && <BlurOverlay />}
                <div className={!isAuth ? 'blur-[4px] select-none opacity-50' : ''}>
                  <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30">
                    <h3 className="font-bold text-galaxy-light uppercase mb-6 text-center">Biểu đồ 4 đỉnh cao cuộc đời</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {report.cycles.pinnacles.map((pin, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl text-center relative overflow-hidden group hover:border-galaxy-secondary transition-all">
                          <div className="text-xs text-gray-400 mb-1">Đỉnh cao {i+1}</div>
                          <div className="text-sm font-medium text-emerald-400 mb-3 block">Tuổi {report.cycles.ages[i]}</div>
                          <div className="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-transform">{pin}</div>
                          <p className="text-xs text-gray-300 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">{MEANINGS.PINNACLES[pin]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-galaxy-darkest p-6 rounded-2xl border border-galaxy-primary/30">
                    <h3 className="font-bold text-rose-400 uppercase mb-4">4 thử thách kèm theo</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {report.cycles.challenges.map((chal, i) => (
                        <div key={i} className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-center">
                          <div className="text-xs text-rose-300 mb-2">Thử thách {i+1}</div>
                          <div className="text-3xl font-black text-rose-500 mb-2">{chal}</div>
                          <p className="text-[11px] text-gray-400 leading-tight">{MEANINGS.CHALLENGES[chal]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-8 flex justify-center">
              <button onClick={() => { setReport(null); setActiveTab('overview'); }} className="px-8 py-3 bg-transparent border border-gray-600 hover:border-galaxy-light text-gray-400 hover:text-white rounded-xl transition-all font-medium">
                ⟲ Phân tích thông tin khác
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Numerology;
