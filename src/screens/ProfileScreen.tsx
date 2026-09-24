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
import { useAuthStore } from '../store/useAuthStore';
import { dbService } from '../services/dbService';
import { colors } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const loginAsDemoUser = useAuthStore((state) => state.loginAsDemoUser);
  const bookings = useBookingStore((state) => state.bookings);

  const activeCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'Completed').length;
  const totalHours = (activeCount + completedCount) * 2;

  const handleLogout = () => {
    const doLogout = async () => {
      await logout();
      if (Platform.OS === 'web') {
        window.alert('Bạn đã đăng xuất khỏi hệ thống VKU Smart Space.');
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Bạn có chắc chắn muốn đăng xuất tài khoản?')) {
        doLogout();
      }
    } else {
      Alert.alert(
        'Đăng xuất',
        'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống VKU Smart Space?',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Đăng xuất', style: 'destructive', onPress: doLogout },
        ]
      );
    }
  };

  const handleResetDatabase = async () => {
    const doReset = async () => {
      const res = await dbService.resetDatabaseToDefault();
      const msg = `Đã đồng bộ và khôi phục thành công toàn bộ ${res.roomCount} phòng VKU về trạng thái chuẩn ban đầu!`;
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Khôi phục Database', msg);
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Khôi phục toàn bộ dữ liệu 100 phòng học VKU về mặc định?')) {
        doReset();
      }
    } else {
      Alert.alert(
        'Khôi phục Database 100 phòng VKU',
        'Hành động này sẽ thiết lập lại trạng thái 100 phòng học và lịch mẫu của trường VKU.',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Xác nhận khôi phục', style: 'default', onPress: doReset },
        ]
      );
    }
  };

  const handleSupport = () => {
    const msg = 'Phòng Quản trị Cơ sở vật chất & Thư viện số VKU:\n- Hotline: 0236.3.667.117\n- Email hỗ trợ: csvc@vku.udn.vn\n- Văn phòng: Tầng 1 Tòa nhà K';
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert('Bộ phận Quản trị Thiết bị VKU', msg);
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>Đang tải thông tin tài khoản...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.webContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hồ Sơ Cá Nhân</Text>
          <Text style={styles.headerSubtitle}>Tài khoản Cổng Thông tin Học tập VKU</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Student ID Card Look */}
          <View style={styles.studentCard}>
            {/* Card Top Strip */}
            <View style={styles.studentCardHeader}>
              <View style={styles.studentCardBadge}>
                <Ionicons name="school" size={15} color="#FFFFFF" />
                <Text style={styles.studentCardBadgeText}>ĐẠI HỌC VIỆT - HÀN (VKU)</Text>
              </View>
              <Text style={styles.roleTag}>
                {user.role === 'researcher' ? 'NGHIÊN CỨU SINH' : 'SINH VIÊN CHÍNH QUY'}
              </Text>
            </View>

            {/* User Details */}
            <View style={styles.studentCardBody}>
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
              <View style={styles.profileDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <View style={styles.codeRow}>
                  <Ionicons name="id-card" size={13} color={colors.primary} />
                  <Text style={styles.studentIdText}>{user.studentCode}</Text>
                </View>
                <Text style={styles.departmentText}>{user.department}</Text>
              </View>
            </View>

            {/* Card Bottom status */}
            <View style={styles.studentCardFooter}>
              <Ionicons name="shield-checkmark" size={15} color={colors.success} />
              <Text style={styles.studentCardStatus}>Tài khoản đã xác thực thông tin học thuật VKU</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{activeCount}</Text>
              <Text style={styles.statLabel}>Phiếu Đang Giữ</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.success }]}>{completedCount}</Text>
              <Text style={styles.statLabel}>Đã Hoàn Thành</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.accentOrange }]}>{totalHours}h</Text>
              <Text style={styles.statLabel}>Giờ Tự Học/Lab</Text>
            </View>
          </View>

          {/* Account Details */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Thông tin liên hệ & Đào tạo</Text>

            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={18} color={colors.primary} />
              <Text style={styles.detailLabel}>Email trường</Text>
              <Text style={styles.detailValue}>{user.email}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={18} color={colors.primary} />
              <Text style={styles.detailLabel}>Số điện thoại</Text>
              <Text style={styles.detailValue}>{user.phone}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={18} color={colors.primary} />
              <Text style={styles.detailLabel}>Cơ sở chính</Text>
              <Text style={styles.detailValue}>470 Đ. Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Đà Nẵng</Text>
            </View>
          </View>

          {/* Quick Demo Switcher */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Chuyển nhanh tài khoản kiểm thử</Text>
            <Text style={styles.sectionHint}>
              Chuyển nhanh giữa các tài khoản sinh viên/nghiên cứu sinh VKU trong cơ sở dữ liệu:
            </Text>

            <View style={styles.switcherButtons}>
              <TouchableOpacity
                style={[styles.switcherBtn, user.studentCode === '21IT001' && styles.switcherBtnActive, styles.pointerCursor]}
                onPress={() => loginAsDemoUser(0)}
              >
                <Text style={[styles.switcherBtnText, user.studentCode === '21IT001' && styles.switcherBtnTextActive]}>
                  SV Lương Thế Nguyên (21IT001)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.switcherBtn, user.studentCode === 'GV-VKU-2018' && styles.switcherBtnActive, styles.pointerCursor]}
                onPress={() => loginAsDemoUser(1)}
              >
                <Text style={[styles.switcherBtnText, user.studentCode === 'GV-VKU-2018' && styles.switcherBtnTextActive]}>
                  TS. Huy (VKU-IR)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.switcherBtn, user.studentCode === '22SC045' && styles.switcherBtnActive, styles.pointerCursor]}
                onPress={() => loginAsDemoUser(2)}
              >
                <Text style={[styles.switcherBtnText, user.studentCode === '22SC045' && styles.switcherBtnTextActive]}>
                  SV Mai Anh (Bán dẫn)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Database Management Tools */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cơ Sở Dữ Liệu 100 Phòng VKU</Text>
            <Text style={styles.sectionHint}>
              Dữ liệu phòng học, lab AI, thư viện số và lịch đặt được lưu trữ liên tục (persistent storage).
            </Text>
            <TouchableOpacity style={[styles.resetDbButton, styles.pointerCursor]} onPress={handleResetDatabase} activeOpacity={0.7}>
              <Ionicons name="refresh-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.resetDbButtonText}>Đồng bộ / Khôi phục chuẩn 100 phòng VKU</Text>
            </TouchableOpacity>
          </View>

          {/* Rules & Guidelines */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Quy chế sử dụng phòng học VKU</Text>

            <View style={styles.ruleItem}>
              <Ionicons name="time" size={16} color={colors.primary} style={{ marginTop: 2 }} />
              <Text style={styles.ruleText}>
                <Text style={{ fontWeight: '700' }}>Điểm danh 15 phút:</Text> Sinh viên có mặt trong vòng 15 phút đầu ca học hoặc phòng sẽ được giải phóng cho người khác.
              </Text>
            </View>

            <View style={styles.ruleItem}>
              <Ionicons name="hardware-chip" size={16} color={colors.primary} style={{ marginTop: 2 }} />
              <Text style={styles.ruleText}>
                <Text style={{ fontWeight: '700' }}>Thiết bị phòng Lab:</Text> Tắt máy tính, ngắt nguồn máy hàn vi mạch và lau bảng sạch sẽ trước khi rời phòng.
              </Text>
            </View>
          </View>

          {/* Support Button */}
          <TouchableOpacity style={[styles.supportButton, styles.pointerCursor]} onPress={handleSupport}>
            <Ionicons name="call-outline" size={18} color={colors.primary} />
            <Text style={styles.supportButtonText}>Liên hệ Quản lý Thiết bị & Thư viện VKU</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity style={[styles.logoutButton, styles.pointerCursor]} onPress={handleLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={18} color={colors.error} />
            <Text style={styles.logoutButtonText}>Đăng xuất khỏi hệ thống</Text>
          </TouchableOpacity>
        </ScrollView>
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
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  studentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  studentCardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  studentCardBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  roleTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FEF08A',
  },
  studentCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: colors.primary,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginVertical: 4,
  },
  studentIdText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  departmentText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  studentCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  studentCardStatus: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  sectionHint: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
    width: 95,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  switcherButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  switcherBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: colors.border,
  },
  switcherBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  switcherBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  switcherBtnTextActive: {
    color: '#FFFFFF',
  },
  resetDbButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primaryLight,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  resetDbButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
    flex: 1,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  supportButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.errorLight,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.errorBorder,
  },
  logoutButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.error,
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
