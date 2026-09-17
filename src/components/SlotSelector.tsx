import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TIME_SLOTS } from '../data/mockRooms';
import { TimeSlot } from '../types';
import { useBookingStore } from '../store/useBookingStore';
import { colors } from '../theme/colors';

interface SlotSelectorProps {
  roomId: string;
  selectedDate: string;
  selectedSlotId: string | null;
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const SlotSelector: React.FC<SlotSelectorProps> = ({
  roomId,
  selectedDate,
  selectedSlotId,
  onSelectDate,
  onSelectSlot,
}) => {
  const isSlotBooked = useBookingStore((state) => state.isSlotBooked);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Generate 5 consecutive selectable days
  const dateOptions = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      dates.push({ iso, dayName, dayNum, monthName });
    }
    return dates;
  }, []);

  const handleSlotPress = (slot: TimeSlot, isBooked: boolean) => {
    if (isBooked) {
      setConflictWarning(
        `Slot "${slot.label}" is already reserved for this date. Please choose another slot.`
      );
      return;
    }
    setConflictWarning(null);
    onSelectSlot(slot);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>1. Select Booking Date</Text>
      
      {/* Date selector pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateList}
      >
        {dateOptions.map((item) => {
          const isSelected = selectedDate === item.iso;
          return (
            <TouchableOpacity
              key={item.iso}
              style={[styles.dateCard, isSelected && styles.dateCardActive]}
              onPress={() => {
                setConflictWarning(null);
                onSelectDate(item.iso);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.dateDayName, isSelected && styles.textWhite]}>
                {item.dayName}
              </Text>
              <Text style={[styles.dateDayNum, isSelected && styles.textWhite]}>
                {item.dayNum}
              </Text>
              <Text style={[styles.dateMonth, isSelected && styles.textWhite]}>
                {item.monthName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Time Slots */}
      <View style={styles.slotHeaderRow}>
        <Text style={styles.sectionTitle}>2. Choose Available Time Slot</Text>
        <View style={styles.legend}>
          <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
          <Text style={styles.legendText}>Free</Text>
          <View style={[styles.legendDot, { backgroundColor: '#CBD5E1', marginLeft: 8 }]} />
          <Text style={styles.legendText}>Booked</Text>
        </View>
      </View>

      {/* Conflict banner alert */}
      {conflictWarning && (
        <View style={styles.warningBanner}>
          <Ionicons name="alert-circle" size={18} color={colors.error} style={{ marginRight: 8 }} />
          <Text style={styles.warningText}>{conflictWarning}</Text>
        </View>
      )}

      {/* Slot list */}
      <View style={styles.slotGrid}>
        {TIME_SLOTS.map((slot) => {
          const isBooked = isSlotBooked(roomId, selectedDate, slot.id);
          const isSelected = selectedSlotId === slot.id && !isBooked;

          return (
            <TouchableOpacity
              key={slot.id}
              disabled={isBooked}
              style={[
                styles.slotItem,
                isSelected && styles.slotItemSelected,
                isBooked && styles.slotItemBooked,
              ]}
              onPress={() => handleSlotPress(slot, isBooked)}
              activeOpacity={0.7}
            >
              <View style={styles.slotInfo}>
                <View style={styles.slotPeriodBadge}>
                  <Text
                    style={[
                      styles.slotPeriodText,
                      isSelected && styles.textWhite,
                      isBooked && styles.textBooked,
                    ]}
                  >
                    {slot.period}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.slotTime,
                    isSelected && styles.textWhite,
                    isBooked && styles.textBooked,
                  ]}
                >
                  {slot.label}
                </Text>
              </View>

              {/* Status pill right */}
              {isBooked ? (
                <View style={styles.badgeBooked}>
                  <Ionicons name="lock-closed" size={12} color="#64748B" />
                  <Text style={styles.badgeBookedText}>Reserved</Text>
                </View>
              ) : isSelected ? (
                <View style={styles.badgeSelected}>
                  <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.badgeAvailable}>
                  <Text style={styles.badgeAvailableText}>Available</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  dateList: {
    gap: 10,
    paddingVertical: 6,
    marginBottom: 16,
  },
  dateCard: {
    width: 72,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateDayName: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dateDayNum: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginVertical: 2,
  },
  dateMonth: {
    fontSize: 11,
    color: colors.textMuted,
  },
  textWhite: {
    color: '#FFFFFF',
  },
  slotHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorLight,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  warningText: {
    fontSize: 12,
    color: colors.error,
    fontWeight: '500',
    flex: 1,
  },
  slotGrid: {
    gap: 8,
  },
  slotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  slotItemSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  slotItemBooked: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
    opacity: 0.7,
  },
  slotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slotPeriodBadge: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  slotPeriodText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  slotTime: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  textBooked: {
    color: colors.textMuted,
  },
  badgeBooked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeBookedText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  badgeAvailable: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgeAvailableText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '600',
  },
  badgeSelected: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
