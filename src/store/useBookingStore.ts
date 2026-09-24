import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking, FilterState, Room, RoomType, TimeSlot, UserProfile } from '../types';
import { MOCK_ROOMS, TIME_SLOTS } from '../data/mockRooms';

const INITIAL_USER: UserProfile = {
  id: 'usr-1',
  studentCode: 'STU-2024-8891',
  name: 'Alex Nguyen',
  email: 'alex.nguyen@campus.edu.vn',
  department: 'Computer Science & Software Eng.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  phone: '+84 901 234 567',
};

const getTodayDateString = (offsetDays: number = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-10024',
    roomId: 'room-1',
    roomName: 'Lab A3-101',
    roomBuilding: 'Building A3',
    roomType: 'lab',
    roomImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    date: getTodayDateString(0),
    slotId: 'slot-2',
    slotLabel: '10:00 - 12:00',
    bookedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    studentId: 'STU-2024-8891',
    studentName: 'Alex Nguyen',
    purpose: 'Capstone Project Team Sync',
    status: 'Confirmed',
  },
  {
    id: 'BK-10025',
    roomId: 'room-2',
    roomName: 'Library Zone B',
    roomBuilding: 'Main Library',
    roomType: 'library',
    roomImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    date: getTodayDateString(1),
    slotId: 'slot-3',
    slotLabel: '13:00 - 15:00',
    bookedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    studentId: 'STU-2024-8891',
    studentName: 'Alex Nguyen',
    purpose: 'Algorithmic Research Reading',
    status: 'Confirmed',
  },
  {
    id: 'BK-10019',
    roomId: 'room-1',
    roomName: 'Lab A3-101',
    roomBuilding: 'Building A3',
    roomType: 'lab',
    roomImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    date: getTodayDateString(-1),
    slotId: 'slot-1',
    slotLabel: '08:00 - 10:00',
    bookedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    studentId: 'STU-2024-8891',
    studentName: 'Alex Nguyen',
    purpose: 'Lab Practical Preparation',
    status: 'Completed',
  }
];

interface BookingStoreState {
  user: UserProfile;
  bookings: Booking[];
  filters: FilterState;
  
  // Booking actions
  addBooking: (
    bookingData: Omit<Booking, 'id' | 'bookedAt' | 'status' | 'studentId' | 'studentName'>
  ) => { success: boolean; message: string; bookingId?: string };
  cancelBooking: (bookingId: string) => void;
  isSlotBooked: (roomId: string, date: string, slotId: string) => boolean;
  
  // Fast 1-Tap Quick Booking
  getEarliestAvailableSlot: (roomId: string) => { date: string; dateLabel: string; slot: TimeSlot } | null;
  quickBookRoom: (room: Room) => { success: boolean; message: string; booking?: Booking };

  // Filter actions
  setSearch: (search: string) => void;
  setBuildingFilter: (building: string | null) => void;
  setCapacityFilter: (minCapacity: number | null) => void;
  setRoomTypeFilter: (roomType: RoomType | 'all') => void;
  setOnlyAvailableFilter: (onlyAvailable: boolean) => void;
  resetFilters: () => void;
}

export const useBookingStore = create<BookingStoreState>()(
  persist(
    (set, get) => ({
      user: INITIAL_USER,
      bookings: INITIAL_BOOKINGS,
      filters: {
        search: '',
        building: null,
        minCapacity: null,
        roomType: 'all',
        onlyAvailable: false,
      },

  addBooking: (bookingData) => {
    const { bookings, user } = get();

    // Conflict prevention check: same room, same date, same slotId that is Confirmed
    const hasConflict = bookings.some(
      (b) =>
        b.roomId === bookingData.roomId &&
        b.date === bookingData.date &&
        b.slotId === bookingData.slotId &&
        b.status === 'Confirmed'
    );

    if (hasConflict) {
      return {
        success: false,
        message: 'Conflict detected: This time slot is already reserved for this room!',
      };
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBookingId = `BK-${randomSuffix}`;

    const newBooking: Booking = {
      ...bookingData,
      id: newBookingId,
      studentId: user.studentCode,
      studentName: user.name,
      bookedAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    set((state) => ({
      bookings: [newBooking, ...state.bookings],
    }));

    return {
      success: true,
      message: `Reservation confirmed! Booking ID: ${newBookingId}`,
      bookingId: newBookingId,
    };
  },

  cancelBooking: (bookingId: string) => {
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b
      ),
    }));
  },

  isSlotBooked: (roomId: string, date: string, slotId: string) => {
    const { bookings } = get();
    return bookings.some(
      (b) =>
        b.roomId === roomId &&
        b.date === date &&
        b.slotId === slotId &&
        b.status === 'Confirmed'
    );
  },

  getEarliestAvailableSlot: (roomId: string) => {
    const { isSlotBooked } = get();
    // Check up to next 4 days
    for (let dayOffset = 0; dayOffset < 4; dayOffset++) {
      const dateStr = getTodayDateString(dayOffset);
      const dateLabel = dayOffset === 0 ? 'Today' : dayOffset === 1 ? 'Tomorrow' : `+${dayOffset}d`;
      for (const slot of TIME_SLOTS) {
        if (!isSlotBooked(roomId, dateStr, slot.id)) {
          return { date: dateStr, dateLabel, slot };
        }
      }
    }
    return null;
  },

  quickBookRoom: (room: Room) => {
    const { getEarliestAvailableSlot, addBooking, bookings } = get();
    const earliest = getEarliestAvailableSlot(room.id);
    if (!earliest) {
      return {
        success: false,
        message: 'No available slots left in the next 4 days for this room!',
      };
    }

    const res = addBooking({
      roomId: room.id,
      roomName: room.name,
      roomBuilding: room.building,
      roomType: room.type,
      roomImage: room.imageUrl,
      date: earliest.date,
      slotId: earliest.slot.id,
      slotLabel: earliest.slot.label,
      purpose: '⚡ Quick 1-Tap Booking',
    });

    if (res.success && res.bookingId) {
      const created = get().bookings.find((b) => b.id === res.bookingId);
      return {
        success: true,
        message: `Đã đặt nhanh phòng ${room.name} (${earliest.dateLabel}, ${earliest.slot.label})! Mã: ${res.bookingId}`,
        booking: created,
      };
    }

    return {
      success: false,
      message: res.message,
    };
  },

  setSearch: (search: string) => {
    set((state) => ({
      filters: { ...state.filters, search },
    }));
  },

  setBuildingFilter: (building: string | null) => {
    set((state) => ({
      filters: { ...state.filters, building: building === 'All' ? null : building },
    }));
  },

  setCapacityFilter: (minCapacity: number | null) => {
    set((state) => ({
      filters: { ...state.filters, minCapacity },
    }));
  },

  setRoomTypeFilter: (roomType: RoomType | 'all') => {
    set((state) => ({
      filters: { ...state.filters, roomType },
    }));
  },

  setOnlyAvailableFilter: (onlyAvailable: boolean) => {
    set((state) => ({
      filters: { ...state.filters, onlyAvailable },
    }));
  },

  resetFilters: () => {
    set(() => ({
      filters: {
        search: '',
        building: null,
        minCapacity: null,
        roomType: 'all',
        onlyAvailable: false,
      },
    }));
  },
}),
    {
      name: 'study-room-booking-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        bookings: state.bookings,
        user: state.user,
      }),
    }
  )
);

