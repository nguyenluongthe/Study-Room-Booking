import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TimeSlot } from '../types';
import { useRoomDetailsQuery } from '../services/roomService';
import { useBookingStore } from '../store/useBookingStore';
import { SlotSelector } from '../components/SlotSelector';
import { colors } from '../theme/colors';

type RoomDetailRouteProp = RouteProp<RootStackParamList, 'RoomDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RoomDetailModal: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<RoomDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { roomId } = route.params;

  const { data: room, isLoading } = useRoomDetailsQuery(roomId);
  const addBooking = useBookingStore((state) => state.addBooking);
  const user = useBookingStore((state) => state.user);

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [purpose, setPurpose] = useState<string>('Self-study & Group Discussion');
  const [bookingSuccessInfo, setBookingSuccessInfo] = useState<{ id: string } | null>(null);

  const getEarliestAvailableSlot = useBookingStore((state) => state.getEarliestAvailableSlot);

  // Auto pre-select the earliest available slot so user can book in 1 tap without hassle
  React.useEffect(() => {
    if (room && !selectedSlot) {
      const earliest = getEarliestAvailableSlot(room.id);
      if (earliest) {
        setSelectedDate(earliest.date);
        setSelectedSlot(earliest.slot);
      }
    }
  }, [room, getEarliestAvailableSlot]);

  if (isLoading || !room) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Loading room details...</Text>
      </View>
    );
  }

  const handleConfirmBooking = () => {
    if (!selectedSlot) {
      if (Platform.OS === 'web') {
        window.alert('Please select an available time slot before proceeding.');
      } else {
        Alert.alert('Select a Time Slot', 'Please choose an available slot first.');
      }
      return;
    }

    const result = addBooking({
      roomId: room.id,
      roomName: room.name,
      roomBuilding: room.building,
      roomType: room.type,
      roomImage: room.imageUrl,
      date: selectedDate,
      slotId: selectedSlot.id,
      slotLabel: selectedSlot.label,
      purpose: purpose.trim() || 'Study Session',
    });

    if (result.success && result.bookingId) {
      setBookingSuccessInfo({ id: result.bookingId });
    } else {
      if (Platform.OS === 'web') {
        window.alert(result.message);
      } else {
        Alert.alert('Booking Error', result.message);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {room.name}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Room Photo Banner */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: room.imageUrl }} style={styles.image} resizeMode="cover" />
          <View style={styles.capacityBadge}>
            <Ionicons name="people" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.capacityText}>{room.capacity} seats</Text>
          </View>
        </View>

        {/* Room Information */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.locationText}>
                {room.building} • {room.floor}
              </Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.ratingText}>{room.rating}</Text>
            </View>
          </View>

          <Text style={styles.description}>{room.description}</Text>

          {/* Amenities Grid */}
          <Text style={styles.subHeading}>Room Facilities</Text>
          <View style={styles.amenitiesGrid}>
            {room.amenities.map((item, idx) => (
              <View key={idx} style={styles.amenityChip}>
                <Ionicons name="checkmark-circle" size={15} color={colors.primary} />
                <Text style={styles.amenityChipText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Conflict Prevention & Slot Selector */}
          <View style={styles.divider} />
          <SlotSelector
            roomId={room.id}
            selectedDate={selectedDate}
            selectedSlotId={selectedSlot?.id || null}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setSelectedSlot(null); // reset selected slot when date changes
            }}
            onSelectSlot={(slot) => setSelectedSlot(slot)}
          />

          {/* Purpose of Booking */}
          <View style={styles.purposeBox}>
            <Text style={styles.subHeading}>Booking Purpose</Text>
            <TextInput
              style={styles.purposeInput}
              value={purpose}
              onChangeText={setPurpose}
              placeholder="e.g. AI project research, Midterm revision..."
              placeholderTextColor={colors.textMuted}
            />
            <Text style={styles.studentInfoHint}>
              Booking under: <Text style={{ fontWeight: '600' }}>{user.name}</Text> ({user.studentCode})
            </Text>
          </View>

          {/* Success Dialog Modal Card */}
          {bookingSuccessInfo && (
            <View style={styles.successCard}>
              <Ionicons name="checkmark-circle" size={32} color={colors.success} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.successTitle}>Booking Successful!</Text>
                <Text style={styles.successMsg}>
                  Ref ID: <Text style={{ fontWeight: '700' }}>{bookingSuccessInfo.id}</Text>
                </Text>
                <Text style={styles.successMsgSub}>
                  {selectedDate} • {selectedSlot?.label}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.viewBookingsBtn}
                onPress={() => {
                  navigation.goBack();
                  navigation.navigate('MainTabs', { screen: 'MyBookings' });
                }}
              >
                <Text style={styles.viewBookingsBtnText}>My Bookings</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom CTA Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.selectedSlotSummary}>
          <Text style={styles.summaryLabel}>Selected Slot</Text>
          <Text style={styles.summaryValue}>
            {selectedSlot ? `${selectedSlot.label}` : 'No slot chosen'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, !selectedSlot && styles.confirmButtonDisabled]}
          onPress={handleConfirmBooking}
          disabled={!selectedSlot}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm Reservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageContainer: {
    height: 220,
    width: '100%',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  capacityBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  capacityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  infoSection: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  roomName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B45309',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 6,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  amenityChipText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },
  purposeBox: {
    marginTop: 8,
    marginBottom: 16,
  },
  purposeInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 4,
  },
  studentInfoHint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
  },
  successCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 12,
    padding: 14,
    marginVertical: 12,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#15803D',
  },
  successMsg: {
    fontSize: 12,
    color: '#166534',
    marginTop: 2,
  },
  successMsgSub: {
    fontSize: 11,
    color: '#166534',
  },
  viewBookingsBtn: {
    backgroundColor: '#15803D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewBookingsBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  selectedSlotSummary: {
    flex: 1,
    marginRight: 12,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
