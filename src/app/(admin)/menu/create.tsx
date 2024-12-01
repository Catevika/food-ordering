import AlertModal from '@/components/AlertModal';
import Button from '@/components/Button';
import { defaultPizzaImageUri } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

const CreateProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const onResetFields = () => {
    setName('');
    setPrice('');
  };

  const validateInput = () => {
    setError('');
    if (!name) {
      setError('Name is required');
      return false;
    }

    if (!price) {
      setError('Price is required');
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setError('Price must be a number');
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    if (!validateInput) return;
    console.log('Creating product...');
    onResetFields();
  };

  const onUpdate = () => {
    if (!validateInput) return;
    console.log('Updating product...');
    onResetFields();
  };

  const onDelete = () => {
    console.warn('DELETING!!');
  };

  const confirmDelete = () => {
    setModalVisible(true);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
      <Image source={{ uri: image || defaultPizzaImageUri }} style={styles.image} />
      <Text onPress={pickImage} style={styles.selectText}>Select Image</Text>
      <Text style={styles.label} >Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder='Name'
        style={styles.input}
      />
      <Text style={styles.label} >Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder='9.99'
        style={styles.input}
        keyboardType='numeric' />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
      {isUpdating && <Text style={styles.selectText} onPress={confirmDelete}>Delete</Text>}
      <AlertModal modalVisible={modalVisible} setModalVisible={setModalVisible} animation='fade' title='Confirm' message='Are you sure you want to delete this product?' textStyle1={styles.textStyle1} buttonStyle1={styles.buttonStyle1} buttonText1='Cancel' action1={() => setModalVisible(false)} textStyle2={styles.textStyle2} buttonStyle2={styles.buttonStyle2} buttonText2='Delete' action2={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    margin: 20
  },
  label: {
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  selectText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.light.tint,
  },
  textStyle1: {
    color: Colors.light.tint,
  },
  buttonStyle1: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#fff',
    marginRight: 20
  },
  textStyle2: {
    color: '#fff',
  },
  buttonStyle2: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#C70039'
  },

});

export default CreateProductScreen;
