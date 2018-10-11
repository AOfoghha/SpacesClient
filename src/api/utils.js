import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const Serialize = (data) => {
  const fd = new FormData();
  Object.keys(data).map(function (keyName) {
    fd.append(keyName, data[keyName])
  });
  return fd;
}

const Loader = props => {
  const { loading } = props;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => null}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            color="#FFFFFF"
            animating={loading} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#3c3c72',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export { Serialize, Loader };