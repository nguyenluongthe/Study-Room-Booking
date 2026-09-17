import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useBookingStore } from '../store/useBookingStore';
import { colors } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const user = useBookingStore((state) => state.user);
  const bookings = useBookingStore((state) => state.bookings);

  const activeCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'Completed').length;
  const totalHours = (activeCount + completedCount) * 2; // each slot is 2 hours

  const handleSupport = () => {
    const msg = 'For room assistance or keycard access issues, contact campus facility desk: support@campus.edu.vn or Ext: 4400.';
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert('Campus Facility Support', msg);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* User Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          <View style={styles.profileDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.studentIdBadge}>
              <Text style={styles.studentIdText}>{user.studentCode}</Text>
            </View>
            <Text style={styles.departmentText}>{user.department}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>Active Passes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalHours}h</Text>
            <Text style={styles.statLabel}>Study Hours</Text>
          </View>
        </View>

        {/* Account Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{user.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{user.phone}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="school-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Faculty</Text>
            <Text style={styles.detailValue}>Information Technology</Text>
          </View>
        </View>

        {/* Campus Rules & Guidelines */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Campus Booking Policies</Text>
          
          <View style={styles.ruleItem}>
            <Ionicons name="time" size={16} color={colors.primary} style={{ marginTop: 2 }} />
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: '600' }}>15-min Grace Period:</Text> Check into your room within 15 minutes of slot start time or the slot will be released.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Ionicons name="shield-checkmark" size={16} color={colors.primary} style={{ marginTop: 2 }} />
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: '600' }}>Fair Use Policy:</Text> Maximum 2 active concurrent bookings per student to ensure availability for all peers.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Ionicons name="trash" size={16} color={colors.primary} style={{ marginTop: 2 }} />
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: '600' }}>Clean Desk:</Text> Ensure whiteboards are wiped and trash disposed of before leaving.
            </Text>
          </View>
        </View>

        {/* Support CTA */}
        <TouchableOpacity style={styles.supportButton} onPress={handleSupport}>
          <Ionicons name="help-buoy-outline" size={18} color={colors.primary} />
          <Text style={styles.supportButtonText}>Facility Helpdesk & Support</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  studentIdBadge: {
    backgroundColor: colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginVertical: 4,
  },
  studentIdText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  departmentText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 8,
    width: 70,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 10,
  },
  ruleText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
