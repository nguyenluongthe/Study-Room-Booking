import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Room } from '../types';
import { useBookingStore } from '../store/useBookingStore';
import { colors } from '../theme/colors';

interface RoomCardProps {
  room: Room;
  index?: number;
  onPress: (room: Room) => void;
  onQuickBook: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = React.memo(({ room, index = 0, onPress, onQuickBook }) => {
  const isAvailable = room.status === 'Available';
  const getEarliestAvailableSlot = useBookingStore((state) => state.getEarliestAvailableSlot);

  // Find next available slot for quick book preview
  const nextSlot = useMemo(() => {
    return getEarliestAvailableSlot(room.id);
  }, [room.id, getEarliestAvailableSlot]);

  const typeLabels: Record<string, string> = {
    lab: 'LAB THỰC HÀNH',
    library: 'THƯ VIỆN SỐ',
    study_pod: 'POD TỰ HỌC',
    conference: 'HỘI TRƯỜNG / LỚP',
  };

  return (
    <Animated.View
      style={styles.animatedWrapper}
      entering={FadeInDown.delay(Math.min(index * 30, 200)).duration(300).springify().damping(16)}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(room)}
        activeOpacity={0.92}
      >
        {/* Room Photo Banner */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: room.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Status Badge overlay */}
          <View
            style={[
              styles.statusBadge,
              isAvailable ? styles.statusAvailable : styles.statusOccupied,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isAvailable ? colors.success : colors.warning },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: isAvailable ? colors.success : '#B45309' },
              ]}
            >
              {isAvailable ? 'Đang mở' : 'Đã kín lịch'}
            </Text>
          </View>

          {/* Room Type badge */}
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{typeLabels[room.type] || room.type.toUpperCase()}</Text>
          </View>

          {/* Capacity pill */}
          <View style={styles.capacityBadge}>
            <Ionicons name="people" size={12} color="#FFFFFF" />
            <Text style={styles.capacityText}>{room.capacity} chỗ</Text>
          </View>
        </View>

        {/* Content details */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1}>
              {room.name}
            </Text>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingText}>{room.rating.toFixed(2)}</Text>
            </View>
          </View>

          {/* Building and Floor */}
          <View style={styles.metaRow}>
            <Ionicons name="business-outline" size={14} color={colors.primary} />
            <Text style={styles.metaText} numberOfLines={1}>
              <Text style={{ fontWeight: '600', color: colors.textPrimary }}>{room.building}</Text> • {room.floor}
            </Text>
          </View>

          {/* Description snippet */}
          <Text style={styles.descSnippet} numberOfLines={2}>
            {room.description}
          </Text>

          {/* Amenities tags */}
          <View style={styles.amenitiesRow}>
            {room.amenities.slice(0, 3).map((item, idx) => (
              <View key={idx} style={styles.amenityTag}>
                <Ionicons name="checkmark-circle-outline" size={11} color={colors.primary} style={{ marginRight: 3 }} />
                <Text style={styles.amenityText} numberOfLines={1}>
                  {item}
                </Text>
              </View>
            ))}
            {room.amenities.length > 3 && (
              <View style={[styles.amenityTag, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.amenityText, { color: colors.primary, fontWeight: '700' }]}>
                  +{room.amenities.length - 3}
                </Text>
              </View>
            )}
          </View>

          {/* Footer Actions */}
          <View style={styles.footerRow}>
            {nextSlot ? (
              <TouchableOpacity
                style={[styles.quickBookBtn, styles.pointerCursor]}
                onPress={() => onQuickBook(room)}
                activeOpacity={0.8}
              >
                <Ionicons name="flash" size={13} color="#FFFFFF" />
                <Text style={styles.quickBookBtnText} numberOfLines={1}>
                  Đặt {nextSlot.dateLabel} ({nextSlot.slot.startTime})
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.noSlotBox}>
                <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                <Text style={styles.noSlotText}>Kín slot 4 ngày</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.detailsBtn, styles.pointerCursor]}
              onPress={() => onPress(room)}
              activeOpacity={0.7}
            >
              <Text style={styles.detailsBtnText}>Chi tiết</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  animatedWrapper: {
    flex: 1,
    minWidth: 280,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.07)',
        cursor: 'pointer',
      },
    }),
  },
  imageWrapper: {
    height: 160,
    width: '100%',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusAvailable: {
    backgroundColor: 'rgba(236, 253, 245, 0.95)',
    borderColor: '#A7F3D0',
  },
  statusOccupied: {
    backgroundColor: 'rgba(255, 251, 235, 0.95)',
    borderColor: '#FDE68A',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  typeBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(10, 37, 64, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  capacityBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  capacityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: 14,
    flex: 1,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 6,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
  },
  descSnippet: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 6,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  amenityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 10,
    marginTop: 4,
    gap: 6,
  },
  quickBookBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 4,
  },
  quickBookBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  noSlotBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noSlotText: {
    fontSize: 11,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  detailsBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
