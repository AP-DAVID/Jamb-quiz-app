import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { GET_SUBJECT_BY_ID } from "src/queries/subjectQueries";
import { useQuery } from "@apollo/client";
import Questioncomp from "./Questioncomp";
import { Subjects } from "src/functions/types";

type Props = {
  open: boolean;
  id: string;
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateQuestion = ({ open, setOpen, id, title }: Props) => {
  const { loading, error, data } = useQuery(GET_SUBJECT_BY_ID, {
    variables: { id },
    pollInterval: 1000,
  });

  if (loading) return <ActivityIndicator size="small" color="#fff" />;
  if (error) return <Text>Error: {error.message}</Text>;


  const renderSubjectCard = ({ item }: { item: any }) => <Questioncomp key={item?.id} data={item}/>;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setOpen(!open);
        }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={-100}
          style={styles.centeredView}
          
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText} className="font-bold text-lg">{data?.subject?.name} Questions</Text>

            {/* show questions */}

            <FlatList
              data={data.subject.questions}
              renderItem={renderSubjectCard}
              keyExtractor={(item) => item.id.toString()}
            />

            <Pressable
              className="bg-blue-500 px-2 py-2 rounded-md"
              onPress={() => setOpen(!open)}
            >
              <Text className="text-white px-2 py-2 rounded-md">
                Close
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
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
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Montserrat_400Regular",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default UpdateQuestion;
