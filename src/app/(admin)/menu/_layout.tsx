import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function MenuStack() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name='index' options={{
        title: 'Menu', headerRight: () => (
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
        ),
      }} />
    </Stack>
  );
}