import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useMutation } from "@apollo/client";
import { DELETE_QUESTION } from "src/mutations/subjectMutations";
import { GET_SUBJECTS } from "src/queries/subjectQueries";

type Props = {
  visible: boolean;
  id: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteQueModal = ({ visible, setVisible, id }: Props) => {
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [{ query: GET_SUBJECTS }],
  });

  const handleDelete = async () => {
    try {
      await deleteQuestion({
        variables: {
          id,
        },
      });
      setVisible(false);
      Alert.alert("Question deleted");
    } catch (error) {
      console.log(error);
      Alert.alert("Failed to delete question");
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(false);
        }}
      >
        <Pressable
          onPress={() => setVisible(false)}
          style={styles.centeredView}
        >
          <Pressable style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this question?
            </Text>

            <View className="flex-row space-x-4 py-2">
              <Pressable
                className="bg-blue-500 px-2 py-2 rounded"
                onPress={handleDelete}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                className="bg-red-500 px-2 py-2 rounded"
                onPress={() => setVisible(false)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
            {/* <Pressable
          className="bg-green-500 px-2 py-2 rounded"
          onPress={() => setVisible(false)}
        >
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable> */}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Montserrat_400Regular",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default DeleteQueModal;
