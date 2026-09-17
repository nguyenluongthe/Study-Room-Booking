import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBookingStore } from '../store/useBookingStore';
import { BUILDINGS, CAPACITY_OPTIONS } from '../data/mockRooms';
import { colors } from '../theme/colors';

export const FilterBar: React.FC = () => {
  const filters = useBookingStore((state) => state.filters);
  const setSearch = useBookingStore((state) => state.setSearch);
  const setBuildingFilter = useBookingStore((state) => state.setBuildingFilter);
  const setCapacityFilter = useBookingStore((state) => state.setCapacityFilter);
  const setOnlyAvailableFilter = useBookingStore((state) => state.setOnlyAvailableFilter);
  const resetFilters = useBookingStore((state) => state.resetFilters);

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.building !== null ||
    filters.minCapacity !== null ||
    filters.onlyAvailable;

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rooms, labs, amenities..."
            placeholderTextColor={colors.textMuted}
            value={filters.search}
            onChangeText={setSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {filters.search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {hasActiveFilters && (
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Ionicons name="refresh" size={14} color={colors.primary} />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Buildings Chip Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {BUILDINGS.map((b) => {
          const isSelected = (!filters.building && b === 'All') || filters.building === b;
          return (
            <TouchableOpacity
              key={b}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => setBuildingFilter(b)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                {b}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Capacity & Availability Quick Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.chipRow, styles.subChipRow]}
      >
        {/* Toggle Available Only */}
        <TouchableOpacity
          style={[styles.smallChip, filters.onlyAvailable && styles.smallChipActive]}
          onPress={() => setOnlyAvailableFilter(!filters.onlyAvailable)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={filters.onlyAvailable ? 'checkmark-circle' : 'radio-button-off'}
            size={14}
            color={filters.onlyAvailable ? '#FFFFFF' : colors.textSecondary}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.smallChipText,
              filters.onlyAvailable && styles.smallChipTextActive,
            ]}
          >
            Available Only
          </Text>
        </TouchableOpacity>

        {/* Capacity chips */}
        {CAPACITY_OPTIONS.map((cap) => {
          const isSelected = filters.minCapacity === cap.value;
          return (
            <TouchableOpacity
              key={cap.label}
              style={[styles.smallChip, isSelected && styles.smallChipActive]}
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
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
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
    fontWeight: '600',
    color: colors.primary,
  },
  chipRow: {
    paddingVertical: 4,
    gap: 8,
  },
  subChipRow: {
    paddingTop: 6,
    paddingBottom: 2,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.chipInactive,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.chipActive,
    borderColor: colors.chipActive,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.chipInactiveText,
  },
  chipTextActive: {
    color: colors.chipActiveText,
    fontWeight: '600',
  },
  smallChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
  },
  smallChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  smallChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  smallChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
