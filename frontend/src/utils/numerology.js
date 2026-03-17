/**
 * AstroBunny Numerology Utility Functions
 * Based on Pythagorean Numerology Principles
 */

// Helper: Rút gọn một số về 1-9, giữ lại Master Numbers (11, 22, 33) nếu cho phép
export const reduceNumber = (num, keepMaster = true) => {
  if (keepMaster && (num === 11 || num === 22 || num === 33)) return num;
  let result = num;
  while (result > 9) {
    if (keepMaster && (result === 11 || result === 22 || result === 33)) return result;
    result = result
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return result;
};

// Helper: Rút gọn số KHÔNG giữ Master Numbers (dùng cho tính Thử Thách)
export const reduceToSingleDigit = (num) => {
  return reduceNumber(num, false);
};

// Phân tách ngày sinh
const parseDate = (dateString) => {
  if (!dateString) return { day: 0, month: 0, year: 0 };
  const [year, month, day] = dateString.split('-').map(Number);
  return { day, month, year };
};

// 1. Chỉ số Đường Đời (Life Path)
// Theo Pitago: Rút gọn ngày, tháng, năm riêng, rồi cộng lại và rút gọn
export const calculateLifePath = (date) => {
  const { day, month, year } = parseDate(date);
  if (!day || !month || !year) return 0;
  
  const sum = reduceNumber(day) + reduceNumber(month) + reduceNumber(year);
  return reduceNumber(sum);
};

// 2. Chỉ số Ngày Sinh (Birth Day)
export const calculateBirthDay = (date) => {
  const { day } = parseDate(date);
  if (!day) return 0;
  return reduceNumber(day);
};

// 3. Chỉ số Thái Độ (Attitude)
export const calculateAttitude = (date) => {
  const { day, month } = parseDate(date);
  if (!day || !month) return 0;
  return reduceNumber(day + month);
};

/* LÝ THUYẾT TÍNH TOÁN TÊN */
const getLetterValue = (char) => {
  const code = char.toLowerCase().charCodeAt(0);
  if (code >= 97 && code <= 122) { // a-z
    return reduceToSingleDigit(code - 96);
  }
  return 0;
};

// Tách nguyên âm và phụ âm (xử lý chữ Y chuẩn Pitago)
// Y là nguyên âm nếu xung quanh nó KHÔNG có nguyên âm nào khác trong âm tiết,
// Hoặc đơn giản hóa: Nếu đứng cạnh nguyên âm khác (VD: Nguyen) thì Y là phụ âm, nếu đứng tách biệt (VD: Vy) là nguyên âm.
const splitVowelsAndConsonants = (name) => {
  const cleanName = name.toLowerCase().replace(/[^a-z\s]/g, '');
  const words = cleanName.split(/\s+/);
  
  const vowels = [];
  const consonants = [];
  const numbers = []; // lưu cả mảng số để tìm thiếu/đam mê

  const basicVowels = ['a', 'e', 'i', 'o', 'u'];

  words.forEach(word => {
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const val = getLetterValue(char);
      if (val === 0) continue;
      
      numbers.push(val);

      if (basicVowels.includes(char)) {
        vowels.push(val);
      } else if (char === 'y') {
        // Kiểm tra Y: Nếu trước và sau không phải basic vowel => Y là nguyên âm
        const prev = i > 0 ? word[i-1] : '';
        const next = i < word.length - 1 ? word[i+1] : '';
        if (basicVowels.includes(prev) || basicVowels.includes(next)) {
          consonants.push(val); // Y là phụ âm
        } else {
          vowels.push(val); // Y là nguyên âm
        }
      } else {
        consonants.push(val);
      }
    }
  });

  return { vowels, consonants, numbers };
};

// 4. Chỉ số Sứ Mệnh (Destiny/Expression)
export const calculateDestiny = (name) => {
  if (!name) return 0;
  const { numbers } = splitVowelsAndConsonants(name);
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return reduceNumber(sum);
};

// 5. Chỉ số Linh Hồn (Soul Urge)
export const calculateSoulUrge = (name) => {
  if (!name) return 0;
  const { vowels } = splitVowelsAndConsonants(name);
  const sum = vowels.reduce((acc, val) => acc + val, 0);
  return reduceNumber(sum);
};

// 6. Chỉ số Nhân Cách (Personality)
export const calculatePersonality = (name) => {
  if (!name) return 0;
  const { consonants } = splitVowelsAndConsonants(name);
  const sum = consonants.reduce((acc, val) => acc + val, 0);
  return reduceNumber(sum);
};

// 7. Chỉ số Trưởng Thành (Maturity)
export const calculateMaturity = (lifePath, destiny) => {
  if (!lifePath || !destiny) return 0;
  return reduceNumber(lifePath + destiny);
};

// 8. Số Thiếu (Karmic Lessons)
export const calculateMissingNumbers = (name) => {
  if (!name) return [];
  const { numbers } = splitVowelsAndConsonants(name);
  const missing = [];
  for (let i = 1; i <= 9; i++) {
    if (!numbers.includes(i)) {
      missing.push(i);
    }
  }
  return missing;
};

// 9. Đam Mê Ẩn Giấu (Hidden Passion)
export const calculateHiddenPassion = (name) => {
  if (!name) return [];
  const { numbers } = splitVowelsAndConsonants(name);
  const counts = {};
  numbers.forEach(n => counts[n] = (counts[n] || 0) + 1);
  
  let maxCount = 0;
  for (let num in counts) {
    if (counts[num] > maxCount) maxCount = counts[num];
  }
  
  const passions = [];
  for (let num in counts) {
    if (counts[num] === maxCount && maxCount > 1) passions.push(parseInt(num));
  }
  return passions;
};

// 10. Đỉnh Cao Cuộc Đời & Thử Thách (Pinnacles & Challenges)
export const calculateCycles = (date) => {
  const { day, month, year } = parseDate(date);
  if (!day || !month || !year) return null;

  const rDay = reduceToSingleDigit(day);
  const rMonth = reduceToSingleDigit(month);
  const rYear = reduceToSingleDigit(year);

  // Pinnacles (Đỉnh cao - Có thể giữ Master, nhưng thường rút gọn 1-9, ta sẽ giữ Master)
  const pin1 = reduceNumber(rMonth + rDay);
  const pin2 = reduceNumber(rDay + rYear);
  const pin3 = reduceNumber(pin1 + pin2);
  const pin4 = reduceNumber(rMonth + rYear);

  // Challenges (Thử thách - Luôn là Single Digit, phép trừ tuyệt đối)
  const chal1 = Math.abs(rMonth - rDay);
  const chal2 = Math.abs(rDay - rYear);
  const chal3 = Math.abs(chal1 - chal2);
  const chal4 = Math.abs(rMonth - rYear);

  // Tính Tuổi Đỉnh Cao Đầu Tiên: 36 - LifePath
  const lifePath = calculateLifePath(date);
  const firstPeakAge = 36 - reduceToSingleDigit(lifePath);
  
  return {
    pinnacles: [pin1, pin2, pin3, pin4],
    challenges: [chal1, chal2, chal3, chal4],
    ages: [
      firstPeakAge,
      firstPeakAge + 9,
      firstPeakAge + 18,
      firstPeakAge + 27
    ]
  };
};

// Xây dựng Mảng 2D cho Biểu Đồ Ngày Sinh (1-9 Grid)
export const generateBirthChart = (date) => {
  const dateStr = date.replace(/-/g, '').replace(/0/g, '');
  const digits = dateStr.split('').map(Number);
  
  // Grid 3x3 array: [1,2,3], [4,5,6], [7,8,9]
  const grid = {
    1: 0, 2: 0, 3: 0,
    4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0
  };
  
  digits.forEach(d => {
    if (grid[d] !== undefined) grid[d]++;
  });
  return grid;
};

// Tổng hợp tất cả hàm để xuất ra 1 Object khổng lồ
export const generateFullReport = (fullName, birthDate) => {
  const lifePath = calculateLifePath(birthDate);
  const destiny = calculateDestiny(fullName);
  const soulUrge = calculateSoulUrge(fullName);
  const personality = calculatePersonality(fullName);
  
  return {
    lifePath,
    destiny,
    soulUrge,
    personality,
    maturity: calculateMaturity(lifePath, destiny),
    attitude: calculateAttitude(birthDate),
    birthDay: calculateBirthDay(birthDate),
    missingNumbers: calculateMissingNumbers(fullName),
    hiddenPassion: calculateHiddenPassion(fullName),
    cycles: calculateCycles(birthDate),
    birthChart: generateBirthChart(birthDate)
  };
};
