import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';

const index = () => {
  return (
    <View style={styles.container}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  }
});

export default index;