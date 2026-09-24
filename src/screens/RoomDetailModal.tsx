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
import { useAuthStore } from '../store/useAuthStore';
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
  const currentUser = useAuthStore((state) => state.user);

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [purpose, setPurpose] = useState<string>('Nghiên cứu khoa học & Học tập nhóm VKU');
  const [bookingSuccessInfo, setBookingSuccessInfo] = useState<{ id: string } | null>(null);

  const getEarliestAvailableSlot = useBookingStore((state) => state.getEarliestAvailableSlot);

  // Auto pre-select earliest available slot for friction-free booking
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
        <Text style={styles.loadingText}>Đang tải thông tin phòng học VKU...</Text>
      </View>
    );
  }

  const handleConfirmBooking = () => {
    if (!selectedSlot) {
      const msg = 'Vui lòng chọn ca học còn trống trước khi bấm xác nhận.';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Chưa chọn ca học', msg);
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
      purpose: purpose.trim() || 'Học tập & Nghiên cứu',
    });

    if (result.success && result.bookingId) {
      setBookingSuccessInfo({ id: result.bookingId });
    } else {
      if (Platform.OS === 'web') {
        window.alert(result.message);
      } else {
        Alert.alert('Không thể đặt phòng', result.message);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.webContainer}>
        {/* Top Header Bar */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={[styles.backButton, styles.pointerCursor]}
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
              <Ionicons name="people" size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.capacityText}>{room.capacity} chỗ ngồi</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{room.building}</Text>
            </View>
          </View>

          {/* Room Information */}
          <View style={styles.infoSection}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.roomName}>{room.name}</Text>
                <Text style={styles.locationText}>
                  <Ionicons name="location-sharp" size={13} color={colors.primary} />{' '}
                  {room.building} • {room.floor}
                </Text>
              </View>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={15} color="#F59E0B" />
                <Text style={styles.ratingText}>{room.rating.toFixed(2)}</Text>
              </View>
            </View>

            <Text style={styles.description}>{room.description}</Text>

            {/* Amenities Grid */}
            <Text style={styles.subHeading}>Trang thiết bị & Tiện nghi phòng</Text>
            <View style={styles.amenitiesGrid}>
              {room.amenities.map((item, idx) => (
                <View key={idx} style={styles.amenityChip}>
                  <Ionicons name="checkmark-circle" size={15} color={colors.primary} />
                  <Text style={styles.amenityChipText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Slot Selector */}
            <View style={styles.divider} />
            <SlotSelector
              roomId={room.id}
              selectedDate={selectedDate}
              selectedSlotId={selectedSlot?.id || null}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
              }}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
            />

            {/* Purpose of Booking */}
            <View style={styles.purposeBox}>
              <Text style={styles.subHeading}>Mục đích sử dụng phòng</Text>
              <TextInput
                style={styles.purposeInput}
                value={purpose}
                onChangeText={setPurpose}
                placeholder="vd: Họp nhóm Đồ án Tốt nghiệp, Thực hành Lab AI..."
                placeholderTextColor={colors.textMuted}
              />
              {currentUser && (
                <View style={styles.studentBadgeBox}>
                  <Ionicons name="person-circle-outline" size={16} color={colors.primary} />
                  <Text style={styles.studentInfoHint}>
                    Đăng ký dưới tên: <Text style={{ fontWeight: '700', color: colors.textPrimary }}>{currentUser.name}</Text> ({currentUser.studentCode} - {currentUser.department})
                  </Text>
                </View>
              )}
            </View>

            {/* Success Dialog Modal Card */}
            {bookingSuccessInfo && (
              <View style={styles.successCard}>
                <Ionicons name="checkmark-circle" size={32} color={colors.success} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.successTitle}>Đặt phòng thành công!</Text>
                  <Text style={styles.successMsg}>
                    Mã phiếu: <Text style={{ fontWeight: '800' }}>{bookingSuccessInfo.id}</Text>
                  </Text>
                  <Text style={styles.successMsgSub}>
                    {selectedDate} • {selectedSlot?.label}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.viewBookingsBtn, styles.pointerCursor]}
                  onPress={() => {
                    navigation.goBack();
                    navigation.navigate('MainTabs', { screen: 'MyBookings' });
                  }}
                >
                  <Text style={styles.viewBookingsBtnText}>Xem vé</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom CTA Bar */}
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.selectedSlotSummary}>
            <Text style={styles.summaryLabel}>Ca học đã chọn</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>
              {selectedSlot ? `${selectedSlot.label}` : 'Chưa chọn ca học'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.confirmButton, !selectedSlot && styles.confirmButtonDisabled, styles.pointerCursor]}
            onPress={handleConfirmBooking}
            disabled={!selectedSlot}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>Xác nhận Giữ Chỗ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  webContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 860,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E2E8F0',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageContainer: {
    height: 250,
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
    paddingVertical: 5,
    borderRadius: 8,
  },
  capacityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  typeBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  infoSection: {
    padding: 18,
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
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B45309',
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '800',
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
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  amenityChipText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '700',
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
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.textPrimary,
    marginTop: 4,
  },
  studentBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  studentInfoHint: {
    fontSize: 11,
    color: colors.textSecondary,
    flex: 1,
  },
  successCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },
  successTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803D',
  },
  successMsg: {
    fontSize: 11,
    color: '#166534',
    marginTop: 1,
  },
  successMsgSub: {
    fontSize: 11,
    color: '#166534',
  },
  viewBookingsBtn: {
    backgroundColor: '#15803D',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  viewBookingsBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  selectedSlotSummary: {
    flex: 1,
    marginRight: 12,
  },
  summaryLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '800',
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
    fontSize: 13,
    fontWeight: '800',
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
