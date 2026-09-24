import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();
  const login = useAuthStore((state) => state.login);
  const loginAsDemoUser = useAuthStore((state) => state.loginAsDemoUser);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [email, setEmail] = useState('nguyenlt@vku.udn.vn');
  const [password, setPassword] = useState('vku12345');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      const msg = 'Vui lòng nhập đầy đủ Email VKU và Mật khẩu.';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Thông báo', msg);
      return;
    }

    setErrorMessage(null);
    const res = await login(email, password);
    if (!res.success) {
      setErrorMessage(res.message || 'Đăng nhập không thành công.');
      if (Platform.OS !== 'web') {
        Alert.alert('Đăng nhập thất bại', res.message);
      }
    }
  };

  const handleQuickLogin = async (demoIndex: number) => {
    setErrorMessage(null);
    await loginAsDemoUser(demoIndex);
  };

  const isWebWide = width >= 640;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isWebWide && styles.webScrollContent,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.webConstrainedContainer}>
          {/* Brand Banner */}
          <View style={styles.brandContainer}>
            <View style={styles.logoBadge}>
              <Ionicons name="school" size={38} color="#FFFFFF" />
            </View>
            <Text style={styles.universityName}>ĐẠI HỌC ĐÀ NẴNG</Text>
            <Text style={styles.schoolName}>
              TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN{'\n'}& TRUYỀN THÔNG VIỆT - HÀN (VKU)
            </Text>
            <View style={styles.portalTag}>
              <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
              <Text style={styles.portalTagText}>CỔNG ĐẶT PHÒNG HỌC & NGHIÊN CỨU SỐ</Text>
            </View>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Đăng nhập Hệ thống</Text>
            <Text style={styles.cardSubtitle}>
              Sử dụng email sinh viên/cán bộ <Text style={{ fontWeight: '700', color: colors.primary }}>@vku.udn.vn</Text>
            </Text>

            {errorMessage && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color={colors.error} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            {/* Email input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email VKU</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrorMessage(null);
                  }}
                  placeholder="vd: nguyenlt@vku.udn.vn"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrorMessage(null);
                  }}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={styles.pointerCursor}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Submit Button */}
            <TouchableOpacity
              style={[styles.loginButton, styles.pointerCursor]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>Đăng nhập ngay</Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>HOẶC ĐĂNG NHẬP NHANH 1-CHẠM</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Quick Demo Logins */}
            <View style={styles.demoButtonsContainer}>
              <TouchableOpacity
                style={[styles.demoBtn, styles.pointerCursor]}
                onPress={() => handleQuickLogin(0)}
                activeOpacity={0.7}
              >
                <View style={styles.demoIconCircle}>
                  <Ionicons name="school-outline" size={16} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.demoBtnTitle}>SV Lương Thế Nguyên (21IT001)</Text>
                  <Text style={styles.demoBtnSub}>Khoa Công nghệ Thông tin</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.demoBtn, styles.pointerCursor]}
                onPress={() => handleQuickLogin(1)}
                activeOpacity={0.7}
              >
                <View style={[styles.demoIconCircle, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="flask-outline" size={16} color="#D97706" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.demoBtnTitle}>Nghiên cứu sinh (TS. Lê Quang Huy)</Text>
                  <Text style={styles.demoBtnSub}>Viện Đổi mới Sáng tạo VKU-IR</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.demoBtn, styles.pointerCursor]}
                onPress={() => handleQuickLogin(2)}
                activeOpacity={0.7}
              >
                <View style={[styles.demoIconCircle, { backgroundColor: '#ECFDF5' }]}>
                  <Ionicons name="hardware-chip-outline" size={16} color="#059669" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.demoBtnTitle}>SV Vi mạch Bán dẫn (Mai Anh)</Text>
                  <Text style={styles.demoBtnSub}>K22 Thiết kế Vi mạch</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Register link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerPrompt}>Chưa có tài khoản VKU Space?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.pointerCursor}>
                <Text style={styles.registerLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Database status footer note */}
          <View style={styles.footerNote}>
            <Ionicons name="server-outline" size={14} color="#94A3B8" />
            <Text style={styles.footerText}>
              Cơ sở dữ liệu đồng bộ 100 phòng học • Đại học CNTT & Truyền thông Việt - Hàn
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2540',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    minHeight: '100%',
    justifyContent: 'center',
  },
  webScrollContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  webConstrainedContainer: {
    width: '100%',
    maxWidth: 480,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#38BDF8',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  universityName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#93C5FD',
    letterSpacing: 1.5,
  },
  schoolName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 4,
    letterSpacing: -0.2,
  },
  portalTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  portalTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 18,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.errorLight,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    fontWeight: '600',
    flex: 1,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    marginHorizontal: 8,
    letterSpacing: 0.5,
  },
  demoButtonsContainer: {
    gap: 8,
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
  },
  demoIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoBtnTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  demoBtnSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
  registerPrompt: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
  },
  footerText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
