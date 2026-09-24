import { Room, TimeSlot } from '../types';

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

export const VKU_ROOMS: Room[] = [
  {
    "id": "vku-room-001",
    "name": "Lab Vi mạch Bán dẫn Samsung K.205",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 2",
    "capacity": 36,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Phòng sạch Cleanroom",
      "Trạm vi mạch FPGA",
      "Dao động ký số",
      "Máy lạnh Inverter",
      "Wi-Fi 6 VKU"
    ],
    "description": "Phòng thực hành thiết kế vi mạch bán dẫn trọng điểm hợp tác cùng đối tác công nghệ Hàn Quốc.",
    "rating": 4.98,
    "status": "Occupied"
  },
  {
    "id": "vku-room-002",
    "name": "Lab Trí tuệ Nhân tạo & Big Data K.302",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 3",
    "capacity": 40,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Cụm GPU NVIDIA RTX A6000",
      "Máy trạm Deep Learning",
      "Màn hình tương tác 85\"",
      "Điều hòa 2 chiều"
    ],
    "description": "Phòng Lab nghiên cứu AI, thị giác máy tính và phân tích dữ liệu lớn phục vụ sinh viên & giảng viên VKU.",
    "rating": 4.96,
    "status": "Occupied"
  },
  {
    "id": "vku-room-003",
    "name": "Lab An toàn Thông tin & Cyber Security K.401",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 4",
    "capacity": 35,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Server mạng riêng biệt",
      "Tường lửa thế hệ mới",
      "Hệ thống CTF Challenge",
      "Dual Monitor"
    ],
    "description": "Phòng thực hành tác chiến an toàn không gian mạng và phân tích mã độc.",
    "rating": 4.92,
    "status": "Available"
  },
  {
    "id": "vku-room-004",
    "name": "Lab IoT & Hệ thống Nhúng K.204",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 2",
    "capacity": 32,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kit ARM Cortex & ESP32",
      "Trạm hàn khò SMD",
      "Cảm biến công nghiệp",
      "Máy in 3D"
    ],
    "description": "Không gian thực hành Internet vạn vật, vi điều khiển và thiết bị thông minh.",
    "rating": 4.88,
    "status": "Available"
  },
  {
    "id": "vku-room-005",
    "name": "Lab Mạng Máy tính Cisco & Cloud K.305",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 3",
    "capacity": 36,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Router/Switch Cisco chuẩn quốc tế",
      "Rack server mô phỏng",
      "Cáp quang tốc độ cao",
      "Máy chiếu Sony"
    ],
    "description": "Phòng thực hành quản trị mạng máy tính theo chuẩn CCNA/CCNP quốc tế.",
    "rating": 4.85,
    "status": "Available"
  },
  {
    "id": "vku-room-006",
    "name": "Lab Công nghệ Phần mềm K.301",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 3",
    "capacity": 42,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy trạm Core i7 32GB RAM",
      "Dual Boot Ubuntu/Windows",
      "Git server nội bộ",
      "Bảng từ kính"
    ],
    "description": "Phòng thực hành chuyên môn lập trình Fullstack, Mobile App và kỹ nghệ phần mềm.",
    "rating": 4.9,
    "status": "Occupied"
  },
  {
    "id": "vku-room-007",
    "name": "Lab Đồ họa & Game Dev K.104",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 1",
    "capacity": 30,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Card đồ họa RTX 4080",
      "Bảng vẽ Wacom Pro",
      "Kính thực tế ảo VR Meta Quest",
      "Màn hình 4K HDR"
    ],
    "description": "Phòng thực hành thiết kế đồ họa kỹ thuật số, kỹ xảo VFX và phát triển Game Unity/Unreal.",
    "rating": 4.94,
    "status": "Available"
  },
  {
    "id": "vku-room-008",
    "name": "Lab Robotics & Tự động hóa K.206",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 2",
    "capacity": 28,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Cánh tay Robot công nghiệp",
      "Bộ KIT xe tự hành ROS",
      "Bàn thí nghiệm khí nén",
      "Máy khắc laser"
    ],
    "description": "Phòng nghiên cứu robot di động thông minh và cánh tay robot tự động hóa.",
    "rating": 4.89,
    "status": "Occupied"
  },
  {
    "id": "vku-room-009",
    "name": "Studio Livestream & E-Learning K.108",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 1",
    "capacity": 12,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Phông xanh Chromakey",
      "Hệ thống đèn quay phim Softbox",
      "Micro Shure SM7B",
      "Blackmagic ATEM Mini"
    ],
    "description": "Phòng ghi hình bài giảng số, podcast học thuật và livestream sự kiện trường VKU.",
    "rating": 4.91,
    "status": "Available"
  },
  {
    "id": "vku-room-010",
    "name": "Phòng Hội đồng Khoa học K.501",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 5",
    "capacity": 25,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Micro cổ ngỗng đa kênh",
      "Hệ thống truyền hình hội nghị Polycom",
      "Màn hình LED P2",
      "Bàn họp oval cao cấp"
    ],
    "description": "Phòng họp chuyên biệt dành cho bảo vệ luận văn thạc sĩ, hội đồng nghiên cứu khoa học cấp viện.",
    "rating": 4.95,
    "status": "Occupied"
  },
  {
    "id": "vku-room-011",
    "name": "Lab Máy tính Thực hành K.101",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 1",
    "capacity": 35,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy tính để bàn Core i5",
      "Wi-Fi 6 VKU",
      "Điều hòa 2 chiều",
      "Máy chiếu Full HD",
      "Bảng viết dạ"
    ],
    "description": "Phòng thực hành máy tính K.101 trang bị đầy đủ phần mềm học tập của sinh viên VKU.",
    "rating": 4.71,
    "status": "Available"
  },
  {
    "id": "vku-room-012",
    "name": "Smart Room K.102",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 1",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.102 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.74,
    "status": "Available"
  },
  {
    "id": "vku-room-013",
    "name": "Smart Room K.103",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 1",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.103 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.79,
    "status": "Available"
  },
  {
    "id": "vku-room-014",
    "name": "Smart Room K.104",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 1",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.104 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.85,
    "status": "Occupied"
  },
  {
    "id": "vku-room-015",
    "name": "Lab Máy tính Thực hành K.105",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 1",
    "capacity": 35,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy tính để bàn Core i5",
      "Wi-Fi 6 VKU",
      "Điều hòa 2 chiều",
      "Máy chiếu Full HD",
      "Bảng viết dạ"
    ],
    "description": "Phòng thực hành máy tính K.105 trang bị đầy đủ phần mềm học tập của sinh viên VKU.",
    "rating": 4.75,
    "status": "Occupied"
  },
  {
    "id": "vku-room-016",
    "name": "Smart Room K.201",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 2",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.201 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.63,
    "status": "Available"
  },
  {
    "id": "vku-room-017",
    "name": "Smart Room K.202",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 2",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.202 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.96,
    "status": "Available"
  },
  {
    "id": "vku-room-018",
    "name": "Smart Room K.203",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 2",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.203 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.66,
    "status": "Occupied"
  },
  {
    "id": "vku-room-019",
    "name": "Lab Máy tính Thực hành K.204",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 2",
    "capacity": 35,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy tính để bàn Core i5",
      "Wi-Fi 6 VKU",
      "Điều hòa 2 chiều",
      "Máy chiếu Full HD",
      "Bảng viết dạ"
    ],
    "description": "Phòng thực hành máy tính K.204 trang bị đầy đủ phần mềm học tập của sinh viên VKU.",
    "rating": 4.91,
    "status": "Available"
  },
  {
    "id": "vku-room-020",
    "name": "Smart Room K.205",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 2",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.205 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.79,
    "status": "Available"
  },
  {
    "id": "vku-room-021",
    "name": "Smart Room K.301",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 3",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.301 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.72,
    "status": "Available"
  },
  {
    "id": "vku-room-022",
    "name": "Smart Room K.302",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 3",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.302 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.92,
    "status": "Occupied"
  },
  {
    "id": "vku-room-023",
    "name": "Lab Máy tính Thực hành K.303",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 3",
    "capacity": 35,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy tính để bàn Core i5",
      "Wi-Fi 6 VKU",
      "Điều hòa 2 chiều",
      "Máy chiếu Full HD",
      "Bảng viết dạ"
    ],
    "description": "Phòng thực hành máy tính K.303 trang bị đầy đủ phần mềm học tập của sinh viên VKU.",
    "rating": 4.82,
    "status": "Available"
  },
  {
    "id": "vku-room-024",
    "name": "Smart Room K.304",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 3",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.304 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.7,
    "status": "Available"
  },
  {
    "id": "vku-room-025",
    "name": "Smart Room K.305",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 3",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.305 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.74,
    "status": "Available"
  },
  {
    "id": "vku-room-026",
    "name": "Smart Room K.401",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 4",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.401 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.91,
    "status": "Occupied"
  },
  {
    "id": "vku-room-027",
    "name": "Lab Máy tính Thực hành K.402",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 4",
    "capacity": 35,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy tính để bàn Core i5",
      "Wi-Fi 6 VKU",
      "Điều hòa 2 chiều",
      "Máy chiếu Full HD",
      "Bảng viết dạ"
    ],
    "description": "Phòng thực hành máy tính K.402 trang bị đầy đủ phần mềm học tập của sinh viên VKU.",
    "rating": 4.92,
    "status": "Available"
  },
  {
    "id": "vku-room-028",
    "name": "Smart Room K.403",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 4",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.403 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.7,
    "status": "Available"
  },
  {
    "id": "vku-room-029",
    "name": "Smart Room K.404",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 4",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.404 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.66,
    "status": "Occupied"
  },
  {
    "id": "vku-room-030",
    "name": "Smart Room K.405",
    "building": "Khu K (Kỹ thuật & CNTT)",
    "floor": "Tầng 4",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Smartboard 75 inch tương tác",
      "Micro không dây",
      "Âm thanh vòm",
      "Điều hòa trung tâm",
      "Bàn ghế modul di động"
    ],
    "description": "Phòng học thông minh K.405 được thiết kế tối ưu cho học tập chủ động và thảo luận nhóm.",
    "rating": 4.82,
    "status": "Occupied"
  },
  {
    "id": "vku-room-031",
    "name": "Giảng đường Bậc thang V.A101",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 1",
    "capacity": 120,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Hệ thống âm thanh hội trường",
      "2 Máy chiếu công suất lớn",
      "Bàn ghế bậc thang",
      "Máy lạnh 50.000 BTU",
      "Micro trợ giảng"
    ],
    "description": "Giảng đường bậc thang hiện đại phục vụ các lớp học phần đông sinh viên, hội thảo chuyên đề và thuyết trình môn học.",
    "rating": 4.72,
    "status": "Available"
  },
  {
    "id": "vku-room-032",
    "name": "Phòng học Giảng đường V.A202",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 2",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.A202 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.82,
    "status": "Available"
  },
  {
    "id": "vku-room-033",
    "name": "Phòng học Giảng đường V.A303",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 3",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.A303 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.81,
    "status": "Occupied"
  },
  {
    "id": "vku-room-034",
    "name": "Smart Classroom VKU V.A404",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 4",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình cảm ứng tương tác 86\"",
      "Bàn ghế học nhóm linh hoạt",
      "Wi-Fi 6 VKU Edu",
      "Hệ thống camera AI theo dõi",
      "Điều hòa Inverter"
    ],
    "description": "Phòng học giảng đường V.A404 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.79,
    "status": "Available"
  },
  {
    "id": "vku-room-035",
    "name": "Phòng học Giảng đường V.A105",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 1",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.A105 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.9,
    "status": "Available"
  },
  {
    "id": "vku-room-036",
    "name": "Giảng đường Bậc thang V.A206",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 2",
    "capacity": 120,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Hệ thống âm thanh hội trường",
      "2 Máy chiếu công suất lớn",
      "Bàn ghế bậc thang",
      "Máy lạnh 50.000 BTU",
      "Micro trợ giảng"
    ],
    "description": "Giảng đường bậc thang hiện đại phục vụ các lớp học phần đông sinh viên, hội thảo chuyên đề và thuyết trình môn học.",
    "rating": 4.8,
    "status": "Occupied"
  },
  {
    "id": "vku-room-037",
    "name": "Smart Classroom VKU V.A301",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 3",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình cảm ứng tương tác 86\"",
      "Bàn ghế học nhóm linh hoạt",
      "Wi-Fi 6 VKU Edu",
      "Hệ thống camera AI theo dõi",
      "Điều hòa Inverter"
    ],
    "description": "Phòng học giảng đường V.A301 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.67,
    "status": "Available"
  },
  {
    "id": "vku-room-038",
    "name": "Phòng học Giảng đường V.A402",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 4",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.A402 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.8,
    "status": "Available"
  },
  {
    "id": "vku-room-039",
    "name": "Phòng học Giảng đường V.A103",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 1",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.A103 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.94,
    "status": "Occupied"
  },
  {
    "id": "vku-room-040",
    "name": "Smart Classroom VKU V.A204",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 2",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình cảm ứng tương tác 86\"",
      "Bàn ghế học nhóm linh hoạt",
      "Wi-Fi 6 VKU Edu",
      "Hệ thống camera AI theo dõi",
      "Điều hòa Inverter"
    ],
    "description": "Phòng học giảng đường V.A204 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.83,
    "status": "Available"
  },
  {
    "id": "vku-room-041",
    "name": "Giảng đường Bậc thang V.B305",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 3",
    "capacity": 120,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Hệ thống âm thanh hội trường",
      "2 Máy chiếu công suất lớn",
      "Bàn ghế bậc thang",
      "Máy lạnh 50.000 BTU",
      "Micro trợ giảng"
    ],
    "description": "Giảng đường bậc thang hiện đại phục vụ các lớp học phần đông sinh viên, hội thảo chuyên đề và thuyết trình môn học.",
    "rating": 4.92,
    "status": "Available"
  },
  {
    "id": "vku-room-042",
    "name": "Phòng học Giảng đường V.B406",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 4",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.B406 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.8,
    "status": "Occupied"
  },
  {
    "id": "vku-room-043",
    "name": "Smart Classroom VKU V.B101",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 1",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình cảm ứng tương tác 86\"",
      "Bàn ghế học nhóm linh hoạt",
      "Wi-Fi 6 VKU Edu",
      "Hệ thống camera AI theo dõi",
      "Điều hòa Inverter"
    ],
    "description": "Phòng học giảng đường V.B101 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.9,
    "status": "Available"
  },
  {
    "id": "vku-room-044",
    "name": "Phòng học Giảng đường V.B202",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 2",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.B202 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.68,
    "status": "Available"
  },
  {
    "id": "vku-room-045",
    "name": "Phòng học Giảng đường V.B303",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 3",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.B303 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.65,
    "status": "Occupied"
  },
  {
    "id": "vku-room-046",
    "name": "Giảng đường Bậc thang V.B404",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 4",
    "capacity": 120,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Hệ thống âm thanh hội trường",
      "2 Máy chiếu công suất lớn",
      "Bàn ghế bậc thang",
      "Máy lạnh 50.000 BTU",
      "Micro trợ giảng"
    ],
    "description": "Giảng đường bậc thang hiện đại phục vụ các lớp học phần đông sinh viên, hội thảo chuyên đề và thuyết trình môn học.",
    "rating": 4.79,
    "status": "Available"
  },
  {
    "id": "vku-room-047",
    "name": "Phòng học Giảng đường V.B105",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 1",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.B105 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.79,
    "status": "Available"
  },
  {
    "id": "vku-room-048",
    "name": "Phòng học Giảng đường V.B206",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 2",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.B206 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.74,
    "status": "Occupied"
  },
  {
    "id": "vku-room-049",
    "name": "Smart Classroom VKU V.B301",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 3",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình cảm ứng tương tác 86\"",
      "Bàn ghế học nhóm linh hoạt",
      "Wi-Fi 6 VKU Edu",
      "Hệ thống camera AI theo dõi",
      "Điều hòa Inverter"
    ],
    "description": "Phòng học giảng đường V.B301 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.85,
    "status": "Available"
  },
  {
    "id": "vku-room-050",
    "name": "Phòng học Giảng đường V.B402",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 4",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.B402 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.82,
    "status": "Available"
  },
  {
    "id": "vku-room-051",
    "name": "Giảng đường Bậc thang V.C103",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 1",
    "capacity": 120,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Hệ thống âm thanh hội trường",
      "2 Máy chiếu công suất lớn",
      "Bàn ghế bậc thang",
      "Máy lạnh 50.000 BTU",
      "Micro trợ giảng"
    ],
    "description": "Giảng đường bậc thang hiện đại phục vụ các lớp học phần đông sinh viên, hội thảo chuyên đề và thuyết trình môn học.",
    "rating": 4.81,
    "status": "Occupied"
  },
  {
    "id": "vku-room-052",
    "name": "Smart Classroom VKU V.C204",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 2",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình cảm ứng tương tác 86\"",
      "Bàn ghế học nhóm linh hoạt",
      "Wi-Fi 6 VKU Edu",
      "Hệ thống camera AI theo dõi",
      "Điều hòa Inverter"
    ],
    "description": "Phòng học giảng đường V.C204 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.74,
    "status": "Available"
  },
  {
    "id": "vku-room-053",
    "name": "Phòng học Giảng đường V.C305",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 3",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.C305 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.77,
    "status": "Available"
  },
  {
    "id": "vku-room-054",
    "name": "Phòng học Giảng đường V.C406",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 4",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.C406 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.79,
    "status": "Occupied"
  },
  {
    "id": "vku-room-055",
    "name": "Smart Classroom VKU V.C101",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 1",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình cảm ứng tương tác 86\"",
      "Bàn ghế học nhóm linh hoạt",
      "Wi-Fi 6 VKU Edu",
      "Hệ thống camera AI theo dõi",
      "Điều hòa Inverter"
    ],
    "description": "Phòng học giảng đường V.C101 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.66,
    "status": "Available"
  },
  {
    "id": "vku-room-056",
    "name": "Giảng đường Bậc thang V.C202",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 2",
    "capacity": 120,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Hệ thống âm thanh hội trường",
      "2 Máy chiếu công suất lớn",
      "Bàn ghế bậc thang",
      "Máy lạnh 50.000 BTU",
      "Micro trợ giảng"
    ],
    "description": "Giảng đường bậc thang hiện đại phục vụ các lớp học phần đông sinh viên, hội thảo chuyên đề và thuyết trình môn học.",
    "rating": 4.73,
    "status": "Available"
  },
  {
    "id": "vku-room-057",
    "name": "Phòng học Giảng đường V.C303",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 3",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.C303 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.93,
    "status": "Occupied"
  },
  {
    "id": "vku-room-058",
    "name": "Smart Classroom VKU V.C404",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 4",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình cảm ứng tương tác 86\"",
      "Bàn ghế học nhóm linh hoạt",
      "Wi-Fi 6 VKU Edu",
      "Hệ thống camera AI theo dõi",
      "Điều hòa Inverter"
    ],
    "description": "Phòng học giảng đường V.C404 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.79,
    "status": "Available"
  },
  {
    "id": "vku-room-059",
    "name": "Phòng học Giảng đường V.C105",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 1",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.C105 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.73,
    "status": "Available"
  },
  {
    "id": "vku-room-060",
    "name": "Phòng học Giảng đường V.C206",
    "building": "Khu V (Giảng đường chính)",
    "floor": "Tầng 2",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy chiếu Panasonic siêu nét",
      "Bảng từ xanh chống lóa",
      "Quạt trần & Điều hòa",
      "Bục giảng điện tử",
      "Hệ thống loa trợ giảng"
    ],
    "description": "Phòng học giảng đường V.C206 được trang bị cơ sở vật chất khang trang, mát mẻ đạt chuẩn đào tạo của Đại học Đà Nẵng.",
    "rating": 4.88,
    "status": "Occupied"
  },
  {
    "id": "vku-room-061",
    "name": "Sảnh Đọc Mở Tầng 1 (Open Hub A)",
    "building": "Thư viện số VKU",
    "floor": "Tầng 1",
    "capacity": 80,
    "type": "library",
    "imageUrl": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Cà phê học tập",
      "Ghế sofa thư giãn",
      "Ổ cắm điện từng vị trí",
      "Wi-Fi 6 tốc độ cao",
      "Khu vực tra cứu OPAC"
    ],
    "description": "Không gian mở rộng rãi, thoáng mát dành cho sinh viên đọc sách, thư giãn và học nhóm tự do.",
    "rating": 4.95,
    "status": "Available"
  },
  {
    "id": "vku-room-062",
    "name": "Khu Đọc Mở Tầng 1 (Open Hub B)",
    "building": "Thư viện số VKU",
    "floor": "Tầng 1",
    "capacity": 60,
    "type": "library",
    "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Bàn dài học tập",
      "Cây xanh thanh lọc",
      "Đèn chiếu sáng tiêu chuẩn",
      "Báo chí & Tạp chí mới nhất"
    ],
    "description": "Khu vực đọc báo trí và giao lưu học thuật nhẹ nhàng tại tầng 1 Thư viện số VKU.",
    "rating": 4.88,
    "status": "Occupied"
  },
  {
    "id": "vku-room-063",
    "name": "Phòng Đọc Yên Tĩnh Tầng 2 (Deep Focus Hall)",
    "building": "Thư viện số VKU",
    "floor": "Tầng 2",
    "capacity": 70,
    "type": "library",
    "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Quy định yên lặng tuyệt đối",
      "Vách ngăn cá nhân",
      "Đèn đọc chống cận",
      "Ổ cắm sạc laptop",
      "Điều hòa 24/24"
    ],
    "description": "Khu vực tự học yên tĩnh tuyệt đối, lý tưởng cho sinh viên ôn thi cuối kỳ và nghiên cứu tài liệu chuyên sâu.",
    "rating": 4.98,
    "status": "Available"
  },
  {
    "id": "vku-room-064",
    "name": "Phòng Đọc Sách Ngoại Văn Tầng 2",
    "building": "Thư viện số VKU",
    "floor": "Tầng 2",
    "capacity": 40,
    "type": "library",
    "imageUrl": "https://images.unsplash.com/photo-1507842229451-7f01be837453?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Tài liệu tiếng Hàn & Anh chuyên ngành",
      "Ghế công thái học",
      "Tai nghe học ngoại ngữ",
      "Máy tra cứu số hóa"
    ],
    "description": "Không gian chuyên biệt chứa hàng nghìn đầu sách CNTT bằng tiếng Anh và tiếng Hàn Quốc.",
    "rating": 4.92,
    "status": "Available"
  },
  {
    "id": "vku-room-065",
    "name": "Phòng Máy Tra Cứu Luận Văn Tầng 2",
    "building": "Thư viện số VKU",
    "floor": "Tầng 2",
    "capacity": 25,
    "type": "library",
    "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "25 Máy tính tra cứu số",
      "Cổng truy cập IEEE Xplore",
      "Cổng ScienceDirect",
      "Máy in luận văn"
    ],
    "description": "Phòng chuyên dùng để sinh viên tìm kiếm bài báo khoa học và tham khảo kho luận văn tốt nghiệp các khóa.",
    "rating": 4.91,
    "status": "Occupied"
  },
  {
    "id": "vku-room-066",
    "name": "Study Pod Cá Nhân P-301",
    "building": "Thư viện số VKU",
    "floor": "Tầng 3",
    "capacity": 2,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm chống ồn 99%",
      "Bảng viết gắn tường",
      "Đèn LED tùy chỉnh độ sáng",
      "Cổng sạc Type-C & AC",
      "Ghế êm đệm cao cấp"
    ],
    "description": "Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.",
    "rating": 4.96,
    "status": "Available"
  },
  {
    "id": "vku-room-067",
    "name": "Study Pod Cá Nhân P-302",
    "building": "Thư viện số VKU",
    "floor": "Tầng 3",
    "capacity": 2,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm chống ồn 99%",
      "Bảng viết gắn tường",
      "Đèn LED tùy chỉnh độ sáng",
      "Cổng sạc Type-C & AC",
      "Ghế êm đệm cao cấp"
    ],
    "description": "Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.",
    "rating": 4.95,
    "status": "Available"
  },
  {
    "id": "vku-room-068",
    "name": "Study Pod Cá Nhân P-303",
    "building": "Thư viện số VKU",
    "floor": "Tầng 3",
    "capacity": 2,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm chống ồn 99%",
      "Bảng viết gắn tường",
      "Đèn LED tùy chỉnh độ sáng",
      "Cổng sạc Type-C & AC",
      "Ghế êm đệm cao cấp"
    ],
    "description": "Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.",
    "rating": 4.89,
    "status": "Occupied"
  },
  {
    "id": "vku-room-069",
    "name": "Study Pod Cá Nhân P-304",
    "building": "Thư viện số VKU",
    "floor": "Tầng 3",
    "capacity": 2,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm chống ồn 99%",
      "Bảng viết gắn tường",
      "Đèn LED tùy chỉnh độ sáng",
      "Cổng sạc Type-C & AC",
      "Ghế êm đệm cao cấp"
    ],
    "description": "Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.",
    "rating": 4.88,
    "status": "Available"
  },
  {
    "id": "vku-room-070",
    "name": "Study Pod Cá Nhân P-305",
    "building": "Thư viện số VKU",
    "floor": "Tầng 3",
    "capacity": 4,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm chống ồn 99%",
      "Bảng viết gắn tường",
      "Đèn LED tùy chỉnh độ sáng",
      "Cổng sạc Type-C & AC",
      "Ghế êm đệm cao cấp"
    ],
    "description": "Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.",
    "rating": 4.97,
    "status": "Available"
  },
  {
    "id": "vku-room-071",
    "name": "Study Pod Cá Nhân P-306",
    "building": "Thư viện số VKU",
    "floor": "Tầng 3",
    "capacity": 4,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm chống ồn 99%",
      "Bảng viết gắn tường",
      "Đèn LED tùy chỉnh độ sáng",
      "Cổng sạc Type-C & AC",
      "Ghế êm đệm cao cấp"
    ],
    "description": "Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.",
    "rating": 4.88,
    "status": "Occupied"
  },
  {
    "id": "vku-room-072",
    "name": "Study Pod Cá Nhân P-307",
    "building": "Thư viện số VKU",
    "floor": "Tầng 3",
    "capacity": 4,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm chống ồn 99%",
      "Bảng viết gắn tường",
      "Đèn LED tùy chỉnh độ sáng",
      "Cổng sạc Type-C & AC",
      "Ghế êm đệm cao cấp"
    ],
    "description": "Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.",
    "rating": 4.93,
    "status": "Available"
  },
  {
    "id": "vku-room-073",
    "name": "Study Pod Cá Nhân P-308",
    "building": "Thư viện số VKU",
    "floor": "Tầng 3",
    "capacity": 4,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm chống ồn 99%",
      "Bảng viết gắn tường",
      "Đèn LED tùy chỉnh độ sáng",
      "Cổng sạc Type-C & AC",
      "Ghế êm đệm cao cấp"
    ],
    "description": "Buồng tự học cá nhân/cặp đôi cách âm tuyệt đối, thích hợp học online, phỏng vấn tuyển dụng hoặc thảo luận 2 người.",
    "rating": 4.89,
    "status": "Available"
  },
  {
    "id": "vku-room-074",
    "name": "Phòng Thảo Luận Nhóm C-401",
    "building": "Thư viện số VKU",
    "floor": "Tầng 4",
    "capacity": 10,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình TV trình chiếu 55\"",
      "Bảng viết kính toàn khổ",
      "Cổng HDMI/AirPlay",
      "Bàn họp modul",
      "Cách âm tiêu chuẩn"
    ],
    "description": "Phòng họp nhóm đồ án capstone, báo cáo tiến độ môn học và làm việc nhóm sinh viên VKU.",
    "rating": 4.95,
    "status": "Occupied"
  },
  {
    "id": "vku-room-075",
    "name": "Phòng Thảo Luận Nhóm C-402",
    "building": "Thư viện số VKU",
    "floor": "Tầng 4",
    "capacity": 12,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình TV trình chiếu 55\"",
      "Bảng viết kính toàn khổ",
      "Cổng HDMI/AirPlay",
      "Bàn họp modul",
      "Cách âm tiêu chuẩn"
    ],
    "description": "Phòng họp nhóm đồ án capstone, báo cáo tiến độ môn học và làm việc nhóm sinh viên VKU.",
    "rating": 4.93,
    "status": "Available"
  },
  {
    "id": "vku-room-076",
    "name": "Phòng Thảo Luận Nhóm C-403",
    "building": "Thư viện số VKU",
    "floor": "Tầng 4",
    "capacity": 8,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình TV trình chiếu 55\"",
      "Bảng viết kính toàn khổ",
      "Cổng HDMI/AirPlay",
      "Bàn họp modul",
      "Cách âm tiêu chuẩn"
    ],
    "description": "Phòng họp nhóm đồ án capstone, báo cáo tiến độ môn học và làm việc nhóm sinh viên VKU.",
    "rating": 4.91,
    "status": "Available"
  },
  {
    "id": "vku-room-077",
    "name": "Phòng Thảo Luận Nhóm C-404",
    "building": "Thư viện số VKU",
    "floor": "Tầng 4",
    "capacity": 10,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình TV trình chiếu 55\"",
      "Bảng viết kính toàn khổ",
      "Cổng HDMI/AirPlay",
      "Bàn họp modul",
      "Cách âm tiêu chuẩn"
    ],
    "description": "Phòng họp nhóm đồ án capstone, báo cáo tiến độ môn học và làm việc nhóm sinh viên VKU.",
    "rating": 4.9,
    "status": "Occupied"
  },
  {
    "id": "vku-room-078",
    "name": "Phòng Thảo Luận Nhóm C-405",
    "building": "Thư viện số VKU",
    "floor": "Tầng 4",
    "capacity": 12,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình TV trình chiếu 55\"",
      "Bảng viết kính toàn khổ",
      "Cổng HDMI/AirPlay",
      "Bàn họp modul",
      "Cách âm tiêu chuẩn"
    ],
    "description": "Phòng họp nhóm đồ án capstone, báo cáo tiến độ môn học và làm việc nhóm sinh viên VKU.",
    "rating": 4.97,
    "status": "Available"
  },
  {
    "id": "vku-room-079",
    "name": "Phòng Thảo Luận Nhóm C-406",
    "building": "Thư viện số VKU",
    "floor": "Tầng 4",
    "capacity": 8,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình TV trình chiếu 55\"",
      "Bảng viết kính toàn khổ",
      "Cổng HDMI/AirPlay",
      "Bàn họp modul",
      "Cách âm tiêu chuẩn"
    ],
    "description": "Phòng họp nhóm đồ án capstone, báo cáo tiến độ môn học và làm việc nhóm sinh viên VKU.",
    "rating": 4.92,
    "status": "Available"
  },
  {
    "id": "vku-room-080",
    "name": "Phòng Thảo Luận Nhóm C-407",
    "building": "Thư viện số VKU",
    "floor": "Tầng 4",
    "capacity": 10,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình TV trình chiếu 55\"",
      "Bảng viết kính toàn khổ",
      "Cổng HDMI/AirPlay",
      "Bàn họp modul",
      "Cách âm tiêu chuẩn"
    ],
    "description": "Phòng họp nhóm đồ án capstone, báo cáo tiến độ môn học và làm việc nhóm sinh viên VKU.",
    "rating": 4.88,
    "status": "Occupied"
  },
  {
    "id": "vku-room-081",
    "name": "VKU Maker Space & FabLab",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 1",
    "capacity": 35,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Máy in 3D công nghiệp",
      "Máy cắt CNC & Laser",
      "Trạm linh kiện điện tử",
      "Bộ dụng cụ cơ khí chính xác"
    ],
    "description": "Không gian chế tác phần cứng, hiện thực hóa các ý tưởng sản phẩm khởi nghiệp công nghệ của sinh viên.",
    "rating": 4.97,
    "status": "Occupied"
  },
  {
    "id": "vku-room-082",
    "name": "Coworking Startup Hub",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 1",
    "capacity": 50,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Không gian mở linh hoạt",
      "Ghế lười & Sofa",
      "Trà cà phê miễn phí",
      "Bảng Kanban vật lý",
      "Mạng cáp quang 1Gbps"
    ],
    "description": "Không gian làm việc chung dành cho các nhóm dự án sinh viên ươm mầm khởi nghiệp và CLB sáng tạo.",
    "rating": 4.93,
    "status": "Available"
  },
  {
    "id": "vku-room-083",
    "name": "Phòng Pitching Gọi Vốn VKU Demo Day",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 2",
    "capacity": 45,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Sân khấu mini & Bục diễn thuyết",
      "Hệ thống màn chiếu kép",
      "Micro thu âm không dây",
      "Ghế khán phòng sang trọng"
    ],
    "description": "Phòng thuyết trình dự án chuẩn quốc tế phục vụ các buổi Demo Day, gặp gỡ quỹ đầu tư mạo hiểm và doanh nghiệp.",
    "rating": 4.96,
    "status": "Available"
  },
  {
    "id": "vku-room-084",
    "name": "UI/UX & Design Thinking Lab",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 2",
    "capacity": 24,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Bảng viết tường 360 độ",
      "Giấy Post-it & Bộ thiết kế",
      "Màn hình Apple Studio Display",
      "Bàn đứng công thái học"
    ],
    "description": "Phòng sáng tạo thiết kế trải nghiệm người dùng, phác thảo wireframe và tư duy giải pháp người dùng.",
    "rating": 4.91,
    "status": "Occupied"
  },
  {
    "id": "vku-room-085",
    "name": "Studio Thu Âm & Media Hub",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 2",
    "capacity": 8,
    "type": "lab",
    "imageUrl": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Mút tiêu âm phòng thu",
      "Mic thu âm Rode PodMic",
      "Bàn mixer RodeCaster Pro",
      "Hệ thống tai nghe kiểm âm"
    ],
    "description": "Phòng thu âm podcast và lồng tiếng video bài giảng cho sinh viên truyền thông đa phương tiện VKU.",
    "rating": 4.9,
    "status": "Available"
  },
  {
    "id": "vku-room-086",
    "name": "Phòng Nghiên Cứu Viện VKU-IR 101",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 3",
    "capacity": 16,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Hệ thống họp trực tuyến quốc tế",
      "Màn hình tương tác thông minh",
      "Tài liệu nghiên cứu khoa học",
      "Điều hòa 2 chiều"
    ],
    "description": "Phòng họp nghiên cứu các đề tài cấp bộ, cấp nhà nước của Viện Khoa học Công nghệ và Đổi mới sáng tạo.",
    "rating": 4.94,
    "status": "Available"
  },
  {
    "id": "vku-room-087",
    "name": "Phòng Nghiên Cứu Viện VKU-IR 102",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 3",
    "capacity": 16,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Bàn tròn thảo luận",
      "Màn hình LED 75\"",
      "Cổng kết nối đa năng",
      "Khu vực brainstorm"
    ],
    "description": "Phòng hội thảo chuyên đề nghiên cứu vi mạch, trí tuệ nhân tạo và kinh tế số.",
    "rating": 4.89,
    "status": "Occupied"
  },
  {
    "id": "vku-room-088",
    "name": "Innovation Pod Team A",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 3",
    "capacity": 6,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm",
      "Smart TV 50\"",
      "Bảng trắng di động",
      "Cụm nguồn đa năng"
    ],
    "description": "Buồng làm việc nhóm riêng cho các đội tuyển sinh viên tham gia thi Hackathon và nghiên cứu khoa học.",
    "rating": 4.88,
    "status": "Available"
  },
  {
    "id": "vku-room-089",
    "name": "Innovation Pod Team B",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 3",
    "capacity": 6,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm",
      "Smart TV 50\"",
      "Bảng trắng di động",
      "Cụm nguồn đa năng"
    ],
    "description": "Buồng làm việc nhóm tập trung cao độ phục vụ các nhóm dự án sinh viên đạt giải thưởng trường.",
    "rating": 4.87,
    "status": "Available"
  },
  {
    "id": "vku-room-090",
    "name": "Innovation Pod Team C",
    "building": "TT Đổi mới Sáng tạo",
    "floor": "Tầng 3",
    "capacity": 6,
    "type": "study_pod",
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kính cách âm",
      "Smart TV 50\"",
      "Bảng trắng di động",
      "Cụm nguồn đa năng"
    ],
    "description": "Buồng thảo luận nhóm dự án công nghệ sinh viên VKU.",
    "rating": 4.86,
    "status": "Occupied"
  },
  {
    "id": "vku-room-091",
    "name": "Hội Trường Lớn Khu K (Grand Hall K)",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 1",
    "capacity": 500,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Sân khấu lớn chuyên nghiệp",
      "Màn hình LED cong 40m²",
      "Dàn âm thanh Line Array",
      "Ánh sáng sân khấu DMX",
      "Điều hòa trung tâm Chiller"
    ],
    "description": "Hội trường lớn nhất trường VKU dành cho các lễ khai giảng, tốt nghiệp, hội nghị khoa học quốc tế và gala sinh viên.",
    "rating": 4.99,
    "status": "Available"
  },
  {
    "id": "vku-room-092",
    "name": "Hội Trường Khu V (Hall V)",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 1",
    "capacity": 350,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình LED P2.5",
      "Âm thanh vòm hội thảo",
      "Hệ thống ánh sáng hội nghị",
      "Bục phát biểu sang trọng"
    ],
    "description": "Hội trường đa năng phục vụ các sự kiện tọa đàm doanh nghiệp, ngày hội việc làm và giao lưu học thuật.",
    "rating": 4.95,
    "status": "Occupied"
  },
  {
    "id": "vku-room-093",
    "name": "Phòng Hội Nghị Quốc Tế VKU - Korea",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 4 Khu K",
    "capacity": 100,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Tai nghe dịch cabin đa ngôn ngữ (Hàn - Việt - Anh)",
      "Camera họp tự động bám mặt",
      "Micro đại biểu Bosch",
      "Nội thất gỗ cao cấp"
    ],
    "description": "Phòng hội nghị ngoại giao chuyên tiếp đón các đoàn đối tác đại sứ quán, trường đại học Hàn Quốc và tập đoàn công nghệ.",
    "rating": 4.98,
    "status": "Available"
  },
  {
    "id": "vku-room-094",
    "name": "Phòng Khánh Tiết VIP VKU",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 4 Khu K",
    "capacity": 30,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Nội thất sofa da thật",
      "Tranh gốm nghệ thuật",
      "Bàn trà đàm phán cao cấp",
      "Khu vực pantry riêng"
    ],
    "description": "Phòng tiếp khách danh dự và ký kết các biên bản thỏa thuận hợp tác MOU cấp trường.",
    "rating": 4.97,
    "status": "Available"
  },
  {
    "id": "vku-room-095",
    "name": "Phòng Seminar Học Thuật S-101",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 2 Khu V",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Bàn ghế chữ U linh hoạt",
      "Máy chiếu Epson laser",
      "Micro cổ ngỗng",
      "Điều hòa 2 chiều"
    ],
    "description": "Phòng hội thảo chuyên đề cho giảng viên, nghiên cứu sinh và các chuyên gia khách mời.",
    "rating": 4.88,
    "status": "Available"
  },
  {
    "id": "vku-room-096",
    "name": "Phòng Seminar Học Thuật S-102",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 2 Khu V",
    "capacity": 60,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Màn hình tương tác 86\"",
      "Bảng viết kính",
      "Hệ thống thu âm bài giảng",
      "Wi-Fi đại biểu"
    ],
    "description": "Phòng hội thảo chuyên môn công nghệ thông tin và truyền thông số.",
    "rating": 4.89,
    "status": "Occupied"
  },
  {
    "id": "vku-room-097",
    "name": "Hội Trường Đa Năng Tầng 5 Thư Viện",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 5 Thư viện",
    "capacity": 150,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Không gian nhìn ra biển Đà Nẵng",
      "Sàn gỗ cao cấp",
      "Máy chiếu 4K siêu nét",
      "Hệ thống âm thanh hội thảo"
    ],
    "description": "Hội trường trên tầng cao thư viện với tầm nhìn tuyệt đẹp, chuyên tổ chức workshop sáng tạo và triển lãm poster khoa học.",
    "rating": 4.94,
    "status": "Available"
  },
  {
    "id": "vku-room-098",
    "name": "Phòng Trưng Bày Sản Phẩm Khoa Học VKU",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 1 Khu K",
    "capacity": 50,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Kệ trưng bày có đèn rọi",
      "Màn hình cảm ứng giới thiệu dự án",
      "Bục thuyết minh sản phẩm"
    ],
    "description": "Không gian triển lãm vinh danh các cúp sáng tạo, bằng sáng chế và sản phẩm công nghệ sinh viên VKU.",
    "rating": 4.92,
    "status": "Available"
  },
  {
    "id": "vku-room-099",
    "name": "Phòng Họp Trực Tuyến Đa Điểm Bridge-01",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 3 Khu K",
    "capacity": 20,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Hệ thống Cisco Webex Room Kit",
      "Màn hình kép 65\"",
      "Mic mảng trần Beamforming"
    ],
    "description": "Phòng hội chẩn và họp trực tuyến chất lượng cao kết nối Đại học Đà Nẵng và các trường thành viên.",
    "rating": 4.91,
    "status": "Available"
  },
  {
    "id": "vku-room-100",
    "name": "Phòng Họp Chuyên Gia & Doanh Nghiệp",
    "building": "Hội trường & Đa năng",
    "floor": "Tầng 3 Khu K",
    "capacity": 25,
    "type": "conference",
    "imageUrl": "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
    "amenities": [
      "Bàn họp gỗ sồi sang trọng",
      "Màn hình họp 75 inch",
      "Trạm cắm điện âm bàn",
      "Wi-Fi VIP"
    ],
    "description": "Phòng họp hợp tác đào tạo và phỏng vấn trực tiếp cùng các doanh nghiệp công nghệ hàng đầu.",
    "rating": 4.93,
    "status": "Occupied"
  }
];
