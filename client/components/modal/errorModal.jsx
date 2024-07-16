import React, { useContext, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import modalStyles from "../../stylesheets/modalStyles";

export default ErrorModal = ({ modalVisible, setModalVisible, errorObj }) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <Text style={modalStyles.modalTitle}>Error</Text>
          <Text style={modalStyles.modalMessage}>
            {errorObj?.networkError?.result?.errors[0]?.message}
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={modalStyles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
