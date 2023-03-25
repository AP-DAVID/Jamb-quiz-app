import {
  GestureResponderEvent,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { FormEvent } from "react";
import { GET_SUBJECTS } from "src/queries/subjectQueries";
import { UPDATE_SUBJECT } from "src/mutations/subjectMutations";
import * as Yup from "yup";
import { Formik } from "formik";
import { gql, useMutation } from "@apollo/client";

type Props = {
  modalVisible: boolean;
  id: string;
  title : string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const UpdateSubModal = ({ modalVisible, setModalVisible, id, title }: Props) => {
  const [updateSubject] = useMutation(UPDATE_SUBJECT, {
    update: (cache, mutationResult) => {
      const updatedSubject = mutationResult.data.updateSubject;
      cache.modify({
        fields: {
          subjects(existingSubjects = []) {
            const updatedSubjectRef = cache.writeFragment({
              data: updatedSubject,
              fragment: gql`
                fragment UpdatedSubject on Subject {
                  id
                  name
                }
              `,
            });
            return existingSubjects.map((subjectRef: any) =>
              subjectRef?.__ref === updatedSubjectRef?.__ref
                ? updatedSubjectRef
                : subjectRef
            );
          },
        },
      });
    },
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const { data } = await updateSubject({
        variables: {
          id: values.id,
          name: values.name,
        },
        refetchQueries: [{ query: GET_SUBJECTS }],
      });
      console.log(data);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-200}
        style={styles.centeredView}
      >
         <Pressable
            onPress={() => setModalVisible(false)}
            className=" flex-col justify-center h-full"
          >
        <Pressable style={styles.modalView} className="px-7">
          <Formik
            initialValues={{ name: "", id: id }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View className="px-5 flex-col justify-center text-white">
                {/* Header */}
                <View className="space-y-5 items-center">
                  <Text
                    style={{ fontFamily: "Montserrat_400Regular" }}
                    className="text-xl text-black"
                  >
                    Update {title}
                  </Text>
                </View>

                {/* add Form */}
                <View className="flex flex-col space-y-5">
                  {/* The name */}
                  <View className="mt-3">
                    <Text
                      style={{ fontFamily: "Montserrat_400Regular" }}
                      className="text-black text-lg"
                    >
                      Name of the Subject
                    </Text>
                    <TextInput
                      placeholder="Enter subject name"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("password")}
                      value={values.name}
                      className="w-80 text-white bg-slate-500 sm:w-80 h-14 px-2 rounded-md"
                    />
                    {errors.name && touched.name && (
                      <Text style={{ color: "red" }}>{errors.name}</Text>
                    )}
                  </View>

                  {/* Login Button */}
                  <View className="mt-5">
                    <TouchableOpacity
                      onPress={(event: GestureResponderEvent) => {
                        handleSubmit(
                          event as unknown as FormEvent<HTMLFormElement>
                        );
                      }}
                      disabled={isSubmitting}
                      className="w-full items-center flex-row justify-center text-center h-14 bg-slate-800 rounded-md hover:bg-slate-600 px-2 text-white"
                    >
                      <Text
                        style={{ fontFamily: "Montserrat_400Regular" }}
                        className="text-lg text-white text-center"
                      >
                        {isSubmitting ? "Loading..." : "Update"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Formik>

          <Pressable
            className="mt-10"
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{ fontFamily: "Montserrat_400Regular" }}
              className="px-2 py-2 text-white rounded"
            >
              Hide Modal
            </Text>
          </Pressable>
        </Pressable></Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default UpdateSubModal;

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
    marginBottom: 15,
    textAlign: "center",
  },
});
