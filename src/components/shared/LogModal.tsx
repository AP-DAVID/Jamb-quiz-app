import React, { useContext } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { AuthContext } from "src/context/AuthContext";
import { handleLogout } from "src/functions/functions";

type Props = {
  visible: boolean;
  navigate: (route: string, query?: any) => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogModal = ({ navigate, visible, setVisible}: Props) => {
    const { getLoggedIn } = useContext<any>(AuthContext);


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
              Are you sure you want to Logout? 
            </Text>

            <View className="flex-row space-x-4 py-2">
              <Pressable
                className="bg-blue-500 px-2 py-2 rounded"
                onPress={(e: any) => {
                  e.preventDefault();
                  handleLogout(getLoggedIn, navigate);
                  setVisible(false)
                }}
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

export default LogModal;
