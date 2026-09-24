import type { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RoomType = 'all' | 'lab' | 'library' | 'study_pod' | 'conference';

export type RoomStatus = 'Available' | 'Occupied';

export interface TimeSlot {
  id: string;
  label: string; // e.g. "08:00 - 10:00"
  startTime: string;
  endTime: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
}

export interface Room {
  id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  type: RoomType;
  imageUrl: string;
  amenities: string[];
  description: string;
  rating: number;
  status: RoomStatus;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  roomBuilding: string;
  roomType: RoomType;
  roomImage: string;
  date: string; // YYYY-MM-DD
  slotId: string;
  slotLabel: string;
  bookedAt: string;
  studentId: string;
  studentName: string;
  purpose: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface FilterState {
  search: string;
  building: string | null;
  minCapacity: number | null;
  roomType: RoomType | 'all';
  onlyAvailable: boolean;
}

export interface UserProfile {
  id: string;
  studentCode: string;
  name: string;
  email: string;
  department: string;
  avatarUrl: string;
  phone: string;
  role?: 'student' | 'lecturer' | 'researcher';
}

export interface UserAccount extends UserProfile {
  passwordHash?: string;
}

export type TabParamList = {
  BrowseRooms: undefined;
  MyBookings: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  RoomDetail: { roomId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
