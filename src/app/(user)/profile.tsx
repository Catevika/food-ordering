import Colors from '@/constants/Colors';
import supabase from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import daysjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Redirect } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from "react-native";

daysjs.extend(relativeTime);
const ProfileScreen = () => {
  const { session, isAdmin } = useAuth();
  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const { created_at, ...user } = session.user;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: </Text>
      <Text style={{ color: Colors.light.tint, marginBottom: 20 }}>{user.email}</Text>
      <Text style={styles.text}>{isAdmin ? 'Admin since: ' : 'Member since: '}</Text>
      <Text style={{ color: Colors.light.tint, marginBottom: 20 }}>{daysjs(created_at).format('MMMM D, YYYY')}</Text>

      <Pressable onPressIn={() => {
        supabase.auth.signOut();
      }} style={styles.buttonContainer}>{({ pressed }) => (
        <Text style={[styles.buttonText, { opacity: pressed ? 0.5 : 1 }]}>Sign out</Text>
      )}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontWeight: '500',
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
export default ProfileScreen;
