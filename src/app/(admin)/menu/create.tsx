import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';
import AlertModal from '@/components/AlertModal';
import Button from '@/components/Button';
import { defaultPizzaImageUri } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import supabase from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import { randomUUID } from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const CreateProductScreen = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
  // idString?.[0] means that the id is undefined when creating a new product
  // and defined when updating one

  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct(id);
  const { data: productToBeUpdated } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (productToBeUpdated) {
      setName(productToBeUpdated.name);
      setImage(productToBeUpdated.image);
      setPrice(productToBeUpdated.price.toString());
    }
  }, [productToBeUpdated]);

  const resetFields = () => {
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
    setLoading(true);
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = async () => {
    if (!validateInput) return;
    const imagePath = await uploadImage();
    insertProduct({ name, image: imagePath, price: parseFloat(price) }, {
      onSuccess: () => {
        resetFields();
        router.back();
        setLoading(false);
      }
    });
  };

  const onUpdate = () => {
    if (!validateInput) return;
    updateProduct({ id, name, image, price: parseFloat(price) }, {
      onSuccess: () => {
        resetFields();
        router.back();
        setLoading(false);
      }
    });
  };

  const onDelete = () => {
    setDeleting(true);
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace('/(admin)/menu');
        setDeleting(false);
      }
    });
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

  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
      <Image source={{ uri: image || defaultPizzaImageUri }} style={styles.image} />
      <Pressable onPress={pickImage}>{({ pressed }) => (
        <Text style={[styles.buttonText, { opacity: pressed ? 0.5 : 1 }]}>Select image</Text>)}</Pressable>
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
      <Button onPress={onSubmit} text={loading ? (isUpdating ? 'Updating...' : 'Creating...') : (isUpdating ? 'Update' : 'Create')} />
      {isUpdating && <Text style={styles.selectText} onPress={confirmDelete}>{deleting ? 'Deleting...' : 'Delete'}</Text>}
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.tint,
    textAlign: 'center',
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
