import { useState } from 'react';
import axios from 'axios';

const FeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (r) => {
    setFormData({ ...formData, rating: r });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/feedback`, formData);
      setMessage(res.data.message || 'Cảm ơn bạn đã phản hồi!');
      setTimeout(() => {
        setIsOpen(false);
        setMessage('');
        setFormData({ name: '', email: '', content: '', rating: 5 });
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary text-white p-4 rounded-full shadow-[0_0_20px_rgba(164,118,220,0.5)] hover:shadow-[0_0_30px_rgba(164,118,220,0.8)] transition-all duration-300 group flex items-center justify-center hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="absolute right-full mr-4 bg-galaxy-dark text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-galaxy-primary/30">
          Góp ý với chúng mình
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-galaxy-darkest border border-galaxy-primary/40 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-galaxy-light to-galaxy-primary"></div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-galaxy-light to-white">Góp ý trải nghiệm</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {message && (
                <div className={`p-3 rounded-lg mb-4 text-sm ${message.includes('Cảm ơn') ? 'bg-green-500/20 text-green-200 border border-green-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Tên của bạn</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-galaxy-dark border border-galaxy-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all" placeholder="Nhập tên..." />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Email</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-galaxy-dark border border-galaxy-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all" placeholder="Nhập email..." />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Đánh giá sao</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => handleRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                        <svg className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Nội dung góp ý</label>
                  <textarea name="content" required value={formData.content} onChange={handleChange} rows="4" className="w-full bg-galaxy-dark border border-galaxy-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-galaxy-light focus:ring-1 focus:ring-galaxy-light transition-all resize-none" placeholder="Chia sẻ suy nghĩ của bạn về trải nghiệm..."></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 mt-2 bg-gradient-to-r from-galaxy-primary to-galaxy-secondary hover:from-galaxy-secondary hover:to-galaxy-primary text-white font-semibold rounded-lg shadow-lg shadow-galaxy-primary/20 transition-all duration-300 disabled:opacity-50">
                  {loading ? 'Đang gửi...' : 'Gửi góp ý'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackModal;
