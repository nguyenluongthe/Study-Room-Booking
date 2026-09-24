import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking, FilterState, Room, RoomType, TimeSlot } from '../types';
import { TIME_SLOTS } from '../data/vkuRooms';
import { dbService, INITIAL_VKU_BOOKINGS } from '../services/dbService';
import { useAuthStore } from './useAuthStore';

const getTodayDateString = (offsetDays: number = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

interface BookingStoreState {
  bookings: Booking[];
  filters: FilterState;

  // Initializer & Sync
  loadBookingsFromDb: () => Promise<void>;

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
      bookings: INITIAL_VKU_BOOKINGS,
      filters: {
        search: '',
        building: null,
        minCapacity: null,
        roomType: 'all',
        onlyAvailable: false,
      },

      loadBookingsFromDb: async () => {
        try {
          const fromDb = await dbService.getBookings();
          if (fromDb && fromDb.length > 0) {
            set({ bookings: fromDb });
          }
        } catch (e) {
          console.error('loadBookingsFromDb error:', e);
        }
      },

      addBooking: (bookingData) => {
        const { bookings } = get();
        const currentUser = useAuthStore.getState().user;

        const studentId = currentUser ? currentUser.studentCode : 'VKU-2024';
        const studentName = currentUser ? currentUser.name : 'Sinh viên VKU';

        // Conflict check
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
            message: 'Khung giờ này đã có người đặt trước! Vui lòng chọn ca học hoặc ngày khác.',
          };
        }

        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const newBookingId = `VKU-BK-${randomSuffix}`;

        const newBooking: Booking = {
          ...bookingData,
          id: newBookingId,
          studentId,
          studentName,
          bookedAt: new Date().toISOString(),
          status: 'Confirmed',
        };

        const updated = [newBooking, ...bookings];
        set({ bookings: updated });
        dbService.saveBookings(updated);

        return {
          success: true,
          message: `Xác nhận giữ chỗ thành công! Mã phiếu: ${newBookingId}`,
          bookingId: newBookingId,
        };
      },

      cancelBooking: (bookingId: string) => {
        const updated = get().bookings.map((b) =>
          b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b
        );
        set({ bookings: updated });
        dbService.saveBookings(updated);
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
        // Check next 4 days
        for (let dayOffset = 0; dayOffset < 4; dayOffset++) {
          const dateStr = getTodayDateString(dayOffset);
          const dateLabel = dayOffset === 0 ? 'Hôm nay' : dayOffset === 1 ? 'Ngày mai' : `+${dayOffset} ngày`;
          for (const slot of TIME_SLOTS) {
            if (!isSlotBooked(roomId, dateStr, slot.id)) {
              return { date: dateStr, dateLabel, slot };
            }
          }
        }
        return null;
      },

      quickBookRoom: (room: Room) => {
        const { getEarliestAvailableSlot, addBooking } = get();
        const earliest = getEarliestAvailableSlot(room.id);
        if (!earliest) {
          return {
            success: false,
            message: 'Phòng này hiện đã kín tất cả các ca trong 4 ngày tới!',
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
          purpose: '⚡ Đặt nhanh 1-Chạm qua ứng dụng VKU Space',
        });

        if (res.success && res.bookingId) {
          const created = get().bookings.find((b) => b.id === res.bookingId);
          return {
            success: true,
            message: `Đặt thành công phòng ${room.name} (${earliest.dateLabel} - ${earliest.slot.label})! Mã: ${res.bookingId}`,
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
      name: 'vku-booking-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        bookings: state.bookings,
      }),
    }
  )
);
