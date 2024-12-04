import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import supabase from '@/lib/supabase';
import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetSignUp = () => {
    setEmail('');
    setPassword('');
  };

  const signupWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password, });
    if (error) console.log(error.message);
    setLoading(false);
    resetSignUp();
    router.push('/');
  };



  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="john@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="..."
        style={styles.input}
        secureTextEntry
      />

      <Button onPress={signupWithEmail} text={loading ? 'Creating account...' : 'Create account'} disabled={loading} />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;