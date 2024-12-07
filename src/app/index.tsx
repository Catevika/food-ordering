import Colors from '@/constants/Colors';
import supabase from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { Link, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      {
        isAdmin ?
          <Link href={'/(admin)'} asChild>
            <Button text="Admin" />
          </Link> : null
      }
      <Link href={'/(user)/menu'} asChild>
        <Button text="User" />
      </Link>
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
    padding: 10,
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

export default index;