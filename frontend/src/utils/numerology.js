// Hàm tính tổng các chữ số (rút gọn về 1-9, trừ master numbers 11,22,33)
const reduceNumber = (num) => {
    if (num === 11 || num === 22 || num === 33) return num;
    let result = num;
    while (result > 9) {
      result = result
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return result;
  };
  
  // Tính chỉ số đường đời từ ngày sinh
  export const calculateLifePath = (date) => {
    if (!date) return 0;
  
    try {
      const [year, month, day] = date.split('-').map(Number);
      if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) return 0;
  
      const sum = day + month + year;
      return reduceNumber(sum);
    } catch (error) {
      console.error('Lỗi khi tính chỉ số đường đời:', error);
      return 0;
    }
  };
  
  // Tính chỉ số thái độ từ ngày sinh (ngày + tháng)
  export const calculateAttitude = (date) => {
    if (!date) return 0;
  
    try {
      const [year, month, day] = date.split('-').map(Number);
      if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) return 0;
  
      const sum = day + month;
      return reduceNumber(sum);
    } catch (error) {
      console.error('Lỗi khi tính chỉ số thái độ:', error);
      return 0;
    }
  };
  
  // Tính chỉ số linh hồn (nguyên âm)
  export const calculateSoulUrge = (name) => {
    if (!name) return 0;
  
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const vowelValues = {
      a: 1, e: 5, i: 9, o: 6, u: 3,
    };
  
    const sum = name
      .toLowerCase()
      .split('')
      .filter((char) => vowels.includes(char))
      .map((char) => vowelValues[char] || 0)
      .reduce((acc, val) => acc + val, 0);
  
    return sum > 0 ? reduceNumber(sum) : 0;
  };
  
  // Tính chỉ số nhân cách (phụ âm)
  export const calculatePersonality = (name) => {
    if (!name) return 0;
  
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consonantValues = {
      b: 2, c: 3, d: 4, f: 6, g: 7, h: 8,
      j: 1, k: 2, l: 3, m: 4, n: 5, p: 7,
      q: 8, r: 9, s: 1, t: 2, v: 4, w: 5,
      x: 6, y: 7, z: 8,
    };
  
    const sum = name
      .toLowerCase()
      .split('')
      .filter((char) => char.match(/[a-z]/) && !vowels.includes(char))
      .map((char) => consonantValues[char] || 0)
      .reduce((acc, val) => acc + val, 0);
  
    return sum > 0 ? reduceNumber(sum) : 0;
  };
  
  // Tính chỉ số sứ mệnh (tổng các chữ cái)
  export const calculateDestiny = (name) => {
    if (!name) return 0;
  
    const sum = name
      .toLowerCase()
      .split('')
      .filter((char) => char.match(/[a-z]/))
      .map((char) => char.charCodeAt(0) - 96)
      .reduce((acc, val) => acc + val, 0);
  
    return sum > 0 ? reduceNumber(sum) : 0;
  };
  
  export const getNumberMeaning = (num) => {
    const DEFAULT_MEANING = {
      title: 'Chưa xác định',
      description: 'Không thể xác định ý nghĩa cho số này',
      positive: '',
      negative: '',
    };
  
    if (num === 0) return DEFAULT_MEANING;
  
    const meanings = {
      1: {
        title: 'Nhà Lãnh Đạo',
        description: 'Độc lập, sáng tạo, quyết đoán',
        positive: 'Tiên phong, tự tin, ý chí mạnh mẽ',
        negative: 'Ích kỷ, độc đoán, dễ nóng giận',
      },
      2: {
        title: 'Nhà Ngoại Giao',
        description: 'Nhạy cảm, hợp tác, cân bằng',
        positive: 'Khéo léo, kiên nhẫn, trực giác tốt',
        negative: 'Nhút nhát, dễ bị ảnh hưởng, thụ động',
      },
      3: {
        title: 'Người Truyền Cảm Hứng',
        description: 'Sáng tạo, lạc quan, giao tiếp',
        positive: 'Hài hước, nghệ thuật, cuốn hút',
        negative: 'Phân tán, kịch tính, thiếu tập trung',
      },
      4: {
        title: 'Người Thực Tế',
        description: 'Kỷ luật, đáng tin cậy, truyền thống',
        positive: 'Chăm chỉ, trung thành, nguyên tắc',
        negative: 'Cứng nhắc, bảo thủ, thiếu linh hoạt',
      },
      5: {
        title: 'Người Tự Do',
        description: 'Linh hoạt, phiêu lưu, thích nghi',
        positive: 'Đa tài, tò mò, dễ thích nghi',
        negative: 'Bồn chồn, thiếu trách nhiệm, bốc đồng',
      },
      6: {
        title: 'Người Yêu Thương',
        description: 'Trách nhiệm, quan tâm, hài hòa',
        positive: 'Ấm áp, vị tha, nghệ thuật',
        negative: 'Bao biện, hay lo lắng, thích kiểm soát',
      },
      7: {
        title: 'Nhà Triết Học',
        description: 'Phân tích, tâm linh, bí ẩn',
        positive: 'Thông thái, trực giác, sâu sắc',
        negative: 'Xa cách, hoài nghi, cô độc',
      },
      8: {
        title: 'Nhà Quản Lý',
        description: 'Tham vọng, quyền lực, vật chất',
        positive: 'Kinh doanh giỏi, tổ chức tốt',
        negative: 'Thực dụng, độc tài, ham vật chất',
      },
      9: {
        title: 'Nhà Nhân Đạo',
        description: 'Vị tha, bao dung, lý tưởng',
        positive: 'Cao cả, nghệ thuật, thông cảm',
        negative: 'Viển vông, dễ tổn thương, hy sinh quá mức',
      },
      11: {
        title: 'Nhà Tâm Linh (Master)',
        description: 'Trực giác siêu phàm, khai sáng',
        positive: 'Cảm xúc sâu sắc, truyền cảm hứng',
        negative: 'Quá nhạy cảm, áp lực tinh thần',
      },
      22: {
        title: 'Kiến Trúc Sư Trưởng (Master)',
        description: 'Xây dựng giấc mơ thành hiện thực',
        positive: 'Tầm nhìn xa, thực tế, quy mô lớn',
        negative: 'Quá tải trách nhiệm, căng thẳng',
      },
      33: {
        title: 'Người Thầy Tâm Linh (Master)',
        description: 'Tình yêu thương vô điều kiện, chữa lành',
        positive: 'Bao dung, truyền cảm hứng, hy sinh',
        negative: 'Quá tải cảm xúc, dễ bị lợi dụng',
      },
    };
  
    if (num === 11 || num === 22 || num === 33) {
      return meanings[num] || meanings[reduceNumber(num)] || meanings[1] || DEFAULT_MEANING;
    }
  
    const reducedNum = reduceNumber(num);
    return meanings[reducedNum] || meanings[1] || DEFAULT_MEANING;
  };
