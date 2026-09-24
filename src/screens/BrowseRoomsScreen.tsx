import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  ListRenderItemInfo,
  Alert,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBookingStore } from '../store/useBookingStore';
import { useAuthStore } from '../store/useAuthStore';
import { useRoomsQuery } from '../services/roomService';
import { RoomCard } from '../components/RoomCard';
import { FilterBar } from '../components/FilterBar';
import { Room, RootStackParamList } from '../types';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const BrowseRoomsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();
  const filters = useBookingStore((state) => state.filters);
  const resetFilters = useBookingStore((state) => state.resetFilters);
  const bookings = useBookingStore((state) => state.bookings);
  const loadBookingsFromDb = useBookingStore((state) => state.loadBookingsFromDb);
  const quickBookRoom = useBookingStore((state) => state.quickBookRoom);
  const getEarliestAvailableSlot = useBookingStore((state) => state.getEarliestAvailableSlot);
  const currentUser = useAuthStore((state) => state.user);

  // Quick Book Banner Feedback State
  const [quickBookToast, setQuickBookToast] = useState<{ message: string; refId?: string } | null>(null);

  // Dynamic responsive columns for Web / Tablet / Mobile
  const numColumns = useMemo(() => {
    if (width >= 1150) return 3;
    if (width >= 720) return 2;
    return 1;
  }, [width]);

  useEffect(() => {
    loadBookingsFromDb();
  }, [loadBookingsFromDb]);

  const activeBookingsCount = useMemo(
    () => bookings.filter((b) => b.status === 'Confirmed').length,
    [bookings]
  );

  const { data: rooms, isLoading, isRefetching, refetch } = useRoomsQuery(filters);

  const availableCount = useMemo(() => {
    return rooms ? rooms.filter((r) => r.status === 'Available').length : 0;
  }, [rooms]);

  const handleRoomPress = useCallback(
    (room: Room) => {
      navigation.navigate('RoomDetail', { roomId: room.id });
    },
    [navigation]
  );

  const handleQuickBook = useCallback(
    (room: Room) => {
      const earliest = getEarliestAvailableSlot(room.id);
      if (!earliest) {
        const msg = `Phòng ${room.name} hiện đã kín tất cả các ca trong 4 ngày tới!`;
        Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Hết slot', msg);
        return;
      }

      const confirmMessage = `Đặt nhanh phòng "${room.name}"\n📅 Ca: ${earliest.slot.label}\n📆 Ngày: ${earliest.dateLabel} (${earliest.date})?`;

      const executeBooking = () => {
        const res = quickBookRoom(room);
        if (res.success && res.booking) {
          setQuickBookToast({ message: res.message, refId: res.booking.id });
          setTimeout(() => setQuickBookToast(null), 6000);
        } else {
          Platform.OS === 'web' ? window.alert(res.message) : Alert.alert('Thông báo', res.message);
        }
      };

      if (Platform.OS === 'web') {
        if (window.confirm(confirmMessage)) {
          executeBooking();
        }
      } else {
        Alert.alert(
          '⚡ Xác nhận Đặt Nhanh (1-Tap)',
          confirmMessage,
          [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Đặt Ngay', style: 'default', onPress: executeBooking },
          ]
        );
      }
    },
    [getEarliestAvailableSlot, quickBookRoom]
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Room>) => (
      <RoomCard
        room={item}
        index={index}
        onPress={handleRoomPress}
        onQuickBook={handleQuickBook}
      />
    ),
    [handleRoomPress, handleQuickBook]
  );

  const keyExtractor = useCallback((item: Room) => item.id, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Centered Desktop Web Container */}
      <View style={styles.webConstrainedWrapper}>
        {/* VKU Top Header */}
        <View style={styles.topHeader}>
          <View style={styles.brandRow}>
            <View style={styles.vkuLogoBox}>
              <Ionicons name="school" size={20} color="#FFFFFF" />
            </View>
            <View>
              <View style={styles.titleBadgeRow}>
                <Text style={styles.vkuBadge}>VKU</Text>
                <Text style={styles.appTitle}>Smart Space</Text>
              </View>
              <Text style={styles.appSubtitle}>
                {currentUser ? `Xin chào, ${currentUser.name}` : 'Hệ thống phòng học VKU'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.activeBookingBadge, styles.pointerCursor]}
            onPress={() => navigation.navigate('MainTabs', { screen: 'MyBookings' })}
            activeOpacity={0.7}
          >
            <Ionicons name="ticket" size={15} color={colors.primary} />
            <Text style={styles.activeBookingCount}>{activeBookingsCount} Vé Đã Đặt</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Campus Stats strip */}
        <View style={styles.statsStrip}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>Phòng VKU</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.success }]}>{availableCount}</Text>
            <Text style={styles.statLabel}>Đang mở</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.accentOrange }]}>30</Text>
            <Text style={styles.statLabel}>Lab Kỹ thuật</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.info }]}>20</Text>
            <Text style={styles.statLabel}>Thư viện số</Text>
          </View>
        </View>

        {/* Filter and Search Bar */}
        <FilterBar />

        {/* Quick Book Success Toast Banner */}
        {quickBookToast && (
          <View style={styles.toastBanner}>
            <View style={styles.toastLeft}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <View style={{ flex: 1 }}>
                <Text style={styles.toastTitle}>Đặt phòng thành công!</Text>
                <Text style={styles.toastText} numberOfLines={1}>{quickBookToast.message}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.toastActionBtn, styles.pointerCursor]}
              onPress={() => {
                setQuickBookToast(null);
                navigation.navigate('MainTabs', { screen: 'MyBookings' });
              }}
            >
              <Text style={styles.toastActionText}>Xem vé</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Room Count Header */}
        {rooms && (
          <View style={styles.resultCountRow}>
            <Text style={styles.resultCountText}>
              Hiển thị <Text style={{ fontWeight: '800', color: colors.primary }}>{rooms.length}</Text> không gian phòng học & lab VKU
            </Text>
          </View>
        )}

        {/* Main FlatList Feed with Dynamic Responsive Multi-Column Grid */}
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Đang tải danh sách 100 phòng VKU từ Database...</Text>
          </View>
        ) : (
          <FlatList
            key={`grid-cols-${numColumns}`}
            data={rooms || []}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={numColumns}
            columnWrapperStyle={numColumns > 1 ? styles.gridRow : undefined}
            initialNumToRender={numColumns * 4}
            maxToRenderPerBatch={numColumns * 4}
            windowSize={7}
            removeClippedSubviews={Platform.OS !== 'web'}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyTitle}>Không tìm thấy phòng phù hợp</Text>
                <Text style={styles.emptySubtitle}>
                  Thử thay đổi từ khóa tìm kiếm, khu vực tòa nhà hoặc quy mô chỗ ngồi.
                </Text>
                <TouchableOpacity style={[styles.clearBtn, styles.pointerCursor]} onPress={resetFilters}>
                  <Text style={styles.clearBtnText}>Xóa bộ lọc & Xem tất cả</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  webConstrainedWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vkuLogoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vkuBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  appTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  appSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeBookingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  activeBookingCount: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  statsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 22,
    backgroundColor: colors.borderLight,
  },
  resultCountRow: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  resultCountText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  toastBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#059669',
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  toastLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  toastTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  toastText: {
    color: '#D1FAE5',
    fontSize: 11,
  },
  toastActionBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  toastActionText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingBottom: 40,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
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
  clearBtn: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
