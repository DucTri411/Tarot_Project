import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4">
      {/* Hero Section */}
      <div className="max-w-4xl w-full text-center mb-16 relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-galaxy-primary/30 rounded-full blur-[100px] -z-10"></div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-br from-white via-[#E9D5FF] to-galaxy-secondary text-transparent bg-clip-text">
          Khám Phá Bản Thân Qua<br/>
          <span className="text-galaxy-light">Những Con Số & Lá Bài</span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Bước vào thế giới tâm linh màu nhiệm để giải mã vận mệnh, định hướng tương lai và thấu hiểu vũ trụ bên trong bạn.
        </p>
      </div>

      {/* Main Content Blocks */}
      <div className="w-full flex flex-col gap-16 pb-20">
        
        {/* Numerology Block */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 md:gap-16 bg-galaxy-dark/40 p-8 md:p-12 rounded-3xl border border-galaxy-primary/30 hover:border-galaxy-secondary/50 transition-all duration-500 shadow-2xl shadow-galaxy-primary/10 group">
          
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-1 relative">
            <div className="absolute inset-0 bg-galaxy-light/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
            <img 
              src="/bunny1.jpg" 
              alt="Thỏ Thần Số Học" 
              className="w-full max-w-[400px] h-[400px] object-cover rounded-2xl shadow-[0_0_40px_rgba(178,111,203,0.3)] z-10 group-hover:-translate-y-2 transition-transform duration-500 bg-galaxy-darkest"
              onError={(e) => { e.target.src = 'https://placehold.co/400x400/221545/B26FCB?text=bunny1.jpg'; e.target.style.border = '2px dashed #B26FCB'; }}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start order-2 md:order-2 z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-galaxy-light to-white">Thần Số Học</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-10 w-full max-w-xl">
              Dựa trên ngày tháng năm sinh và họ tên của bạn, hệ thống AstroBunny sẽ tính toán sâu sắc qua các phương trình Pythagoras cổ đại để tìm ra Số Chủ Đạo, Số Sứ Mệnh, và Số Linh Hồn giúp bạn nắm bắt thời vận.
            </p>
            <Link 
              to="/numerology" 
              className="px-8 py-4 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary inline-flex items-center justify-center rounded-xl font-bold text-lg text-white hover:shadow-[0_0_30px_rgba(178,111,203,0.5)] hover:scale-105 transition-all duration-300"
            >
              Luận giải Thần số học ✨
            </Link>
          </div>
          
        </div>

        {/* Tarot Block */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 md:gap-16 bg-galaxy-dark/40 p-8 md:p-12 rounded-3xl border border-galaxy-primary/30 hover:border-galaxy-secondary/50 transition-all duration-500 shadow-2xl shadow-galaxy-primary/10 group">
          
          <div className="w-full md:w-1/2 flex flex-col items-start order-2 md:order-1 z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] to-galaxy-light">Bài Tarot AstroBunny</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-10 w-full max-w-xl">
              Nhờ năng lượng của các vì sao và thuật toán ngẫu nhiên, tụ bài AI của chúng tôi sẽ rút ra thông điệp từ vũ trụ gửi gắm đến riêng bạn trong ngày hôm nay. Hãy tập trung, hít thở sâu và nhận thông điệp.
            </p>
            <Link 
              to="/tarot" 
              className="px-8 py-4 bg-galaxy-darkest border-2 border-galaxy-secondary inline-flex items-center justify-center rounded-xl font-bold text-lg text-white hover:bg-galaxy-primary hover:border-galaxy-light hover:shadow-[0_0_20px_rgba(104,56,141,0.6)] hover:scale-105 transition-all duration-300"
            >
              Rút một lá bài ngẫu nhiên 🔮
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 relative">
            <div className="absolute inset-0 bg-galaxy-secondary/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
            <img 
              src="/bunny2.jpg" 
              alt="Thỏ Tarot" 
              className="w-full max-w-[400px] h-[400px] object-cover rounded-2xl shadow-[0_0_40px_rgba(104,56,141,0.4)] z-10 group-hover:-translate-y-2 transition-transform duration-500 bg-galaxy-darkest"
              onError={(e) => { e.target.src = 'https://placehold.co/400x400/110515/855AB4?text=bunny2.jpg'; e.target.style.border = '2px dashed #855AB4'; }}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
