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
      if (Platform.OS === 'web') {
        window.alert(`Booking ${booking.id} has been cancelled and slot is now freed.`);
      } else {
        Alert.alert('Booking Cancelled', `Slot has been released for ${booking.roomName}.`);
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Are you sure you want to cancel reservation for ${booking.roomName}?`)) {
        doCancel();
      }
    } else {
      Alert.alert(
        'Cancel Reservation',
        `Are you sure you want to release slot for ${booking.roomName}?`,
        [
          { text: 'No, Keep', style: 'cancel' },
          { text: 'Yes, Cancel', style: 'destructive', onPress: doCancel },
        ]
      );
    }
  };

  const renderBookingItem = ({ item }: { item: Booking }) => {
    const isConfirmed = item.status === 'Confirmed';
    const isCancelled = item.status === 'Cancelled';

    return (
      <View style={styles.card}>
        {/* Top Header Card */}
        <View style={styles.cardHeader}>
          <View style={styles.refBox}>
            <Text style={styles.refLabel}>REF</Text>
            <Text style={styles.refValue}>{item.id}</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              isConfirmed
                ? styles.statusConfirmed
                : isCancelled
                ? styles.statusCancelled
                : styles.statusCompleted,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isConfirmed
                  ? { color: colors.success }
                  : isCancelled
                  ? { color: colors.error }
                  : { color: colors.textSecondary },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        {/* Body Info */}
        <View style={styles.cardBody}>
          <Image source={{ uri: item.roomImage }} style={styles.roomThumb} />
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{item.roomName}</Text>
            <Text style={styles.roomBuilding}>
              <Ionicons name="location-sharp" size={12} color={colors.textSecondary} />{' '}
              {item.roomBuilding}
            </Text>

            <View style={styles.slotRow}>
              <Ionicons name="calendar-outline" size={14} color={colors.primary} />
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <Ionicons name="time-outline" size={14} color={colors.primary} />
              <Text style={styles.slotText}>{item.slotLabel}</Text>
            </View>
          </View>
        </View>

        {/* Purpose */}
        {item.purpose ? (
          <View style={styles.purposeRow}>
            <Text style={styles.purposeLabel}>Purpose: </Text>
            <Text style={styles.purposeText} numberOfLines={1}>
              {item.purpose}
            </Text>
          </View>
        ) : null}

        {/* Action Button */}
        {isConfirmed && (
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancel(item)}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={15} color={colors.error} />
              <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>Manage your campus study passes</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(['all', 'Confirmed', 'Completed', 'Cancelled'] as const).map((tab) => {
          const isActive = activeTab === tab;
          const count =
            tab === 'all'
              ? bookings.length
              : bookings.filter((b) => b.status === tab).length;

          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabBtnText, isActive && styles.tabBtnTextActive]}>
                {tab === 'all' ? 'All' : tab} ({count})
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
            <Ionicons name="calendar-outline" size={56} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No bookings found</Text>
            <Text style={styles.emptySubtitle}>
              You do not have any {activeTab === 'all' ? '' : activeTab.toLowerCase()} bookings yet.
            </Text>
            <TouchableOpacity
              style={styles.browseRoomsBtn}
              onPress={() => navigation.navigate('MainTabs', { screen: 'BrowseRooms' })}
            >
              <Text style={styles.browseRoomsBtnText}>Browse Available Rooms</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 12,
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
  },
  listContent: {
    padding: 16,
    gap: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: '#F8FAFC',
  },
  refBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  refLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
  },
  refValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusConfirmed: {
    backgroundColor: colors.successLight,
  },
  statusCancelled: {
    backgroundColor: colors.errorLight,
  },
  statusCompleted: {
    backgroundColor: '#F1F5F9',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  roomThumb: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  roomInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  roomName: {
    fontSize: 16,
    fontWeight: '700',
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
    marginTop: 6,
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  dotSeparator: {
    color: colors.textMuted,
    fontSize: 12,
  },
  slotText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  purposeRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  purposeLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  purposeText: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
  },
  cardActions: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.errorLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.error,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
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
  browseRoomsBtn: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  browseRoomsBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
