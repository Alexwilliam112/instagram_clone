import React, { useContext, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import modalStyles from "../../stylesheets/modalStyles";

export default ValidationModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <Text style={modalStyles.modalTitle}>Invalid Input</Text>
          <Text style={modalStyles.modalMessage}>
            Please input in necessary data.
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={modalStyles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
