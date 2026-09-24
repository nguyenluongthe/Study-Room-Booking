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

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [name, setName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Khoa Công nghệ Thông tin');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name.trim() || !studentCode.trim() || !email.trim() || !password.trim()) {
      const msg = 'Vui lòng điền đầy đủ Họ tên, Mã SV/Cán bộ, Email VKU và Mật khẩu.';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Thông báo', msg);
      return;
    }

    if (!email.toLowerCase().includes('@')) {
      const msg = 'Email không hợp lệ. Khuyên dùng định dạng @vku.udn.vn';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Lỗi định dạng', msg);
      return;
    }

    setErrorMessage(null);
    const res = await register({
      name: name.trim(),
      studentCode: studentCode.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      department: department.trim(),
      phone: phone.trim() || '0905 000 111',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      role: 'student',
      passwordHash: password,
    });

    if (!res.success) {
      setErrorMessage(res.message || 'Đăng ký thất bại.');
    }
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
          {/* Back button */}
          <TouchableOpacity
            style={[styles.backBtn, styles.pointerCursor]}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            <Text style={styles.backText}>Quay lại Đăng nhập</Text>
          </TouchableOpacity>

          {/* Title */}
          <View style={styles.header}>
            <Text style={styles.title}>Đăng ký Tài khoản VKU</Text>
            <Text style={styles.subtitle}>
              Tạo tài khoản để đặt phòng thực hành máy tính, thư viện số và lab vi mạch
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {errorMessage && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color={colors.error} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Họ và tên sinh viên / Cán bộ *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="vd: Lương Thế Nguyên"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            </View>

            {/* Student code */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mã số Sinh viên / Mã Cán bộ *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="card-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={studentCode}
                  onChangeText={setStudentCode}
                  placeholder="vd: 21IT001 hoặc CB-VKU-01"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email trường VKU *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="vd: nguyenlt@vku.udn.vn"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Department */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Khoa / Viện đào tạo</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="school-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={department}
                  onChangeText={setDepartment}
                  placeholder="vd: Khoa Công nghệ Thông tin"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số điện thoại liên hệ</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="vd: 0905 123 789"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mật khẩu khởi tạo *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Tối thiểu 6 ký tự"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Submit Register */}
            <TouchableOpacity
              style={[styles.registerBtn, styles.pointerCursor]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Text style={styles.registerBtnText}>Tạo tài khoản & Đăng nhập</Text>
                  <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>

            {/* Back to Login link */}
            <View style={styles.loginRow}>
              <Text style={styles.loginPrompt}>Đã có tài khoản VKU?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.pointerCursor}>
                <Text style={styles.loginLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
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
    paddingVertical: 20,
  },
  webScrollContent: {
    alignItems: 'center',
    paddingVertical: 36,
  },
  webConstrainedContainer: {
    width: '100%',
    maxWidth: 520,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 13,
    color: '#93C5FD',
    marginTop: 4,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
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
    marginBottom: 14,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    fontWeight: '600',
    flex: 1,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  registerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  registerBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  loginPrompt: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  pointerCursor: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
