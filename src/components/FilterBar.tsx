import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBookingStore } from '../store/useBookingStore';
import { VKU_BUILDINGS, CAPACITY_OPTIONS } from '../data/vkuRooms';
import { RoomType } from '../types';
import { colors } from '../theme/colors';

const ROOM_TYPES: { label: string; value: RoomType | 'all'; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Tất cả', value: 'all', icon: 'grid-outline' },
  { label: 'Lab & Thực hành', value: 'lab', icon: 'hardware-chip-outline' },
  { label: 'Thư viện số', value: 'library', icon: 'book-outline' },
  { label: 'Pod Tự học', value: 'study_pod', icon: 'cube-outline' },
  { label: 'Hội trường & Lớp', value: 'conference', icon: 'easel-outline' },
];

export const FilterBar: React.FC = () => {
  const filters = useBookingStore((state) => state.filters);
  const setSearch = useBookingStore((state) => state.setSearch);
  const setBuildingFilter = useBookingStore((state) => state.setBuildingFilter);
  const setCapacityFilter = useBookingStore((state) => state.setCapacityFilter);
  const setRoomTypeFilter = useBookingStore((state) => state.setRoomTypeFilter);
  const setOnlyAvailableFilter = useBookingStore((state) => state.setOnlyAvailableFilter);
  const resetFilters = useBookingStore((state) => state.resetFilters);

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.building !== null ||
    filters.minCapacity !== null ||
    filters.roomType !== 'all' ||
    filters.onlyAvailable;

  return (
    <View style={styles.container}>
      {/* Search Input Box */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tên phòng (K.205, V.A101...), thiết bị, khu vực..."
            placeholderTextColor={colors.textMuted}
            value={filters.search}
            onChangeText={setSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {filters.search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.pointerCursor}
            >
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {hasActiveFilters && (
          <TouchableOpacity
            style={[styles.resetButton, styles.pointerCursor]}
            onPress={resetFilters}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh-outline" size={14} color={colors.primary} />
            <Text style={styles.resetText}>Đặt lại</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Buildings Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {VKU_BUILDINGS.map((b) => {
          const isSelected = (!filters.building && b === 'All') || filters.building === b;
          return (
            <TouchableOpacity
              key={b}
              style={[styles.buildingChip, isSelected && styles.buildingChipActive, styles.pointerCursor]}
              onPress={() => setBuildingFilter(b)}
              activeOpacity={0.7}
            >
              <Text style={[styles.buildingChipText, isSelected && styles.buildingChipTextActive]}>
                {b === 'All' ? 'Tất cả khu' : b}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Room Type & Filter Options */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.chipRow, styles.subChipRow]}
      >
        {/* Toggle Available Only */}
        <TouchableOpacity
          style={[styles.smallChip, filters.onlyAvailable && styles.smallChipActive, styles.pointerCursor]}
          onPress={() => setOnlyAvailableFilter(!filters.onlyAvailable)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={filters.onlyAvailable ? 'checkmark-circle' : 'ellipse-outline'}
            size={14}
            color={filters.onlyAvailable ? '#FFFFFF' : colors.success}
            style={{ marginRight: 5 }}
          />
          <Text
            style={[
              styles.smallChipText,
              filters.onlyAvailable && styles.smallChipTextActive,
            ]}
          >
            Đang trống
          </Text>
        </TouchableOpacity>

        {/* Room Type Chips */}
        {ROOM_TYPES.map((type) => {
          const isSelected = filters.roomType === type.value;
          return (
            <TouchableOpacity
              key={type.value}
              style={[styles.smallChip, isSelected && styles.smallChipActive, styles.pointerCursor]}
              onPress={() => setRoomTypeFilter(type.value)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={type.icon}
                size={13}
                color={isSelected ? '#FFFFFF' : colors.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.smallChipText,
                  isSelected && styles.smallChipTextActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Capacity options */}
        {CAPACITY_OPTIONS.slice(1).map((cap) => {
          const isSelected = filters.minCapacity === cap.value;
          return (
            <TouchableOpacity
              key={cap.label}
              style={[styles.smallChip, isSelected && styles.smallChipActive, styles.pointerCursor]}
              onPress={() => setCapacityFilter(isSelected ? null : cap.value)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="people-outline"
                size={13}
                color={isSelected ? '#FFFFFF' : colors.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.smallChipText,
                  isSelected && styles.smallChipTextActive,
                ]}
              >
                {cap.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  chipRow: {
    paddingVertical: 4,
    gap: 6,
  },
  subChipRow: {
    paddingTop: 4,
    paddingBottom: 2,
  },
  buildingChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buildingChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buildingChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  buildingChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  smallChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
  },
  smallChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  smallChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  smallChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
