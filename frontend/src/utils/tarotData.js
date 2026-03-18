/**
 * AstroBunny — Bộ bài Tarot hoàn chỉnh 78 lá (Tiếng Việt)
 * 22 Ẩn Chính (Major Arcana) + 56 Ẩn Phụ (Minor Arcana)
 */

const majorArcana = [
  { id: 0, name: 'Kẻ Ngốc', arcana: 'major', keywords: ['khởi đầu mới', 'ngây thơ', 'tự do', 'phiêu lưu'], uprightMeaning: 'Một khởi đầu mới đang chờ đón bạn. Hãy ôm lấy điều chưa biết với sự hồn nhiên và dũng cảm bước nhảy — vũ trụ đang ủng hộ hành trình của bạn.', reversedMeaning: 'Sự liều lĩnh hoặc nỗi sợ hãi trước điều chưa biết đang kìm hãm bạn. Hãy dừng lại và xem xét liệu bạn đang bốc đồng hay quá thận trọng.' },
  { id: 1, name: 'Nhà Ảo Thuật', arcana: 'major', keywords: ['hiện thực hóa', 'tài năng', 'sức mạnh ý chí', 'hành động'], uprightMeaning: 'Bạn đã có đủ mọi công cụ và tài năng cần thiết. Hãy tập trung ý chí để biến ước mơ thành hiện thực.', reversedMeaning: 'Tiềm năng chưa được khai phá hoặc sự lừa dối. Hãy cẩn thận với những mánh khóe — dù là từ chính bạn hay từ người khác.' },
  { id: 2, name: 'Nữ Tư Tế', arcana: 'major', keywords: ['trực giác', 'bí ẩn', 'tri thức nội tâm', 'tiềm thức'], uprightMeaning: 'Hãy tin vào trực giác và nhìn sâu hơn bề mặt. Câu trả lời nằm bên trong bạn — hãy lắng nghe tiếng nói nội tâm.', reversedMeaning: 'Bạn có thể đang phớt lờ trực giác hoặc giấu kín bí mật. Hãy kết nối lại với trí tuệ bên trong và để sự thật được phơi bày.' },
  { id: 3, name: 'Hoàng Hậu', arcana: 'major', keywords: ['sung túc', 'nuôi dưỡng', 'thiên nhiên', 'sáng tạo'], uprightMeaning: 'Giai đoạn phát triển và dồi dào bao quanh bạn. Hãy chăm sóc các dự án và mối quan hệ — chúng sẽ nở rộ tuyệt đẹp.', reversedMeaning: 'Bế tắc sáng tạo hoặc phụ thuộc quá mức vào người khác. Hãy khôi phục sự cân bằng giữa cho đi và nhận lại.' },
  { id: 4, name: 'Hoàng Đế', arcana: 'major', keywords: ['quyền lực', 'kỷ luật', 'ổn định', 'lãnh đạo'], uprightMeaning: 'Hãy nắm quyền với sự tự tin và thiết lập trật tự. Kỷ luật và tư duy chiến lược sẽ tạo nền tảng vững chắc cho bạn.', reversedMeaning: 'Sự cứng nhắc hoặc độc đoán. Kiểm soát quá mức kìm hãm sự phát triển — hãy nới lỏng và xem xét liệu quyền lực đã trở thành bạo quyền.' },
  { id: 5, name: 'Giáo Hoàng', arcana: 'major', keywords: ['truyền thống', 'tri thức tâm linh', 'dẫn dắt', 'niềm tin'], uprightMeaning: 'Hãy tìm kiếm sự hướng dẫn từ trí tuệ và truyền thống đã được thiết lập. Một người thầy có thể mang đến kiến thức bạn cần lúc này.', reversedMeaning: 'Đặt câu hỏi về quy ước và tự tìm con đường riêng. Hãy thoát khỏi những niềm tin cứng nhắc không còn phục vụ sự phát triển của bạn.' },
  { id: 6, name: 'Đôi Tình Nhân', arcana: 'major', keywords: ['tình yêu', 'hòa hợp', 'lựa chọn', 'kết nối'], uprightMeaning: 'Một mối liên kết ý nghĩa hoặc lựa chọn quan trọng đang ở trước mặt. Hãy theo trái tim nhưng vẫn trung thành với giá trị sâu xa nhất.', reversedMeaning: 'Bất hòa, lệch giá trị, hoặc né tránh lựa chọn khó khăn. Hãy suy ngẫm điều gì thực sự quan trọng trước khi cam kết.' },
  { id: 7, name: 'Cỗ Xe Chiến', arcana: 'major', keywords: ['quyết tâm', 'ý chí', 'chiến thắng', 'kiểm soát'], uprightMeaning: 'Chiến thắng nhờ quyết tâm sắt đá. Hãy kết hợp các lực lượng đối lập, tập trung vào mục tiêu và tiến lên với sự tự tin.', reversedMeaning: 'Thiếu định hướng hoặc hung hăng không mục đích. Bạn có thể đang ép buộc kết quả — hãy lùi lại và điều chỉnh hướng đi.' },
  { id: 8, name: 'Sức Mạnh', arcana: 'major', keywords: ['dũng cảm', 'kiên nhẫn', 'nội lực', 'từ bi'], uprightMeaning: 'Sức mạnh thực sự đến từ bên trong. Hãy đối mặt thử thách với lòng dũng cảm nhẹ nhàng và sự kiên định — sức mạnh mềm chiến thắng bạo lực.', reversedMeaning: 'Tự nghi ngờ hoặc yếu đuối nội tâm. Bạn có thể cảm thấy bất lực, nhưng sức mạnh bạn cần đã có sẵn bên trong — hãy kết nối lại.' },
  { id: 9, name: 'Ẩn Sĩ', arcana: 'major', keywords: ['tìm kiếm nội tâm', 'suy ngẫm', 'cô độc', 'trí tuệ'], uprightMeaning: 'Hãy rút lui khỏi sự ồn ào và tìm câu trả lời bên trong. Đây là thời điểm để suy ngẫm sâu sắc và tìm ánh sáng nội tâm.', reversedMeaning: 'Cô lập quá mức hoặc từ chối nhìn vào bên trong. Hãy cân bằng giữa cô đơn và kết nối — đừng để sự rút lui thành cô độc.' },
  { id: 10, name: 'Vòng Quay Vận Mệnh', arcana: 'major', keywords: ['thay đổi', 'chu kỳ', 'số phận', 'bước ngoặt'], uprightMeaning: 'Vòng quay đang xoay có lợi cho bạn. Hãy đón nhận thay đổi và nhận ra rằng cuộc sống vận hành theo chu kỳ — đây là khoảnh khắc chuyển biến tích cực.', reversedMeaning: 'Kháng cự sự thay đổi không thể tránh hoặc giai đoạn xui xẻo. Hãy nhớ rằng chu kỳ xấu rồi sẽ qua — hãy kiên cường và thích nghi.' },
  { id: 11, name: 'Công Lý', arcana: 'major', keywords: ['sự thật', 'công bằng', 'nhân quả', 'trách nhiệm'], uprightMeaning: 'Sự thật và công bằng sẽ chiến thắng. Hành động của bạn có hậu quả — hãy đưa ra quyết định với sự chính trực và tin rằng công lý sẽ được thực thi.', reversedMeaning: 'Thiếu trung thực hoặc trốn tránh trách nhiệm. Kết quả không công bằng có thể xuất phát từ tư duy thiên lệch. Hãy tìm kiếm sự thật.' },
  { id: 12, name: 'Người Treo Ngược', arcana: 'major', keywords: ['buông bỏ', 'góc nhìn mới', 'hy sinh', 'tạm dừng'], uprightMeaning: 'Hãy buông bỏ sự kiểm soát và nhìn thế giới từ một góc khác. Sự tạm dừng tự nguyện này mang lại hiểu biết sâu sắc và trưởng thành tâm linh.', reversedMeaning: 'Trì hoãn, do dự, hoặc hy sinh không cần thiết. Bạn có thể đang kháng cự sự thay đổi cần thiết — hãy ngừng trì hoãn và hành động.' },
  { id: 13, name: 'Tử Thần', arcana: 'major', keywords: ['chuyển hóa', 'kết thúc', 'tái sinh', 'thay đổi'], uprightMeaning: 'Một sự chuyển hóa mạnh mẽ đang diễn ra. Hãy buông bỏ điều không còn phục vụ bạn — kết thúc mở ra không gian cho những khởi đầu tươi đẹp.', reversedMeaning: 'Kháng cự sự thay đổi cần thiết hoặc sợ buông bỏ. Bám víu vào quá khứ ngăn cản sự tái sinh đang chờ đợi phía bên kia.' },
  { id: 14, name: 'Tiết Chế', arcana: 'major', keywords: ['cân bằng', 'điều độ', 'kiên nhẫn', 'hòa hợp'], uprightMeaning: 'Hãy tìm con đường trung dung và thực hành kiên nhẫn. Pha trộn các lực lượng đối lập thành sự hòa hợp — điều độ và bình tĩnh sẽ dẫn bạn đến mục tiêu.', reversedMeaning: 'Mất cân bằng, thái quá, hoặc thiếu tầm nhìn dài hạn. Hãy sắp xếp lại ưu tiên và khôi phục sự cân bằng trước khi tiến lên.' },
  { id: 15, name: 'Ác Quỷ', arcana: 'major', keywords: ['ràng buộc', 'vật chất', 'bóng tối', 'cám dỗ'], uprightMeaning: 'Hãy xem xét điều gì đang trói buộc bạn — nghiện ngập, thói quen độc hại, hay nỗi ám ảnh vật chất. Nhận thức là bước đầu tiên để giải thoát.', reversedMeaning: 'Giải phóng khỏi xiềng xích. Bạn đang giành lại sức mạnh và buông bỏ những ràng buộc không lành mạnh. Tự do đang trong tầm tay.' },
  { id: 16, name: 'Tháp Sụp Đổ', arcana: 'major', keywords: ['biến động', 'sụp đổ', 'thức tỉnh', 'giải phóng'], uprightMeaning: 'Một biến động bất ngờ lay chuyển nền tảng của bạn. Dù gây sốc, sự phá hủy này dọn đường để xây dựng lại trên nền tảng vững chắc hơn.', reversedMeaning: 'Tránh né thảm họa hoặc kháng cự sự sụp đổ không thể tránh. Trì hoãn khoảnh khắc sụp đổ chỉ kéo dài nỗi đau — hãy đón nhận sự đột phá.' },
  { id: 17, name: 'Ngôi Sao', arcana: 'major', keywords: ['hy vọng', 'niềm tin', 'đổi mới', 'cảm hứng'], uprightMeaning: 'Sau cơn bão đến ngôi sao. Hy vọng được đổi mới, cảm hứng và sự thanh thản tràn ngập tâm hồn bạn. Hãy tin rằng bạn đang đi đúng đường.', reversedMeaning: 'Mất niềm tin hoặc mất kết nối với hy vọng. Bạn có thể cảm thấy thiếu cảm hứng — hãy tìm những nguồn ánh sáng nhỏ để thắp lại tinh thần.' },
  { id: 18, name: 'Mặt Trăng', arcana: 'major', keywords: ['ảo ảnh', 'nỗi sợ', 'tiềm thức', 'trực giác'], uprightMeaning: 'Không phải mọi thứ đều như vẻ bề ngoài. Hãy vượt qua ảo tưởng và nỗi sợ bằng cách tin vào trực giác — tiềm thức chứa đựng thông điệp quan trọng.', reversedMeaning: 'Sự rõ ràng đang dần xuất hiện từ sự bối rối. Nỗi sợ đang được giải phóng và sự thật đang dần lộ ra. Hãy tin vào quá trình.' },
  { id: 19, name: 'Mặt Trời', arcana: 'major', keywords: ['niềm vui', 'thành công', 'sức sống', 'tích cực'], uprightMeaning: 'Niềm vui rạng rỡ và thành công tỏa sáng trên bạn. Đây là thời điểm của sự rõ ràng, ấm áp và lễ hội — hãy mở rộng vòng tay đón cuộc sống.', reversedMeaning: 'Giai đoạn tạm thời thiếu vui vẻ hoặc lạc quan bị che mờ. Mặt trời vẫn chiếu sáng sau những đám mây — đừng đánh mất điều tốt đẹp.' },
  { id: 20, name: 'Phán Xét', arcana: 'major', keywords: ['tái sinh', 'suy ngẫm', 'phán quyết', 'tiếng gọi nội tâm'], uprightMeaning: 'Khoảnh khắc phán quyết và tái sinh. Hãy suy ngẫm về hành trình, lắng nghe tiếng gọi nội tâm và vươn lên để đáp ứng mục đích cao hơn.', reversedMeaning: 'Tự nghi ngờ hoặc từ chối rút kinh nghiệm từ quá khứ. Sự phán xét khắc nghiệt với bản thân cản trở sự phát triển — hãy tha thứ cho chính mình.' },
  { id: 21, name: 'Thế Giới', arcana: 'major', keywords: ['hoàn thành', 'thành tựu', 'trọn vẹn', 'viên mãn'], uprightMeaning: 'Một chu kỳ đến hồi kết tuyệt đẹp. Bạn đã đạt được sự trọn vẹn và hòa hợp — hãy ăn mừng cột mốc này trước khi hành trình tiếp theo bắt đầu.', reversedMeaning: 'Mục tiêu chưa hoàn thành hoặc đi đường tắt. Có điều gì đó còn dang dở — hãy hoàn tất trước khi vội vã bước vào chương tiếp theo.' },
];

const wands = [
  { id: 22, name: 'Át Gậy', arcana: 'minor', suit: 'wands', keywords: ['cảm hứng', 'cơ hội mới', 'tia sáng sáng tạo'], uprightMeaning: 'Một năng lượng sáng tạo bùng nổ khởi động dự án mới. Hãy nắm bắt cơ hội với đam mê và để nhiệt huyết dẫn đường.', reversedMeaning: 'Trì hoãn hoặc thiếu động lực. Tia lửa đang có nhưng bị chặn — hãy dọn dẹp chướng ngại và kết nối lại với đam mê.' },
  { id: 23, name: 'Hai Gậy', arcana: 'minor', suit: 'wands', keywords: ['lên kế hoạch', 'quyết định', 'khám phá'], uprightMeaning: 'Bạn đứng ở ngã rẽ với thế giới trong tay. Hãy lên kế hoạch táo bạo và đưa ra quyết định mở rộng chân trời.', reversedMeaning: 'Nỗi sợ điều chưa biết giữ bạn trong vùng an toàn. Thiếu kế hoạch dẫn đến bỏ lỡ cơ hội.' },
  { id: 24, name: 'Ba Gậy', arcana: 'minor', suit: 'wands', keywords: ['mở rộng', 'tầm nhìn xa', 'tiến triển'], uprightMeaning: 'Kế hoạch của bạn đang thành hình và sự mở rộng đang diễn ra. Hãy nhìn về phía trước với tự tin.', reversedMeaning: 'Trở ngại làm chậm tiến độ. Thất vọng với kết quả chậm — hãy đánh giá lại chiến lược và kiên nhẫn.' },
  { id: 25, name: 'Bốn Gậy', arcana: 'minor', suit: 'wands', keywords: ['lễ hội', 'đoàn tụ', 'hòa hợp'], uprightMeaning: 'Thời điểm ăn mừng vui vẻ và ổn định. Các cột mốc đã đạt được và cộng đồng tụ họp trong hòa hợp.', reversedMeaning: 'Cảm giác không được chào đón hoặc thiếu sự hỗ trợ. Lễ hội có vẻ trống rỗng — hãy giải quyết những căng thẳng ngầm.' },
  { id: 26, name: 'Năm Gậy', arcana: 'minor', suit: 'wands', keywords: ['xung đột', 'cạnh tranh', 'căng thẳng'], uprightMeaning: 'Cạnh tranh lành mạnh thúc đẩy bạn phát triển. Hãy đón nhận thử thách — xung đột có thể là chất xúc tác cho sự cải thiện.', reversedMeaning: 'Né tránh xung đột hoặc bất ổn nội tâm. Căng thẳng bị kìm nén cần được giải quyết trước khi leo thang.' },
  { id: 27, name: 'Sáu Gậy', arcana: 'minor', suit: 'wands', keywords: ['chiến thắng', 'công nhận', 'thành công'], uprightMeaning: 'Sự công nhận và chiến thắng công khai. Nỗ lực của bạn được ghi nhận — hãy tận hưởng thành công với sự khiêm tốn.', reversedMeaning: 'Thiếu sự công nhận hoặc tự hào giả tạo. Thành công thiếu thực chất.' },
  { id: 28, name: 'Bảy Gậy', arcana: 'minor', suit: 'wands', keywords: ['kiên trì', 'phòng thủ', 'giữ vững'], uprightMeaning: 'Hãy đứng vững với niềm tin. Thách thức đến từ mọi phía nhưng vị thế của bạn rất mạnh.', reversedMeaning: 'Cảm giác choáng ngợp hoặc bỏ cuộc quá dễ.' },
  { id: 29, name: 'Tám Gậy', arcana: 'minor', suit: 'wands', keywords: ['hành động nhanh', 'chuyển động', 'đà tiến'], uprightMeaning: 'Mọi thứ đang chuyển động nhanh. Tiến triển mau lẹ — hãy tập trung và tận dụng đà tiến.', reversedMeaning: 'Chậm trễ, bực bội với tốc độ. Hãy chậm lại và đảm bảo bạn đang đi đúng hướng.' },
  { id: 30, name: 'Chín Gậy', arcana: 'minor', suit: 'wands', keywords: ['bền bỉ', 'kiên cường', 'trận chiến cuối'], uprightMeaning: 'Bạn gần đến đích. Hãy dựa vào sự bền bỉ — một cú đẩy cuối cùng sẽ đưa bạn qua.', reversedMeaning: 'Kiệt sức hoặc cố chấp. Hãy biết khi nào cần nghỉ ngơi.' },
  { id: 31, name: 'Mười Gậy', arcana: 'minor', suit: 'wands', keywords: ['gánh nặng', 'trách nhiệm', 'nỗ lực'], uprightMeaning: 'Bạn đang mang gánh nặng lớn. Hãy cân nhắc chia sẻ — bạn không cần làm tất cả một mình.', reversedMeaning: 'Trút bỏ gánh nặng hoặc trốn tránh trách nhiệm.' },
  { id: 32, name: 'Thị Đồng Gậy', arcana: 'minor', suit: 'wands', keywords: ['nhiệt huyết', 'khám phá', 'tự do'], uprightMeaning: 'Tia lửa nhiệt huyết trẻ trung mang đến ý tưởng mới.', reversedMeaning: 'Thiếu định hướng hoặc năng lượng bất ổn.' },
  { id: 33, name: 'Hiệp Sĩ Gậy', arcana: 'minor', suit: 'wands', keywords: ['năng lượng', 'đam mê', 'phiêu lưu'], uprightMeaning: 'Xông pha với đam mê cháy bỏng và dũng cảm.', reversedMeaning: 'Bốc đồng hoặc kiệt sức do hành động liều lĩnh.' },
  { id: 34, name: 'Nữ Hoàng Gậy', arcana: 'minor', suit: 'wands', keywords: ['tự tin', 'quyết đoán', 'ấm áp'], uprightMeaning: 'Tỏa sáng tự tin và truyền cảm hứng cho người khác.', reversedMeaning: 'Bất an ẩn sau vẻ ngoài mạnh mẽ.' },
  { id: 35, name: 'Quốc Vương Gậy', arcana: 'minor', suit: 'wands', keywords: ['lãnh đạo', 'tầm nhìn', 'doanh nhân'], uprightMeaning: 'Dẫn dắt bằng tầm nhìn và sức hút. Tinh thần lãnh đạo táo bạo truyền cảm hứng cho mọi người.', reversedMeaning: 'Lãnh đạo chuyên quyền hoặc kỳ vọng phi thực tế.' },
];

const cups = [
  { id: 36, name: 'Át Cốc', arcana: 'minor', suit: 'cups', keywords: ['tình yêu mới', 'thức tỉnh cảm xúc', 'từ bi'], uprightMeaning: 'Chiếc cốc tràn đầy cảm xúc mang đến tình yêu mới hoặc kết nối tâm linh sâu sắc.', reversedMeaning: 'Trống rỗng cảm xúc hoặc cảm xúc bị kìm nén.' },
  { id: 37, name: 'Hai Cốc', arcana: 'minor', suit: 'cups', keywords: ['đối tác', 'kết hợp', 'hấp dẫn lẫn nhau'], uprightMeaning: 'Một mối quan hệ đẹp hình thành qua sự tôn trọng và hấp dẫn lẫn nhau.', reversedMeaning: 'Mối quan hệ mất cân bằng hoặc lòng tin bị phá vỡ.' },
  { id: 38, name: 'Ba Cốc', arcana: 'minor', suit: 'cups', keywords: ['ăn mừng', 'tình bạn', 'cộng đồng'], uprightMeaning: 'Tụ họp bạn bè và ăn mừng. Cộng đồng và niềm vui chung nâng cao tinh thần.', reversedMeaning: 'Cô lập xã hội hoặc quá đà.' },
  { id: 39, name: 'Bốn Cốc', arcana: 'minor', suit: 'cups', keywords: ['thờ ơ', 'suy tư', 'không hài lòng'], uprightMeaning: 'Rút lui cảm xúc và suy tư. Có thể đang bỏ lỡ cơ hội ngay trước mắt.', reversedMeaning: 'Động lực được đổi mới. Sẵn sàng tái tham gia cuộc sống.' },
  { id: 40, name: 'Năm Cốc', arcana: 'minor', suit: 'cups', keywords: ['mất mát', 'đau buồn', 'hối tiếc'], uprightMeaning: 'Nỗi đau về những gì đã mất che phủ những gì còn lại. Hãy cho phép bản thân thương tiếc.', reversedMeaning: 'Chấp nhận và tiến lên. Quá trình chữa lành bắt đầu.' },
  { id: 41, name: 'Sáu Cốc', arcana: 'minor', suit: 'cups', keywords: ['hoài niệm', 'hồn nhiên', 'ký ức tuổi thơ'], uprightMeaning: 'Những ký ức ngọt ngào và niềm vui hồn nhiên trỗi dậy.', reversedMeaning: 'Sống trong quá khứ hoặc từ chối trưởng thành.' },
  { id: 42, name: 'Bảy Cốc', arcana: 'minor', suit: 'cups', keywords: ['ảo tưởng', 'lựa chọn', 'mơ mộng'], uprightMeaning: 'Nhiều lựa chọn và giấc mơ làm mờ tầm nhìn. Hãy phân biệt ảo tưởng với thực tế.', reversedMeaning: 'Sự rõ ràng xuyên qua ảo tưởng.' },
  { id: 43, name: 'Tám Cốc', arcana: 'minor', suit: 'cups', keywords: ['rời bỏ', 'tìm kiếm sự thật', 'vỡ mộng'], uprightMeaning: 'Bạn dũng cảm rời bỏ điều không còn thỏa mãn.', reversedMeaning: 'Sợ rời bỏ quen thuộc hoặc lang thang vô mục đích.' },
  { id: 44, name: 'Chín Cốc', arcana: 'minor', suit: 'cups', keywords: ['ước mơ thành hiện thực', 'mãn nguyện', 'hài lòng'], uprightMeaning: 'Ước mơ của bạn đang thành hiện thực. Sự mãn nguyện tràn đầy.', reversedMeaning: 'Hạnh phúc hời hợt hoặc ước mơ chưa thành.' },
  { id: 45, name: 'Mười Cốc', arcana: 'minor', suit: 'cups', keywords: ['hòa thuận', 'gia đình', 'viên mãn cảm xúc'], uprightMeaning: 'Sự viên mãn cảm xúc tối thượng — gia đình yêu thương và hạnh phúc lâu dài.', reversedMeaning: 'Bất hòa gia đình hoặc giấc mơ hạnh phúc tan vỡ.' },
  { id: 46, name: 'Thị Đồng Cốc', arcana: 'minor', suit: 'cups', keywords: ['cơ hội sáng tạo', 'thông điệp trực giác', 'tò mò'], uprightMeaning: 'Một thông điệp thú vị hoặc cảm hứng sáng tạo xuất hiện.', reversedMeaning: 'Thiếu chín chắn cảm xúc hoặc bế tắc sáng tạo.' },
  { id: 47, name: 'Hiệp Sĩ Cốc', arcana: 'minor', suit: 'cups', keywords: ['lãng mạn', 'quyến rũ', 'trí tưởng tượng'], uprightMeaning: 'Năng lượng lãng mạn và giàu trí tưởng tượng tràn vào.', reversedMeaning: 'Kỳ vọng phi thực tế hoặc thất thường.' },
  { id: 48, name: 'Nữ Hoàng Cốc', arcana: 'minor', suit: 'cups', keywords: ['từ bi', 'nuôi dưỡng', 'trực giác'], uprightMeaning: 'Lòng từ bi sâu sắc và trí tuệ trực giác dẫn đường.', reversedMeaning: 'Phụ thuộc cảm xúc hoặc hy sinh bản thân.' },
  { id: 49, name: 'Quốc Vương Cốc', arcana: 'minor', suit: 'cups', keywords: ['cân bằng cảm xúc', 'rộng lượng', 'ngoại giao'], uprightMeaning: 'Bậc thầy cảm xúc dẫn dắt bằng lòng từ bi và trí tuệ.', reversedMeaning: 'Thao túng cảm xúc hoặc biến động ẩn dưới vẻ bình tĩnh.' },
];

const swords = [
  { id: 50, name: 'Át Kiếm', arcana: 'minor', suit: 'swords', keywords: ['minh mẫn', 'đột phá', 'sự thật'], uprightMeaning: 'Một đột phá trí tuệ mạnh mẽ xuyên qua sự bối rối.', reversedMeaning: 'Phán đoán mờ mịt hoặc lạm dụng trí tuệ.' },
  { id: 51, name: 'Hai Kiếm', arcana: 'minor', suit: 'swords', keywords: ['quyết định khó', 'bế tắc', 'né tránh'], uprightMeaning: 'Một lựa chọn khó khăn đòi hỏi sự chú ý. Né tránh chỉ kéo dài căng thẳng.', reversedMeaning: 'Thông tin mới giúp đưa ra quyết định. Bế tắc được phá vỡ.' },
  { id: 52, name: 'Ba Kiếm', arcana: 'minor', suit: 'swords', keywords: ['đau lòng', 'nỗi buồn', 'sự thật đau đớn'], uprightMeaning: 'Một sự thật đau đớn xuyên thấu trái tim. Hãy cho phép bản thân đau buồn.', reversedMeaning: 'Bắt đầu phục hồi từ nỗi đau lòng.' },
  { id: 53, name: 'Bốn Kiếm', arcana: 'minor', suit: 'swords', keywords: ['nghỉ ngơi', 'phục hồi', 'suy tư'], uprightMeaning: 'Nghỉ ngơi không phải lười biếng — đó là sự chuẩn bị.', reversedMeaning: 'Bồn chồn hoặc kiệt sức do từ chối nghỉ ngơi.' },
  { id: 54, name: 'Năm Kiếm', arcana: 'minor', suit: 'swords', keywords: ['xung đột', 'thất bại', 'chiến thắng cay đắng'], uprightMeaning: 'Trận chiến thắng với cái giá quá cao.', reversedMeaning: 'Mong muốn hòa giải sau xung đột.' },
  { id: 55, name: 'Sáu Kiếm', arcana: 'minor', suit: 'swords', keywords: ['chuyển tiếp', 'buông bỏ', 'vùng nước lặng'], uprightMeaning: 'Bạn đang rời khỏi bão tố hướng về vùng nước bình lặng hơn.', reversedMeaning: 'Kháng cự tiến lên hoặc hành lý chưa giải quyết.' },
  { id: 56, name: 'Bảy Kiếm', arcana: 'minor', suit: 'swords', keywords: ['lừa dối', 'chiến lược', 'bí mật'], uprightMeaning: 'Chiến lược khôn ngoan cần thiết, nhưng cẩn thận với sự lừa dối.', reversedMeaning: 'Bí mật bị phơi bày hoặc thú nhận.' },
  { id: 57, name: 'Tám Kiếm', arcana: 'minor', suit: 'swords', keywords: ['hạn chế', 'tự giam', 'bế tắc'], uprightMeaning: 'Bạn cảm thấy bị giam cầm, nhưng nhà tù phần lớn do chính bạn tạo ra.', reversedMeaning: 'Phá vỡ niềm tin giới hạn. Bước ra khỏi lồng.' },
  { id: 58, name: 'Chín Kiếm', arcana: 'minor', suit: 'swords', keywords: ['lo âu', 'ác mộng', 'bất an'], uprightMeaning: 'Lo âu và suy nghĩ đen tối quấy rầy sự bình yên. Nỗi sợ có thể tồi tệ hơn thực tế.', reversedMeaning: 'Bắt đầu đối phó với lo âu.' },
  { id: 59, name: 'Mười Kiếm', arcana: 'minor', suit: 'swords', keywords: ['kết thúc', 'đáy vực', 'bình minh mới'], uprightMeaning: 'Bạn đã chạm đáy — nhưng con đường duy nhất giờ là đi lên.', reversedMeaning: 'Phục hồi từ sự tàn phá. Bình minh theo sau đêm tối nhất.' },
  { id: 60, name: 'Thị Đồng Kiếm', arcana: 'minor', suit: 'swords', keywords: ['tò mò', 'nhanh nhạy', 'cảnh giác'], uprightMeaning: 'Tâm trí sắc bén, tò mò sẵn sàng khám phá ý tưởng mới.', reversedMeaning: 'Lời nói vội vàng hoặc nói mà không làm.' },
  { id: 61, name: 'Hiệp Sĩ Kiếm', arcana: 'minor', suit: 'swords', keywords: ['tham vọng', 'tư duy nhanh', 'quyết đoán'], uprightMeaning: 'Xông pha với sự mãnh liệt trí tuệ. Tham vọng dọn đường.', reversedMeaning: 'Vội vàng liều lĩnh hoặc đốt cầu.' },
  { id: 62, name: 'Nữ Hoàng Kiếm', arcana: 'minor', suit: 'swords', keywords: ['giao tiếp rõ ràng', 'độc lập', 'sáng suốt'], uprightMeaning: 'Nhìn xuyên ảo tưởng với sự sáng suốt sắc bén.', reversedMeaning: 'Lạnh lùng xa cách hoặc chỉ trích quá mức.' },
  { id: 63, name: 'Quốc Vương Kiếm', arcana: 'minor', suit: 'swords', keywords: ['quyền lực trí tuệ', 'sự thật', 'lãnh đạo đạo đức'], uprightMeaning: 'Dẫn dắt bằng sự minh mẫn trí tuệ và niềm tin đạo đức.', reversedMeaning: 'Lạm dụng sức mạnh trí tuệ hoặc hùng biện thao túng.' },
];

const pentacles = [
  { id: 64, name: 'Át Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['cơ hội mới', 'thịnh vượng', 'hiện thực hóa'], uprightMeaning: 'Cơ hội vàng cho sự phát triển tài chính xuất hiện.', reversedMeaning: 'Bỏ lỡ cơ hội hoặc kế hoạch tài chính kém.' },
  { id: 65, name: 'Hai Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['cân bằng', 'thích nghi', 'ưu tiên'], uprightMeaning: 'Bạn tung hứng nhiều ưu tiên với kỹ năng và sự khéo léo.', reversedMeaning: 'Choáng ngợp bởi quá nhiều trách nhiệm.' },
  { id: 66, name: 'Ba Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['làm việc nhóm', 'tay nghề', 'hợp tác'], uprightMeaning: 'Kỹ năng của bạn được công nhận trong nhóm. Nỗ lực hợp tác mang lại kết quả xuất sắc.', reversedMeaning: 'Thiếu tinh thần đồng đội hoặc chất lượng kém.' },
  { id: 67, name: 'Bốn Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['an toàn', 'bảo tồn', 'kiểm soát'], uprightMeaning: 'An ninh tài chính qua quản lý cẩn thận.', reversedMeaning: 'Tham lam, quá chú trọng vật chất, hoặc sợ mất mát.' },
  { id: 68, name: 'Năm Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['khó khăn tài chính', 'thiếu thốn', 'cô lập'], uprightMeaning: 'Giai đoạn khó khăn tài chính. Sự giúp đỡ luôn có — bạn chỉ cần tìm kiếm.', reversedMeaning: 'Phục hồi từ mất mát tài chính. Nguồn lực mới xuất hiện.' },
  { id: 69, name: 'Sáu Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['rộng lượng', 'chia sẻ', 'cho và nhận'], uprightMeaning: 'Sự rộng lượng tuôn chảy theo cả hai hướng. Hãy chia sẻ sự dồi dào.', reversedMeaning: 'Sự hào phóng có điều kiện hoặc mất cân bằng quyền lực.' },
  { id: 70, name: 'Bảy Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['kiên nhẫn', 'đầu tư', 'tầm nhìn dài hạn'], uprightMeaning: 'Khoản đầu tư kiên nhẫn của bạn đang dần đơm hoa. Hãy tin vào quá trình.', reversedMeaning: 'Thiếu kiên nhẫn với kết quả chậm.' },
  { id: 71, name: 'Tám Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['kỹ năng', 'tay nghề', 'siêng năng'], uprightMeaning: 'Sự cống hiến cho nghề mang lại sự thành thạo.', reversedMeaning: 'Cầu toàn hoặc nhàm chán. Hãy tìm thử thách mới.' },
  { id: 72, name: 'Chín Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['xa hoa', 'tự lập', 'thành tựu'], uprightMeaning: 'Bạn đã xây dựng cuộc sống thoải mái bằng chính nỗ lực. Hãy tận hưởng thành quả.', reversedMeaning: 'Phụ thuộc quá mức vào tiện nghi vật chất.' },
  { id: 73, name: 'Mười Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['giàu có', 'di sản', 'thịnh vượng gia đình'], uprightMeaning: 'Sự giàu có bền vững và di sản gia đình. Nỗ lực của bạn tạo an ninh vượt xa bản thân.', reversedMeaning: 'Tranh chấp tài chính gia đình hoặc mất di sản.' },
  { id: 74, name: 'Thị Đồng Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['tham vọng', 'học hỏi', 'dự án mới'], uprightMeaning: 'Người học trò háo hức sẵn sàng học hỏi và phát triển.', reversedMeaning: 'Thiếu tập trung hoặc trì hoãn.' },
  { id: 75, name: 'Hiệp Sĩ Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['chăm chỉ', 'kỷ luật', 'trách nhiệm'], uprightMeaning: 'Nỗ lực đều đặn, đáng tin cậy đưa bạn đến mục tiêu.', reversedMeaning: 'Trì trệ, lười biếng, hoặc cầu toàn ám ảnh.' },
  { id: 76, name: 'Nữ Hoàng Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['nuôi dưỡng sung túc', 'chăm sóc thực tế', 'gia đình'], uprightMeaning: 'Tạo môi trường ấm áp, dồi dào cho bản thân và người thân.', reversedMeaning: 'Bỏ bê bản thân vì theo đuổi vật chất.' },
  { id: 77, name: 'Quốc Vương Tiền', arcana: 'minor', suit: 'pentacles', keywords: ['giàu có', 'nhạy bén kinh doanh', 'lãnh đạo vững vàng'], uprightMeaning: 'Bậc thầy thế giới vật chất xây dựng đế chế bằng kiên nhẫn và trí tuệ.', reversedMeaning: 'Tham lam, nghiện công việc, hoặc liều lĩnh tài chính.' },
];

export const allCards = [...majorArcana, ...wands, ...cups, ...swords, ...pentacles];

// Xào bài và rút 3 lá ngẫu nhiên
export const drawThreeCards = () => {
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  const positions = ['past', 'present', 'future'];
  return shuffled.slice(0, 3).map((card, i) => ({
    card,
    reversed: Math.random() < 0.3, // 30% cơ hội lá ngược
    position: positions[i],
    flipped: false,
  }));
};

// Tổng hợp lời khuyên chung dựa trên 3 lá
export const generateSynthesis = (drawnCards) => {
  const majorCount = drawnCards.filter(d => d.card.arcana === 'major').length;
  const reversedCount = drawnCards.filter(d => d.reversed).length;

  let energy = '';
  if (majorCount >= 2) energy = 'Năng lượng rất mạnh mẽ từ các lá Ẩn Chính đang chi phối vận mệnh của bạn. Đây là giai đoạn bước ngoặt quan trọng.';
  else if (majorCount === 1) energy = 'Sự kết hợp giữa Ẩn Chính và Ẩn Phụ cho thấy một sự kiện quan trọng đang ảnh hưởng đến cuộc sống hàng ngày.';
  else energy = 'Các lá Ẩn Phụ cho thấy những ảnh hưởng thực tế trong cuộc sống hàng ngày đang chiếm ưu thế.';

  let mood = '';
  if (reversedCount === 0) mood = 'Tất cả các lá đều thuận, cho thấy năng lượng tích cực và thuận lợi đang bao quanh bạn.';
  else if (reversedCount === 1) mood = 'Có một lá ngược cho thấy một khía cạnh cần được chú ý và cải thiện trong khi các mặt khác đang thuận lợi.';
  else if (reversedCount === 2) mood = 'Hai lá ngược báo hiệu những thử thách đáng kể cần sự chú ý đặc biệt và nỗ lực vượt qua.';
  else mood = 'Ba lá ngược cho thấy giai đoạn nhiều biến động — nhưng hãy nhớ rằng mỗi thử thách là cơ hội để trưởng thành.';

  return {
    energy,
    mood,
    advice: 'Hãy suy ngẫm về thông điệp của từng lá bài trong bối cảnh cuộc sống hiện tại. Tarot không quyết định tương lai — mà soi sáng những lựa chọn trước mắt bạn.'
  };
};
