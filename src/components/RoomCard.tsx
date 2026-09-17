import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Room } from '../types';
import { useBookingStore } from '../store/useBookingStore';
import { colors } from '../theme/colors';

interface RoomCardProps {
  room: Room;
  onPress: (room: Room) => void;
  onQuickBook: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = React.memo(({ room, onPress, onQuickBook }) => {
  const isAvailable = room.status === 'Available';
  const getEarliestAvailableSlot = useBookingStore((state) => state.getEarliestAvailableSlot);

  // Find next available slot for quick book preview
  const nextSlot = useMemo(() => {
    return getEarliestAvailableSlot(room.id);
  }, [room.id, getEarliestAvailableSlot]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(room)}
      activeOpacity={0.9}
    >
      {/* Room Photo */}
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
            {room.status}
          </Text>
        </View>

        {/* Type pill overlay */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{room.type.toUpperCase()}</Text>
        </View>
      </View>

      {/* Content details */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {room.name}
          </Text>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={13} color="#F59E0B" />
            <Text style={styles.ratingText}>{room.rating}</Text>
          </View>
        </View>

        {/* Building and Floor */}
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.metaText} numberOfLines={1}>
            {room.building} • {room.floor}
          </Text>
        </View>

        {/* Capacity */}
        <View style={styles.metaRow}>
          <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.capacityHighlight}>
            {room.capacity} seats
          </Text>
        </View>

        {/* Amenities preview tags */}
        <View style={styles.amenitiesRow}>
          {room.amenities.slice(0, 3).map((item, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText} numberOfLines={1}>
                {item}
              </Text>
            </View>
          ))}
          {room.amenities.length > 3 && (
            <View style={styles.amenityTag}>
              <Text style={styles.amenityText}>+{room.amenities.length - 3}</Text>
            </View>
          )}
        </View>

        {/* Action Buttons: ⚡ Quick Book & View Details */}
        <View style={styles.footerRow}>
          {nextSlot ? (
            <TouchableOpacity
              style={styles.quickBookBtn}
              onPress={() => onQuickBook(room)}
              activeOpacity={0.8}
            >
              <Ionicons name="flash" size={14} color="#FFFFFF" />
              <Text style={styles.quickBookBtnText}>
                Đặt nhanh {nextSlot.dateLabel} ({nextSlot.slot.startTime})
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.noSlotText}>Hết slot 4 ngày tới</Text>
          )}

          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => onPress(room)}
            activeOpacity={0.7}
          >
            <Text style={styles.detailsBtnText}>Chi tiết</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
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
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusAvailable: {
    backgroundColor: colors.successLight,
    borderColor: '#A7F3D0',
  },
  statusOccupied: {
    backgroundColor: colors.warningLight,
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
    letterSpacing: 0.2,
  },
  typeBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B45309',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  metaText: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
  },
  capacityHighlight: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  amenityTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 11,
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
    marginTop: 2,
    gap: 8,
  },
  quickBookBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  quickBookBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  noSlotText: {
    flex: 1,
    fontSize: 12,
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
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});
