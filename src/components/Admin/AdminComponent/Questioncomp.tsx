import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  GestureResponderEvent,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, FormEvent } from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Question } from "src/functions/types";
import { Formik } from "formik";
import * as yup from "yup";
import { UPDATE_QUESTION } from "src/mutations/subjectMutations";
import { useMutation } from "@apollo/client";
import { GET_SUBJECTS } from "src/queries/subjectQueries";
import DeleteQueModal from "./DeleteQueModal";

type Props = {
  data: Question;
};

const Questioncomp = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateQuestion, { loading }] = useMutation(UPDATE_QUESTION, {
    refetchQueries: [{ query: GET_SUBJECTS }],
  });

  const initialValues = {
    question: data?.question,
    options: data?.options,
    answer: data?.answer,
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
    console.log(values?.question);
    try {
      await updateQuestion({
        variables: {
          id: data?.id,
          question: values.question,
          options: values.options,
          answer: values.answer,
        },
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Failed to add question");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-100}
      className=" flex-row justify-center "
      style={styles.revisionContainer}
    >
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
          <View className="w-full" style={styles.question}>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setOpen(!open);
                }}
                className=" group-hover:flex"
              >
                <FontAwesome5 name="edit" size={24} color="green" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                }}
                className=" group-hover:flex"
              >
                <MaterialCommunityIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <DeleteQueModal
              id={data?.id}
              key={data?.id}
              setVisible={setVisible}
              visible={visible}
            />

            {open && (
              <View className="flex-col justify-center items-center">
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
              </View>
            )}

            {!open && (
              <Text
                className="text-start text-blue-500"
                style={styles.questionText}
              >
                {data?.question}
              </Text>
            )}
            {!open && (
              <View style={styles.optionsContainer}>
                {/* options */}
                {data?.options.map((option) => (
                  <View key={option} style={styles.option}>
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                ))}
              </View>
            )}

            {open && (
              <View className="flex-col justify-center items-center">
                <Text style={styles.inputLabel}>Enter Options</Text>
                {[...Array(4)].map((_, index) => (
                  <View key={index} className="w-screen flex-col items-center">
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
              </View>
            )}

            {/* answer */}
            {!open && (
              <Text className="mt-2" style={styles.optionText}>
                {" "}
                answer : {data?.answer}
              </Text>
            )}

            {open && (
              <View className="flex-col justify-center items-center">
                <Text style={styles.inputLabel}>Enter Answer</Text>
                <View className="w-screen flex-row justify-center">
                  <TextInput
                    placeholder="Enter answer"
                    className="h-10 w-1/2 bg-slate-500 rounded px-2 py-2 text-white placeholder-white"
                    onChangeText={handleChange("answer")}
                    value={values.answer.toString()}
                    onBlur={handleBlur("answer")}
                  />
                </View>
                {touched.answer && errors.answer && (
                  <Text style={styles.errorText}>{errors.answer}</Text>
                )}
              </View>
            )}

            {open && (
              <Pressable
                // style={[styles.button, styles.buttonClose]}
                className="rounded-md px-2 py-2 bg-green-600 mt-2"
                onPress={(event: GestureResponderEvent) => {
                  handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.textStyle}>Update Question</Text>
                )}
              </Pressable>
            )}
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  questionText: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  revisionContainer: {
    alignItems: "center",
  },
  question: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
  },

  optionsContainer: {
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    textAlign: "center",
  },
  option: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  errorText: {
    fontFamily: "Montserrat_400Regular",
    color: "red",
    fontSize: 12,
  },
  inputLabel: {
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
    marginVertical: 10,
  },

  optionText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Questioncomp;
