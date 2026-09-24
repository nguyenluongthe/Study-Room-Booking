const fs = require('fs');
const path = require('path');

const roomImages = {
  lab: [
    'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80'
  ],
  library: [
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507842229451-7f01be837453?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80'
  ],
  study_pod: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80'
  ],
  conference: [
    'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80'
  ]
};

const rooms = [];
let idCounter = 1;

function pad(num) {
  return String(num).padStart(3, '0');
}

// 1. KHU K: 30 phòng (Khu Kỹ thuật & CNTT VKU)
const khuKDefs = [
  { name: 'Lab Vi mạch Bán dẫn Samsung K.205', floor: 'Tầng 2', cap: 36, type: 'lab', am: ['Phòng sạch Cleanroom', 'Trạm vi mạch FPGA', 'Dao động ký số', 'Máy lạnh Inverter', 'Wi-Fi 6 VKU'], desc: 'Phòng thực hành thiết kế vi mạch bán dẫn trọng điểm hợp tác cùng đối tác công nghệ Hàn Quốc.', rating: 4.98 },
  { name: 'Lab Trí tuệ Nhân tạo & Big Data K.302', floor: 'Tầng 3', cap: 40, type: 'lab', am: ['Cụm GPU NVIDIA RTX A6000', 'Máy trạm Deep Learning', 'Màn hình tương tác 85"', 'Điều hòa 2 chiều'], desc: 'Phòng Lab nghiên cứu AI, thị giác máy tính và phân tích dữ liệu lớn phục vụ sinh viên & giảng viên VKU.', rating: 4.96 },
  { name: 'Lab An toàn Thông tin & Cyber Security K.401', floor: 'Tầng 4', cap: 35, type: 'lab', am: ['Server mạng riêng biệt', 'Tường lửa thế hệ mới', 'Hệ thống CTF Challenge', 'Dual Monitor'], desc: 'Phòng thực hành tác chiến an toàn không gian mạng và phân tích mã độc.', rating: 4.92 },
  { name: 'Lab IoT & Hệ thống Nhúng K.204', floor: 'Tầng 2', cap: 32, type: 'lab', am: ['Kit ARM Cortex & ESP32', 'Trạm hàn khò SMD', 'Cảm biến công nghiệp', 'Máy in 3D'], desc: 'Không gian thực hành Internet vạn vật, vi điều khiển và thiết bị thông minh.', rating: 4.88 },
  { name: 'Lab Mạng Máy tính Cisco & Cloud K.305', floor: 'Tầng 3', cap: 36, type: 'lab', am: ['Router/Switch Cisco chuẩn quốc tế', 'Rack server mô phỏng', 'Cáp quang tốc độ cao', 'Máy chiếu Sony'], desc: 'Phòng thực hành quản trị mạng máy tính theo chuẩn CCNA/CCNP quốc tế.', rating: 4.85 },
  { name: 'Lab Công nghệ Phần mềm K.301', floor: 'Tầng 3', cap: 42, type: 'lab', am: ['Máy trạm Core i7 32GB RAM', 'Dual Boot Ubuntu/Windows', 'Git server nội bộ', 'Bảng từ kính'], desc: 'Phòng thực hành chuyên môn lập trình Fullstack, Mobile App và kỹ nghệ phần mềm.', rating: 4.9 },
  { name: 'Lab Đồ họa & Game Dev K.104', floor: 'Tầng 1', cap: 30, type: 'lab', am: ['Card đồ họa RTX 4080', 'Bảng vẽ Wacom Pro', 'Kính thực tế ảo VR Meta Quest', 'Màn hình 4K HDR'], desc: 'Phòng thực hành thiết kế đồ họa kỹ thuật số, kỹ xảo VFX và phát triển Game Unity/Unreal.', rating: 4.94 },
  { name: 'Lab Robotics & Tự động hóa K.206', floor: 'Tầng 2', cap: 28, type: 'lab', am: ['Cánh tay Robot công nghiệp', 'Bộ KIT xe tự hành ROS', 'Bàn thí nghiệm khí nén', 'Máy khắc laser'], desc: 'Phòng nghiên cứu robot di động thông minh và cánh tay robot tự động hóa.', rating: 4.89 },
  { name: 'Studio Livestream & E-Learning K.108', floor: 'Tầng 1', cap: 12, type: 'lab', am: ['Phông xanh Chromakey', 'Hệ thống đèn quay phim Softbox', 'Micro Shure SM7B', 'Blackmagic ATEM Mini'], desc: 'Phòng ghi hình bài giảng số, podcast học thuật và livestream sự kiện trường VKU.', rating: 4.91 },
  { name: 'Phòng Hội đồng Khoa học K.501', floor: 'Tầng 5', cap: 25, type: 'conference', am: ['Micro cổ ngỗng đa kênh', 'Hệ thống truyền hình hội nghị Polycom', 'Màn hình LED P2', 'Bàn họp oval cao cấp'], desc: 'Phòng họp chuyên biệt dành cho bảo vệ luận văn thạc sĩ, hội đồng nghiên cứu khoa học cấp viện.', rating: 4.95 }
];

// Thêm các phòng học thông minh Khu K cho đủ 30 phòng
for (let i = 0; i < 20; i++) {
  const floorNum = Math.floor(i / 5) + 1;
  const roomNum = `K.${floorNum}0${(i % 5) + 1}`;
  const isLab = i % 4 === 0;
  khuKDefs.push({
    name: isLab ? `Lab Máy tính Thực hành ${roomNum}` : `Smart Room ${roomNum}`,
    floor: `Tầng ${floorNum}`,
    cap: isLab ? 35 : 45,
    type: isLab ? 'lab' : 'conference',
    am: isLab 
      ? ['Máy tính để bàn Core i5', 'Wi-Fi 6 VKU', 'Điều hòa 2 chiều', 'Máy chiếu Full HD', 'Bảng viết dạ']
      : ['Smartboard 75 inch tương tác', 'Micro không dây', 'Âm thanh vòm', 'Điều hòa trung tâm', 'Bàn ghế modul di động'],
    desc: isLab
      ? `Phòng thực hành máy tính ${roomNum} trang bị đầy đủ phần mềm học tập của sinh viên VKU.`
      : `Phòng học thông minh ${roomNum} được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.`,
    rating: Number((4.6 + Math.random() * 0.38).toFixed(2))
  });
}

khuKDefs.forEach((def, idx) => {
  const imgPool = roomImages[def.type] || roomImages.lab;
  rooms.push({
    id: `vku-room-${pad(idCounter++)}`,
    name: def.name,
    building: 'Khu K (Kỹ thuật & CNTT)',
    floor: def.floor,
    capacity: def.cap,
    type: def.type,
    imageUrl: imgPool[idx % imgPool.length],
    amenities: def.am,
    description: def.desc,
    rating: def.rating,
    status: (idx % 4 === 1 || idx % 7 === 0) ? 'Occupied' : 'Available'
  });
});

// 2. KHU V: 30 phòng (Khu Giảng đường chính VKU - V.A, V.B, V.C)
const khuVBlocks = ['V.A', 'V.B', 'V.C'];
for (let i = 0; i < 30; i++) {
  const block = khuVBlocks[Math.floor(i / 10)];
  const floor = (i % 4) + 1;
  const roomCode = `${block}${(floor * 100) + (i % 6) + 1}`;
  const isLectureHall = i % 5 === 0;
  const isSmartClass = i % 3 === 0;

  const type = isLectureHall ? 'conference' : isSmartClass ? 'conference' : 'conference';
  const cap = isLectureHall ? 120 : isSmartClass ? 50 : 60;
  const name = isLectureHall 
    ? `Giảng đường Bậc thang ${roomCode}`
    : isSmartClass
    ? `Smart Classroom VKU ${roomCode}`
    : `Phòng học Giảng đường ${roomCode}`;

  const am = isLectureHall
    ? ['Hệ thống âm thanh hội trường', '2 Máy chiếu công suất lớn', 'Bàn ghế bậc thang', 'Máy lạnh 50.000 BTU', 'Micro trợ giảng']
    : isSmartClass
    ? ['Màn hình cảm ứng tương tác 86"', 'Bàn ghế học nhóm linh hoạt', 'Wi-Fi 6 VKU Edu', 'Hệ thống camera AI theo dõi', 'Điều hòa Inverter']
    : ['Máy chiếu Panasonic siêu nét', 'Bảng từ xanh chống lóa', 'Quạt trần & Điều hòa', 'Bục giảng điện tử', 'Hệ thống loa trợ giảng'];

  const imgPool = roomImages.conference;
  rooms.push({
    id: `vku-room-${pad(idCounter++)}`,
    name,
    building: 'Khu V (Giảng đường chính)',
    floor: `Tầng ${floor}`,
    capacity: cap,
    type: 'conference',
    imageUrl: imgPool[i % imgPool.length],
    amenities: am,
    description: isLectureHall
      ? `Giảng đường bậc thang hiện đại phục vụ các lớp học phần đông sinh viên, hội thảo chuyên đề và thuyết trình môn học.`
      : `Phòng học giảng đường ${roomCode} được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.`,
    rating: Number((4.65 + Math.random() * 0.3).toFixed(2)),
    status: (i % 3 === 2) ? 'Occupied' : 'Available'
  });
}

// 3. THƯ VIỆN SỐ VKU (Digital Library): 20 phòng
const libraryDefs = [
  { name: 'Sảnh Đọc Mở Tầng 1 (Open Hub A)', floor: 'Tầng 1', cap: 80, type: 'library', am: ['Cà phê học tập', 'Ghế sofa thư giãn', 'Ổ cắm điện từng vị trí', 'Wi-Fi 6 tốc độ cao', 'Khu vực tra cứu OPAC'], desc: 'Không gian mở rộng rãi, thoáng mát dành cho sinh viên đọc sách, thư giãn và học nhóm tự do.', rating: 4.95 },
  { name: 'Khu Đọc Mở Tầng 1 (Open Hub B)', floor: 'Tầng 1', cap: 60, type: 'library', am: ['Bàn dài học tập', 'Cây xanh thanh lọc', 'Đèn chiếu sáng tiêu chuẩn', 'Báo chí & Tạp chí mới nhất'], desc: 'Khu vực đọc báo trí và giao lưu học thuật nhẹ nhàng tại tầng 1 Thư viện số VKU.', rating: 4.88 },
  { name: 'Phòng Đọc Yên Tĩnh Tầng 2 (Deep Focus Hall)', floor: 'Tầng 2', cap: 70, type: 'library', am: ['Quy định yên lặng tuyệt đối', 'Vách ngăn cá nhân', 'Đèn đọc chống cận', 'Ổ cắm sạc laptop', 'Điều hòa 24/24'], desc: 'Khu vực tự học yên tĩnh tuyệt đối, lý tưởng cho sinh viên ôn thi cuối kỳ và nghiên cứu tài liệu chuyên sâu.', rating: 4.98 },
  { name: 'Phòng Đọc Sách Ngoại Văn Tầng 2', floor: 'Tầng 2', cap: 40, type: 'library', am: ['Tài liệu tiếng Hàn & Anh chuyên ngành', 'Ghế công thái học', 'Tai nghe học ngoại ngữ', 'Máy tra cứu số hóa'], desc: 'Không gian chuyên biệt chứa hàng nghìn đầu sách CNTT bằng tiếng Anh và tiếng Hàn Quốc.', rating: 4.92 },
  { name: 'Phòng Máy Tra Cứu Luận Văn Tầng 2', floor: 'Tầng 2', cap: 25, type: 'library', am: ['25 Máy tính tra cứu số', 'Cổng truy cập IEEE Xplore', 'Cổng ScienceDirect', 'Máy in luận văn'], desc: 'Phòng chuyên dùng để sinh viên tìm kiếm bài báo khoa học và tham khảo kho luận văn tốt nghiệp các khóa.', rating: 4.91 },
  // Pods cá nhân Tầng 3 (8 buồng)
  ...[1, 2, 3, 4, 5, 6, 7, 8].map(num => ({
    name: `Study Pod Cá Nhân P-30${num}`,
    floor: 'Tầng 3',
    cap: num <= 4 ? 2 : 4,
    type: 'study_pod',
    am: ['Kính cách âm chống ồn 99%', 'Bảng viết gắn tường', 'Đèn LED tùy chỉnh độ sáng', 'Cổng sạc Type-C & AC', 'Ghế êm đệm cao cấp'],
    desc: `Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.`,
    rating: Number((4.85 + Math.random() * 0.12).toFixed(2))
  })),
  // Phòng Thảo Luận Nhóm Tầng 4 (7 phòng)
  ...[1, 2, 3, 4, 5, 6, 7].map(num => ({
    name: `Phòng Thảo Luận Nhóm C-40${num}`,
    floor: 'Tầng 4',
    cap: 8 + (num % 3) * 2,
    type: 'study_pod',
    am: ['Màn hình TV trình chiếu 55"', 'Bảng viết kính toàn khổ', 'Cổng HDMI/AirPlay', 'Bàn họp modul', 'Cách âm tiêu chuẩn'],
    desc: `Phòng họp nhóm đồ án capstone, báo cáo tiến độ môn học và làm việc nhóm sinh viên VKU.`,
    rating: Number((4.88 + Math.random() * 0.1).toFixed(2))
  }))
];

libraryDefs.forEach((def, idx) => {
  const imgPool = roomImages[def.type] || roomImages.library;
  rooms.push({
    id: `vku-room-${pad(idCounter++)}`,
    name: def.name,
    building: 'Thư viện số VKU',
    floor: def.floor,
    capacity: def.cap,
    type: def.type,
    imageUrl: imgPool[idx % imgPool.length],
    amenities: def.am,
    description: def.desc,
    rating: def.rating,
    status: (idx % 3 === 1) ? 'Occupied' : 'Available'
  });
});

// 4. TRUNG TÂM ĐỔI MỚI SÁNG TẠO & KHỞI NGHIỆP (Innovation Hub): 10 phòng
const innovationDefs = [
  { name: 'VKU Maker Space & FabLab', floor: 'Tầng 1', cap: 35, type: 'lab', am: ['Máy in 3D công nghiệp', 'Máy cắt CNC & Laser', 'Trạm linh kiện điện tử', 'Bộ dụng cụ cơ khí chính xác'], desc: 'Không gian chế tác phần cứng, hiện thực hóa các ý tưởng sản phẩm khởi nghiệp công nghệ của sinh viên.', rating: 4.97 },
  { name: 'Coworking Startup Hub', floor: 'Tầng 1', cap: 50, type: 'study_pod', am: ['Không gian mở linh hoạt', 'Ghế lười & Sofa', 'Trà cà phê miễn phí', 'Bảng Kanban vật lý', 'Mạng cáp quang 1Gbps'], desc: 'Không gian làm việc chung dành cho các nhóm dự án sinh viên ươm mầm khởi nghiệp và CLB sáng tạo.', rating: 4.93 },
  { name: 'Phòng Pitching Gọi Vốn VKU Demo Day', floor: 'Tầng 2', cap: 45, type: 'conference', am: ['Sân khấu mini & Bục diễn thuyết', 'Hệ thống màn chiếu kép', 'Micro thu âm không dây', 'Ghế khán phòng sang trọng'], desc: 'Phòng thuyết trình dự án chuẩn quốc tế phục vụ các buổi Demo Day, gặp gỡ quỹ đầu tư mạo hiểm và doanh nghiệp.', rating: 4.96 },
  { name: 'UI/UX & Design Thinking Lab', floor: 'Tầng 2', cap: 24, type: 'lab', am: ['Bảng viết tường 360 độ', 'Giấy Post-it & Bộ thiết kế', 'Màn hình Apple Studio Display', 'Bàn đứng công thái học'], desc: 'Phòng sáng tạo thiết kế trải nghiệm người dùng, phác thảo wireframe và tư duy giải pháp người dùng.', rating: 4.91 },
  { name: 'Studio Thu Âm & Media Hub', floor: 'Tầng 2', cap: 8, type: 'lab', am: ['Mút tiêu âm phòng thu', 'Mic thu âm Rode PodMic', 'Bàn mixer RodeCaster Pro', 'Hệ thống tai nghe kiểm âm'], desc: 'Phòng thu âm podcast và lồng tiếng video bài giảng cho sinh viên truyền thông đa phương tiện VKU.', rating: 4.9 },
  { name: 'Phòng Nghiên Cứu Viện VKU-IR 101', floor: 'Tầng 3', cap: 16, type: 'conference', am: ['Hệ thống họp trực tuyến quốc tế', 'Màn hình tương tác thông minh', 'Tài liệu nghiên cứu khoa học', 'Điều hòa 2 chiều'], desc: 'Phòng họp nghiên cứu các đề tài cấp bộ, cấp nhà nước của Viện Khoa học Công nghệ và Đổi mới sáng tạo.', rating: 4.94 },
  { name: 'Phòng Nghiên Cứu Viện VKU-IR 102', floor: 'Tầng 3', cap: 16, type: 'conference', am: ['Bàn tròn thảo luận', 'Màn hình LED 75"', 'Cổng kết nối đa năng', 'Khu vực brainstorm'], desc: 'Phòng hội thảo chuyên đề nghiên cứu vi mạch, trí tuệ nhân tạo và kinh tế số.', rating: 4.89 },
  { name: 'Innovation Pod Team A', floor: 'Tầng 3', cap: 6, type: 'study_pod', am: ['Kính cách âm', 'Smart TV 50"', 'Bảng trắng di động', 'Cụm nguồn đa năng'], desc: 'Buồng làm việc nhóm riêng cho các đội tuyển sinh viên tham gia thi Hackathon và nghiên cứu khoa học.', rating: 4.88 },
  { name: 'Innovation Pod Team B', floor: 'Tầng 3', cap: 6, type: 'study_pod', am: ['Kính cách âm', 'Smart TV 50"', 'Bảng trắng di động', 'Cụm nguồn đa năng'], desc: 'Buồng làm việc nhóm tập trung cao độ phục vụ các nhóm dự án sinh viên đạt giải thưởng trường.', rating: 4.87 },
  { name: 'Innovation Pod Team C', floor: 'Tầng 3', cap: 6, type: 'study_pod', am: ['Kính cách âm', 'Smart TV 50"', 'Bảng trắng di động', 'Cụm nguồn đa năng'], desc: 'Buồng thảo luận nhóm dự án công nghệ sinh viên VKU.', rating: 4.86 }
];

innovationDefs.forEach((def, idx) => {
  const imgPool = roomImages[def.type] || roomImages.study_pod;
  rooms.push({
    id: `vku-room-${pad(idCounter++)}`,
    name: def.name,
    building: 'TT Đổi mới Sáng tạo',
    floor: def.floor,
    capacity: def.cap,
    type: def.type,
    imageUrl: imgPool[idx % imgPool.length],
    amenities: def.am,
    description: def.desc,
    rating: def.rating,
    status: (idx % 3 === 0) ? 'Occupied' : 'Available'
  });
});

// 5. HỘI TRƯỜNG & ĐA NĂNG (Grand Halls & Event Suites): 10 phòng
const hallDefs = [
  { name: 'Hội Trường Lớn Khu K (Grand Hall K)', floor: 'Tầng 1', cap: 500, type: 'conference', am: ['Sân khấu lớn chuyên nghiệp', 'Màn hình LED cong 40m²', 'Dàn âm thanh Line Array', 'Ánh sáng sân khấu DMX', 'Điều hòa trung tâm Chiller'], desc: 'Hội trường lớn nhất trường VKU dành cho các lễ khai giảng, tốt nghiệp, hội nghị khoa học quốc tế và gala sinh viên.', rating: 4.99 },
  { name: 'Hội Trường Khu V (Hall V)', floor: 'Tầng 1', cap: 350, type: 'conference', am: ['Màn hình LED P2.5', 'Âm thanh vòm hội thảo', 'Hệ thống ánh sáng hội nghị', 'Bục phát biểu sang trọng'], desc: 'Hội trường đa năng phục vụ các sự kiện tọa đàm doanh nghiệp, ngày hội việc làm và giao lưu học thuật.', rating: 4.95 },
  { name: 'Phòng Hội Nghị Quốc Tế VKU - Korea', floor: 'Tầng 4 Khu K', cap: 100, type: 'conference', am: ['Tai nghe dịch cabin đa ngôn ngữ (Hàn - Việt - Anh)', 'Camera họp tự động bám mặt', 'Micro đại biểu Bosch', 'Nội thất gỗ cao cấp'], desc: 'Phòng hội nghị ngoại giao chuyên tiếp đón các đoàn đối tác đại sứ quán, trường đại học Hàn Quốc và tập đoàn công nghệ.', rating: 4.98 },
  { name: 'Phòng Khánh Tiết VIP VKU', floor: 'Tầng 4 Khu K', cap: 30, type: 'conference', am: ['Nội thất sofa da thật', 'Tranh gốm nghệ thuật', 'Bàn trà đàm phán cao cấp', 'Khu vực pantry riêng'], desc: 'Phòng tiếp khách danh dự và ký kết các biên bản thỏa thuận hợp tác MOU cấp trường.', rating: 4.97 },
  { name: 'Phòng Seminar Học Thuật S-101', floor: 'Tầng 2 Khu V', cap: 60, type: 'conference', am: ['Bàn ghế chữ U linh hoạt', 'Máy chiếu Epson laser', 'Micro cổ ngỗng', 'Điều hòa 2 chiều'], desc: 'Phòng hội thảo chuyên đề cho giảng viên, nghiên cứu sinh và các chuyên gia khách mời.', rating: 4.88 },
  { name: 'Phòng Seminar Học Thuật S-102', floor: 'Tầng 2 Khu V', cap: 60, type: 'conference', am: ['Màn hình tương tác 86"', 'Bảng viết kính', 'Hệ thống thu âm bài giảng', 'Wi-Fi đại biểu'], desc: 'Phòng hội thảo chuyên môn công nghệ thông tin và truyền thông số.', rating: 4.89 },
  { name: 'Hội Trường Đa Năng Tầng 5 Thư Viện', floor: 'Tầng 5 Thư viện', cap: 150, type: 'conference', am: ['Không gian nhìn ra biển Đà Nẵng', 'Sàn gỗ cao cấp', 'Máy chiếu 4K siêu nét', 'Hệ thống âm thanh hội thảo'], desc: 'Hội trường trên tầng cao thư viện với tầm nhìn tuyệt đẹp, chuyên tổ chức workshop sáng tạo và triển lãm poster khoa học.', rating: 4.94 },
  { name: 'Phòng Trưng Bày Sản Phẩm Khoa Học VKU', floor: 'Tầng 1 Khu K', cap: 50, type: 'conference', am: ['Kệ trưng bày có đèn rọi', 'Màn hình cảm ứng giới thiệu dự án', 'Bục thuyết minh sản phẩm'], desc: 'Không gian triển lãm vinh danh các cúp sáng tạo, bằng sáng chế và sản phẩm công nghệ sinh viên VKU.', rating: 4.92 },
  { name: 'Phòng Họp Trực Tuyến Đa Điểm Bridge-01', floor: 'Tầng 3 Khu K', cap: 20, type: 'conference', am: ['Hệ thống Cisco Webex Room Kit', 'Màn hình kép 65"', 'Mic mảng trần Beamforming'], desc: 'Phòng hội chẩn và họp trực tuyến chất lượng cao kết nối Đại học Đà Nẵng và các trường thành viên.', rating: 4.91 },
  { name: 'Phòng Họp Chuyên Gia & Doanh Nghiệp', floor: 'Tầng 3 Khu K', cap: 25, type: 'conference', am: ['Bàn họp gỗ sồi sang trọng', 'Màn hình họp 75 inch', 'Trạm cắm điện âm bàn', 'Wi-Fi VIP'], desc: 'Phòng họp hợp tác đào tạo và phỏng vấn trực tiếp cùng các doanh nghiệp công nghệ hàng đầu.', rating: 4.93 }
];

hallDefs.forEach((def, idx) => {
  const imgPool = roomImages.conference;
  rooms.push({
    id: `vku-room-${pad(idCounter++)}`,
    name: def.name,
    building: 'Hội trường & Đa năng',
    floor: def.floor,
    capacity: def.cap,
    type: 'conference',
    imageUrl: imgPool[idx % imgPool.length],
    amenities: def.am,
    description: def.desc,
    rating: def.rating,
    status: (idx % 4 === 1) ? 'Occupied' : 'Available'
  });
});

console.log(`Successfully generated ${rooms.length} VKU rooms!`);

const outputContent = `import { Room, TimeSlot } from '../types';

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-1', label: '07:30 - 09:30 (Ca 1)', startTime: '07:30', endTime: '09:30', period: 'Morning' },
  { id: 'slot-2', label: '09:45 - 11:45 (Ca 2)', startTime: '09:45', endTime: '11:45', period: 'Morning' },
  { id: 'slot-3', label: '13:00 - 15:00 (Ca 3)', startTime: '13:00', endTime: '15:00', period: 'Afternoon' },
  { id: 'slot-4', label: '15:15 - 17:15 (Ca 4)', startTime: '15:15', endTime: '17:15', period: 'Afternoon' },
  { id: 'slot-5', label: '17:45 - 19:45 (Ca 5)', startTime: '17:45', endTime: '19:45', period: 'Evening' },
  { id: 'slot-6', label: '20:00 - 22:00 (Ca Tối)', startTime: '20:00', endTime: '22:00', period: 'Evening' },
];

export const VKU_BUILDINGS = [
  'All',
  'Khu K (Kỹ thuật & CNTT)',
  'Khu V (Giảng đường chính)',
  'Thư viện số VKU',
  'TT Đổi mới Sáng tạo',
  'Hội trường & Đa năng',
];

export const CAPACITY_OPTIONS = [
  { label: 'Tất cả quy mô', value: null },
  { label: '1 - 10 chỗ (Pod)', value: 10 },
  { label: '11 - 35 chỗ (Lab/Nhóm)', value: 35 },
  { label: '36 - 60 chỗ (Lớp học)', value: 60 },
  { label: '60+ chỗ (Hội trường)', value: 100 },
];

export const VKU_ROOMS: Room[] = ${JSON.stringify(rooms, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/vkuRooms.ts'), outputContent, 'utf-8');
console.log('Saved to src/data/vkuRooms.ts');
