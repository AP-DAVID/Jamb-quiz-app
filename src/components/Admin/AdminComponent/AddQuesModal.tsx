import React, { FormEvent } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  GestureResponderEvent,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "src/mutations/subjectMutations";
import { GET_SUBJECTS } from "src/queries/subjectQueries";
import { Formik } from "formik";
import * as yup from "yup";

type Props = {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  subjectId: string;
  title: string;
};

const AddQuesModal = ({ view, setView, subjectId, title }: Props) => {
  const [addQuestion, { loading }] = useMutation(ADD_QUESTION, {
    refetchQueries: [{ query: GET_SUBJECTS }],
  });

  const initialValues = {
    question: "",
    options: ["", "", "", ""],
    answer: "",
  };

  const validationSchema = yup.object({
    question: yup.string().required("Question is required"),
    options: yup
      .array()
      .of(yup.string().required("Option is required"))
      .min(4, "At least 4 options are required")
      .max(4, "At most 4 options are allowed"),
    answer: yup
      .string()
      .required("Answer is required")
      .test(
        "is-valid-answer",
        "Answer should be one of the options",
        function (value) {
          const options = this.parent.options;
          return options.includes(value);
        }
      ),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await addQuestion({
        variables: {
          subjectId,
          question: values.question,
          options: values.options,
          answer: values.answer,
        },
      });
      setView(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Failed to add question");
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={view}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setView(false);
        }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={-100}
          style={styles.centeredView}
        >
          <TouchableOpacity
            onPress={() => setView(false)}
            className=" flex-col justify-center h-full"
          >
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                console.log("nothing");
              }}
              style={styles.modalView}
            >
              <Text style={styles.modalText}>Add Questions to {title}</Text>

              <Formik
                initialValues={initialValues}
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
                  <>
                    <Text style={styles.inputLabel}>Enter Question</Text>
                    <View className="w-screen flex-row justify-center">
                      <TextInput
                        placeholder="Enter question"
                        className="h-10 w-1/2 bg-slate-500 rounded px-2 py-2 text-white placeholder-white"
                        onChangeText={handleChange("question")}
                        value={values.question}
                        onBlur={handleBlur("question")}
                      />
                    </View>
                    {touched.question && errors.question && (
                      <Text style={styles.errorText}>{errors.question}</Text>
                    )}

                    <Text style={styles.inputLabel}>Enter Options</Text>

                    {[...Array(4)].map((_, index) => (
                      <View
                        key={index}
                        className="w-screen flex-col items-center"
                      >
                        <TextInput
                          placeholder={`Option ${index + 1}`}
                          style={{ fontFamily: "Montserrat_400Regular" }}
                          className="bg-slate-200 rounded w-1/2 px-2 py-2 mb-2"
                          onChangeText={handleChange(`options[${index}]`)}
                          value={values.options[index]}
                          onBlur={handleBlur(`options[${index}]`)}
                        />
                        {touched.options &&
                          errors.options &&
                          errors.options[index] && (
                            <Text style={styles.errorText}>
                              {errors.options[index]}
                            </Text>
                          )}
                      </View>
                    ))}
                    <Text style={styles.inputLabel}>Enter Answer</Text>
                    <View className="w-screen flex-row justify-center">
                      <TextInput
                        placeholder="Enter answer"
                        className="h-10 w-1/2 bg-slate-500 rounded px-2 py-2 text-white placeholder-white"
                        onChangeText={handleChange("answer")}
                        value={values.answer}
                        onBlur={handleBlur("answer")}
                      />
                    </View>
                    {touched.answer && errors.answer && (
                      <Text style={styles.errorText}>{errors.answer}</Text>
                    )}

                    <Pressable
                      // style={[styles.button, styles.buttonClose]}
                      className="rounded px-2 py-2 bg-blue-600 mt-2"
                      onPress={(event: GestureResponderEvent) => {
                        handleSubmit(
                          event as unknown as FormEvent<HTMLFormElement>
                        );
                      }}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.textStyle}>Add Question</Text>
                      )}
                    </Pressable>

                    <Pressable
                      className="rounded px-2 py-2 bg-blue-600 mt-5"
                      onPress={() => setView(false)}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                  </>
                )}
              </Formik>
            </Pressable>
          </TouchableOpacity>
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
    marginVertical: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  inputLabel: {
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    fontFamily: "Montserrat_400Regular",
    alignItems: "center",
    marginVertical: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    fontFamily: "Montserrat_400Regular",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    fontFamily: "Montserrat_400Regular",
    color: "red",
    fontSize: 12,
  },
});

export default AddQuesModal;
