import type { ModalProps } from '@/types';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AlertModal = ({ modalVisible, setModalVisible, animation, title, message, buttonStyle1, buttonStyle2, textStyle1, textStyle2, buttonText1, buttonText2, action1, action2 }: ModalProps) => {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={modalVisible ? styles.coloredBackground : undefined}>
        <Modal
          animationType={animation}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, styles.modalTitle]}>{title}</Text>
              <Text style={styles.modalText}>{message}</Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={buttonStyle1}
                  onPress={() => { setModalVisible(!modalVisible); action1(); }}>
                  <Text style={textStyle1}>{buttonText1}</Text>
                </Pressable>
                {buttonText2 ? <Pressable
                  style={buttonStyle2}
                  onPress={() => { setModalVisible(!modalVisible); action2(); }}>
                  <Text style={textStyle2 ? textStyle2 : undefined}>{buttonText2}</Text>
                </Pressable> : undefined}
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  coloredBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
  },
});

export default AlertModal;