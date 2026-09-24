import AsyncStorage from '@react-native-async-storage/async-storage';
import { VKU_ROOMS } from '../data/vkuRooms';
import { Booking, Room, UserAccount, UserProfile } from '../types';

const STORAGE_KEYS = {
  ROOMS: '@vku_db_rooms_v2',
  USERS: '@vku_db_users_v2',
  CURRENT_USER: '@vku_db_current_user_v2',
  BOOKINGS: '@vku_db_bookings_v2',
  INITIALIZED: '@vku_db_initialized_v2',
};

export const INITIAL_VKU_ACCOUNTS: UserAccount[] = [
  {
    id: 'usr-vku-01',
    studentCode: '21IT001',
    name: 'Lương Thế Nguyên',
    email: 'nguyenlt@vku.udn.vn',
    department: 'Khoa Công nghệ Thông tin - Kỹ nghệ Phần mềm (VKU)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    phone: '0905 123 456',
    role: 'student',
    passwordHash: 'vku12345',
  },
  {
    id: 'usr-vku-02',
    studentCode: 'GV-VKU-2018',
    name: 'TS. Lê Quang Huy',
    email: 'huylq@vku.udn.vn',
    department: 'Viện Công nghệ Bán dẫn & Đổi mới sáng tạo (VKU-IR)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    phone: '0914 888 999',
    role: 'researcher',
    passwordHash: 'vku12345',
  },
  {
    id: 'usr-vku-03',
    studentCode: '22SC045',
    name: 'Trần Thị Mai Anh',
    email: 'anh.ttm@vku.udn.vn',
    department: 'Khoa Thiết kế Vi mạch & Phần cứng',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    phone: '0982 777 666',
    role: 'student',
    passwordHash: 'vku12345',
  }
];

export const INITIAL_VKU_BOOKINGS: Booking[] = [
  {
    id: 'VKU-BK-1024',
    roomId: 'vku-room-001',
    roomName: 'Lab Vi mạch Bán dẫn Samsung K.205',
    roomBuilding: 'Khu K (Kỹ thuật & CNTT)',
    roomType: 'lab',
    roomImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    date: new Date().toISOString().split('T')[0],
    slotId: 'slot-2',
    slotLabel: '09:45 - 11:45 (Ca 2)',
    bookedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    studentId: '21IT001',
    studentName: 'Lương Thế Nguyên',
    purpose: 'Nghiên cứu thiết kế vi mạch FPGA & Luận văn tốt nghiệp',
    status: 'Confirmed',
  },
  {
    id: 'VKU-BK-1025',
    roomId: 'vku-room-061',
    roomName: 'Sảnh Đọc Mở Tầng 1 (Open Hub A)',
    roomBuilding: 'Thư viện số VKU',
    roomType: 'library',
    roomImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    slotId: 'slot-3',
    slotLabel: '13:00 - 15:00 (Ca 3)',
    bookedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    studentId: '21IT001',
    studentName: 'Lương Thế Nguyên',
    purpose: 'Họp nhóm Capstone Project đề tài AI',
    status: 'Confirmed',
  },
];

class DatabaseService {
  private initialized = false;

  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const isInit = await AsyncStorage.getItem(STORAGE_KEYS.INITIALIZED);
      if (!isInit) {
        // Seed initial 100 VKU rooms, accounts, and demo bookings
        await AsyncStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(VKU_ROOMS));
        await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_VKU_ACCOUNTS));
        await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_VKU_ACCOUNTS[0]));
        await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_VKU_BOOKINGS));
        await AsyncStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
      } else {
        // Ensure rooms have 100 rooms
        const existingRoomsStr = await AsyncStorage.getItem(STORAGE_KEYS.ROOMS);
        if (!existingRoomsStr || JSON.parse(existingRoomsStr).length < 100) {
          await AsyncStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(VKU_ROOMS));
        }

        // Migrate or ensure Lương Thế Nguyên is updated
        const curUserStr = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (curUserStr) {
          const parsed = JSON.parse(curUserStr);
          if (parsed.name === 'Nguyễn Hoàng Nam' || parsed.id === 'usr-vku-01') {
            await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_VKU_ACCOUNTS[0]));
          }
        }
      }
      this.initialized = true;
    } catch (e) {
      console.error('Failed to initialize VKU database:', e);
    }
  }

  // --- ROOMS OPERATIONS ---
  public async getRooms(): Promise<Room[]> {
    await this.initialize();
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ROOMS);
      if (data) {
        return JSON.parse(data);
      }
      return VKU_ROOMS;
    } catch (e) {
      console.error('getRooms error:', e);
      return VKU_ROOMS;
    }
  }

  public async getRoomById(id: string): Promise<Room | undefined> {
    const rooms = await this.getRooms();
    return rooms.find((r) => r.id === id);
  }

  public async updateRoom(updatedRoom: Room): Promise<void> {
    const rooms = await this.getRooms();
    const index = rooms.findIndex((r) => r.id === updatedRoom.id);
    if (index !== -1) {
      rooms[index] = updatedRoom;
      await AsyncStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    }
  }

  public async resetDatabaseToDefault(): Promise<{ roomCount: number }> {
    await AsyncStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(VKU_ROOMS));
    await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_VKU_ACCOUNTS));
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_VKU_ACCOUNTS[0]));
    await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_VKU_BOOKINGS));
    return { roomCount: VKU_ROOMS.length };
  }

  // --- USERS & AUTH OPERATIONS ---
  public async getUsers(): Promise<UserAccount[]> {
    await this.initialize();
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      if (data) {
        return JSON.parse(data);
      }
      return INITIAL_VKU_ACCOUNTS;
    } catch (e) {
      return INITIAL_VKU_ACCOUNTS;
    }
  }

  public async findUserByEmail(email: string): Promise<UserAccount | undefined> {
    const users = await this.getUsers();
    return users.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim());
  }

  public async registerUser(account: Omit<UserAccount, 'id'>): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
    const users = await this.getUsers();
    const existing = users.find(
      (u) =>
        u.email.toLowerCase().trim() === account.email.toLowerCase().trim() ||
        u.studentCode.toLowerCase().trim() === account.studentCode.toLowerCase().trim()
    );

    if (existing) {
      return {
        success: false,
        message: 'Email hoặc Mã sinh viên/Cán bộ đã tồn tại trong hệ thống VKU!',
      };
    }

    const newUser: UserAccount = {
      ...account,
      id: `usr-vku-${Date.now()}`,
    };

    users.push(newUser);
    await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    await this.saveSession(newUser);

    const { passwordHash, ...profile } = newUser;
    return { success: true, user: profile };
  }

  public async loginUser(email: string, password: string): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
    const users = await this.getUsers();
    const user = users.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim());

    if (!user) {
      return {
        success: false,
        message: 'Tài khoản email này chưa được đăng ký trong hệ thống VKU.',
      };
    }

    if (user.passwordHash && user.passwordHash !== password) {
      return {
        success: false,
        message: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.',
      };
    }

    await this.saveSession(user);
    const { passwordHash, ...profile } = user;
    return { success: true, user: profile };
  }

  public async getCurrentSession(): Promise<UserProfile | null> {
    await this.initialize();
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (data) {
        const parsed = JSON.parse(data);
        const { passwordHash, ...profile } = parsed;
        return profile;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  public async saveSession(user: UserAccount | UserProfile): Promise<void> {
    const { passwordHash, ...profile } = user as UserAccount;
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(profile));
  }

  public async clearSession(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  public async updateProfile(updated: UserProfile): Promise<void> {
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === updated.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updated };
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
    await this.saveSession(updated);
  }

  // --- BOOKINGS OPERATIONS ---
  public async getBookings(): Promise<Booking[]> {
    await this.initialize();
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (data) {
        return JSON.parse(data);
      }
      return INITIAL_VKU_BOOKINGS;
    } catch (e) {
      return INITIAL_VKU_BOOKINGS;
    }
  }

  public async saveBookings(bookings: Booking[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }
}

export const dbService = new DatabaseService();
