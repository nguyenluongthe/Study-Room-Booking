import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBookingStore } from '../store/useBookingStore';
import { Booking, RootStackParamList } from '../types';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyBookingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const bookings = useBookingStore((state) => state.bookings);
  const cancelBooking = useBookingStore((state) => state.cancelBooking);

  const [activeTab, setActiveTab] = useState<'all' | 'Confirmed' | 'Completed' | 'Cancelled'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const handleCancel = (booking: Booking) => {
    const doCancel = () => {
      cancelBooking(booking.id);
      const msg = `Đã hủy đặt phòng ${booking.roomName}. Ca học đã được mở lại cho sinh viên khác.`;
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Đã hủy phiếu đặt', msg);
      }
    };

    const confirmMsg = `Bạn có chắc chắn muốn hủy lượt đặt phòng "${booking.roomName}" vào ca ${booking.slotLabel} ngày ${booking.date}?`;

    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) {
        doCancel();
      }
    } else {
      Alert.alert(
        'Xác nhận hủy đặt phòng',
        confirmMsg,
        [
          { text: 'Giữ lại', style: 'cancel' },
          { text: 'Hủy đặt phòng', style: 'destructive', onPress: doCancel },
        ]
      );
    }
  };

  const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
    Confirmed: { label: 'Đang giữ', color: colors.success, bg: colors.successLight },
    Cancelled: { label: 'Đã hủy', color: colors.error, bg: colors.errorLight },
    Completed: { label: 'Hoàn thành', color: colors.textSecondary, bg: '#F1F5F9' },
  };

  const renderBookingItem = ({ item }: { item: Booking }) => {
    const isConfirmed = item.status === 'Confirmed';
    const statusMeta = statusLabels[item.status] || statusLabels.Confirmed;

    return (
      <View style={styles.ticketCard}>
        {/* Ticket Header */}
        <View style={styles.ticketHeader}>
          <View style={styles.refBox}>
            <View style={styles.vkuDot} />
            <Text style={styles.refLabel}>VKU PASS:</Text>
            <Text style={styles.refValue}>{item.id}</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: statusMeta.bg }]}>
            <Text style={[styles.statusText, { color: statusMeta.color }]}>
              {statusMeta.label}
            </Text>
          </View>
        </View>

        {/* Ticket Body */}
        <View style={styles.ticketBody}>
          <Image source={{ uri: item.roomImage }} style={styles.roomThumb} />
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{item.roomName}</Text>
            <Text style={styles.roomBuilding}>
              <Ionicons name="business" size={12} color={colors.primary} />{' '}
              {item.roomBuilding}
            </Text>

            <View style={styles.slotRow}>
              <Ionicons name="calendar-outline" size={13} color={colors.primary} />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.slotRow}>
              <Ionicons name="time-outline" size={13} color={colors.textSecondary} />
              <Text style={styles.slotText}>{item.slotLabel}</Text>
            </View>
          </View>
        </View>

        {/* Purpose & Student info */}
        <View style={styles.metaBox}>
          <Text style={styles.metaLine}>
            <Text style={{ fontWeight: '700', color: colors.textPrimary }}>Người đăng ký:</Text> {item.studentName} ({item.studentId})
          </Text>
          {item.purpose ? (
            <Text style={styles.metaLine} numberOfLines={1}>
              <Text style={{ fontWeight: '700', color: colors.textPrimary }}>Mục đích:</Text> {item.purpose}
            </Text>
          ) : null}
        </View>

        {/* Decorative Ticket Cutouts & Barcode */}
        <View style={styles.ticketFooter}>
          <View style={styles.mockBarcode}>
            <Ionicons name="barcode-outline" size={24} color={colors.textSecondary} />
            <Text style={styles.barcodeText}>VKU-SPACE-{item.id.replace('VKU-BK-', '')}</Text>
          </View>

          {isConfirmed && (
            <TouchableOpacity
              style={[styles.cancelBtn, styles.pointerCursor]}
              onPress={() => handleCancel(item)}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={13} color={colors.error} />
              <Text style={styles.cancelBtnText}>Hủy giữ chỗ</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.webContainer}>
        {/* Top Title */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Phiếu Đặt Phòng VKU</Text>
            <Text style={styles.headerSubtitle}>Quản lý thẻ thông hành phòng học & lab nghiên cứu</Text>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabRow}>
          {[
            { key: 'all', label: 'Tất cả' },
            { key: 'Confirmed', label: 'Đang giữ' },
            { key: 'Completed', label: 'Hoàn thành' },
            { key: 'Cancelled', label: 'Đã hủy' },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            const count =
              tab.key === 'all'
                ? bookings.length
                : bookings.filter((b) => b.status === tab.key).length;

            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabBtn, isActive && styles.tabBtnActive, styles.pointerCursor]}
                onPress={() => setActiveTab(tab.key as any)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabBtnText, isActive && styles.tabBtnTextActive]}>
                  {tab.label} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bookings List */}
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="ticket-outline" size={54} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Chưa có phiếu đặt nào</Text>
              <Text style={styles.emptySubtitle}>
                Bạn hiện không có phiếu đặt phòng nào trong mục này.
              </Text>
              <TouchableOpacity
                style={[styles.browseRoomsBtn, styles.pointerCursor]}
                onPress={() => navigation.navigate('MainTabs', { screen: 'BrowseRooms' })}
              >
                <Ionicons name="grid" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.browseRoomsBtnText}>Khám phá 100 phòng VKU</Text>
              </TouchableOpacity>
            </View>
          }
        />
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
    maxWidth: 960,
    alignSelf: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  tabBtnActive: {
    backgroundColor: colors.primary,
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  refBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vkuDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  refLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  refValue: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  ticketBody: {
    flexDirection: 'row',
    padding: 16,
    gap: 14,
  },
  roomThumb: {
    width: 76,
    height: 76,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  roomInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  roomName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  roomBuilding: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 5,
  },
  dateText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
  slotText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  metaBox: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 4,
  },
  metaLine: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  mockBarcode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barcodeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.errorLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cancelBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.error,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  browseRoomsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  browseRoomsBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
