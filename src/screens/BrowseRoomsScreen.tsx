import React, { useCallback, useMemo, useState } from 'react';
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBookingStore } from '../store/useBookingStore';
import { useRoomsQuery } from '../services/roomService';
import { RoomCard } from '../components/RoomCard';
import { FilterBar } from '../components/FilterBar';
import { Room, RootStackParamList } from '../types';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ITEM_HEIGHT = 350;

export const BrowseRoomsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const filters = useBookingStore((state) => state.filters);
  const resetFilters = useBookingStore((state) => state.resetFilters);
  const bookings = useBookingStore((state) => state.bookings);
  const quickBookRoom = useBookingStore((state) => state.quickBookRoom);
  const getEarliestAvailableSlot = useBookingStore((state) => state.getEarliestAvailableSlot);

  // Quick Book Banner Feedback State
  const [quickBookToast, setQuickBookToast] = useState<{ message: string; refId?: string } | null>(null);

  const activeBookingsCount = useMemo(
    () => bookings.filter((b) => b.status === 'Confirmed').length,
    [bookings]
  );

  const { data: rooms, isLoading, isRefetching, refetch } = useRoomsQuery(filters);

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
        const msg = `Phòng ${room.name} hiện đã kín slot trong 4 ngày tới!`;
        Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Hết slot', msg);
        return;
      }

      const confirmMessage = `Đặt nhanh phòng "${room.name}"\n📅 Thời gian: ${earliest.dateLabel} (${earliest.date}) lúc ${earliest.slot.label}?`;

      const executeBooking = () => {
        const res = quickBookRoom(room);
        if (res.success && res.booking) {
          setQuickBookToast({ message: res.message, refId: res.booking.id });
          setTimeout(() => setQuickBookToast(null), 6000);
        } else {
          Platform.OS === 'web' ? window.alert(res.message) : Alert.alert('Lỗi', res.message);
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
    ({ item }: ListRenderItemInfo<Room>) => (
      <RoomCard
        room={item}
        onPress={handleRoomPress}
        onQuickBook={handleQuickBook}
      />
    ),
    [handleRoomPress, handleQuickBook]
  );

  const keyExtractor = useCallback((item: Room) => item.id, []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top App Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.appTitle}>Study Hub</Text>
          <Text style={styles.appSubtitle}>
            {rooms ? `${rooms.length} campus rooms & labs` : 'Loading spaces...'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.activeBookingBadge}
          onPress={() => navigation.navigate('MainTabs')}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar" size={16} color={colors.primary} />
          <Text style={styles.activeBookingCount}>{activeBookingsCount} Active</Text>
        </TouchableOpacity>
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
            style={styles.toastActionBtn}
            onPress={() => {
              setQuickBookToast(null);
              navigation.navigate('MainTabs');
            }}
          >
            <Text style={styles.toastActionText}>Xem vé</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main 60fps FlatList Feed */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Fetching campus spaces...</Text>
        </View>
      ) : (
        <FlatList
          data={rooms || []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={7}
          removeClippedSubviews={true}
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
              <Text style={styles.emptyTitle}>No matching rooms found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search query, building filter, or seat capacity.
              </Text>
              <TouchableOpacity style={styles.clearBtn} onPress={resetFilters}>
                <Text style={styles.clearBtnText}>Clear All Filters</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeBookingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  activeBookingCount: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  toastBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#059669',
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
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
    fontSize: 13,
  },
  toastText: {
    color: '#D1FAE5',
    fontSize: 11,
  },
  toastActionBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  toastActionText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
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
    fontWeight: '600',
    fontSize: 13,
  },
});
