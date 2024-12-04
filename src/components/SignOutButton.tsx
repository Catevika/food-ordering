import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import supabase from '@/lib/supabase';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const SignOutButton = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    console.log('signed out');
    await supabase.auth.signOut();
    router.push('/(auth)/sign-in');
  }, []);

  return (
    <>
      <Pressable onPressIn={handleSignOut}>
        {({ pressed }) => (
          <FontAwesome
            name="sign-out"
            size={25}
            color={Colors[colorScheme ?? 'light'].tint}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
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

export default SignOutButton;
