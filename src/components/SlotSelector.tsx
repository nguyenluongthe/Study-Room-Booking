import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TIME_SLOTS } from '../data/vkuRooms';
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
      const dayName = i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : `Thứ ${d.getDay() === 0 ? 'CN' : d.getDay() + 1}`;
      const dayNum = d.getDate();
      const monthName = `Th${d.getMonth() + 1}`;
      dates.push({ iso, dayName, dayNum, monthName });
    }
    return dates;
  }, []);

  const handleSlotPress = (slot: TimeSlot, isBooked: boolean) => {
    if (isBooked) {
      setConflictWarning(
        `Ca học "${slot.label}" đã có sinh viên hoặc giảng viên đăng ký trước. Vui lòng chọn ca khác.`
      );
      return;
    }
    setConflictWarning(null);
    onSelectSlot(slot);
  };

  const periodLabels: Record<string, string> = {
    Morning: 'Buổi Sáng',
    Afternoon: 'Buổi Chiều',
    Evening: 'Buổi Tối',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>1. Chọn ngày học tập / nghiên cứu</Text>

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
              style={[styles.dateCard, isSelected && styles.dateCardActive, styles.pointerCursor]}
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
        <Text style={styles.sectionTitle}>2. Chọn ca học tập (VKU Time Slot)</Text>
        <View style={styles.legend}>
          <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
          <Text style={styles.legendText}>Trống</Text>
          <View style={[styles.legendDot, { backgroundColor: '#CBD5E1', marginLeft: 8 }]} />
          <Text style={styles.legendText}>Đã đặt</Text>
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
                !isBooked && styles.pointerCursor,
              ]}
              onPress={() => handleSlotPress(slot, isBooked)}
              activeOpacity={0.7}
            >
              <View style={styles.slotInfo}>
                <View style={[styles.slotPeriodBadge, isSelected && styles.slotPeriodBadgeSelected]}>
                  <Text
                    style={[
                      styles.slotPeriodText,
                      isSelected && styles.textWhite,
                      isBooked && styles.textBooked,
                    ]}
                  >
                    {periodLabels[slot.period] || slot.period}
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
                  <Ionicons name="lock-closed" size={11} color="#64748B" />
                  <Text style={styles.badgeBookedText}>Đã có lớp</Text>
                </View>
              ) : isSelected ? (
                <View style={styles.badgeSelected}>
                  <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.badgeAvailable}>
                  <Text style={styles.badgeAvailableText}>Có thể đặt</Text>
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
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  dateList: {
    gap: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  dateCard: {
    width: 76,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  dateCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateDayName: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  dateDayNum: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginVertical: 2,
  },
  dateMonth: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  textWhite: {
    color: '#FFFFFF',
  },
  slotHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.errorBorder,
  },
  warningText: {
    fontSize: 12,
    color: colors.error,
    fontWeight: '600',
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
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  slotItemSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  slotItemBooked: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
    opacity: 0.65,
  },
  slotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  slotPeriodBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  slotPeriodBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  slotPeriodText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  slotTime: {
    fontSize: 13,
    fontWeight: '700',
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
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
  },
  badgeAvailable: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  badgeAvailableText: {
    fontSize: 10,
    color: colors.success,
    fontWeight: '700',
  },
  badgeSelected: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
