import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function MenuStack() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleDismiss = (count: number) => {
    router.dismiss(count);
  };

  return (
    <Stack>
      <Stack.Screen name='index' options={{
        title: 'Menu', headerLeft: () => (
          <Pressable onPressIn={() => handleDismiss(1)}>
            {({ pressed }) => (
              <FontAwesome name="chevron-left"
                size={20}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 3, opacity: pressed ? 0.5 : 1 }} />
            )}
          </Pressable>
        ), headerRight: () => (
          <>
            <Pressable onPressIn={() => router.push('/(admin)/menu/create')}>
              {({ pressed }) => (
                <FontAwesome
                  name="plus-square-o"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </>
        ),
      }} />
    </Stack>
  );
}