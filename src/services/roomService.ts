import { useQuery } from '@tanstack/react-query';
import { dbService } from './dbService';
import { FilterState, Room } from '../types';

export const fetchRooms = async (filters: FilterState): Promise<Room[]> => {
  // Query from persistent DB
  const allRooms = await dbService.getRooms();

  return allRooms.filter((room) => {
    // 1. Search query
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const matchName = room.name.toLowerCase().includes(q);
      const matchBuilding = room.building.toLowerCase().includes(q);
      const matchFloor = room.floor.toLowerCase().includes(q);
      const matchDesc = room.description.toLowerCase().includes(q);
      const matchAmenities = room.amenities.some((a) => a.toLowerCase().includes(q));
      if (!matchName && !matchBuilding && !matchFloor && !matchDesc && !matchAmenities) return false;
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
  return dbService.getRoomById(roomId);
};

export const useRoomsQuery = (filters: FilterState) => {
  return useQuery({
    queryKey: ['rooms', filters],
    queryFn: () => fetchRooms(filters),
    staleTime: 1000 * 30, // 30 seconds
  });
};

export const useRoomDetailsQuery = (roomId: string) => {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => fetchRoomById(roomId),
    enabled: !!roomId,
    staleTime: 1000 * 60,
  });
};
