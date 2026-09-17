import { useQuery } from '@tanstack/react-query';
import { MOCK_ROOMS } from '../data/mockRooms';
import { FilterState, Room } from '../types';

export const fetchRooms = async (filters: FilterState): Promise<Room[]> => {
  // Simulate network roundtrip latency (150ms)
  await new Promise((resolve) => setTimeout(resolve, 150));

  return MOCK_ROOMS.filter((room) => {
    // 1. Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const matchName = room.name.toLowerCase().includes(q);
      const matchBuilding = room.building.toLowerCase().includes(q);
      const matchAmenities = room.amenities.some((a) => a.toLowerCase().includes(q));
      if (!matchName && !matchBuilding && !matchAmenities) return false;
    }

    // 2. Building filter
    if (filters.building && filters.building !== 'All') {
      if (room.building !== filters.building) return false;
    }

    // 3. Min Capacity filter
    if (filters.minCapacity !== null) {
      if (room.capacity < filters.minCapacity) return false;
    }

    // 4. Room Type filter
    if (filters.roomType && filters.roomType !== 'all') {
      if (room.type !== filters.roomType) return false;
    }

    // 5. Only Available filter
    if (filters.onlyAvailable) {
      if (room.status !== 'Available') return false;
    }

    return true;
  });
};

export const fetchRoomById = async (roomId: string): Promise<Room | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_ROOMS.find((r) => r.id === roomId);
};

export const useRoomsQuery = (filters: FilterState) => {
  return useQuery({
    queryKey: ['rooms', filters],
    queryFn: () => fetchRooms(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useRoomDetailsQuery = (roomId: string) => {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => fetchRoomById(roomId),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 5,
  });
};
