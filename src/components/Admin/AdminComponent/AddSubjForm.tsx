import {
  GestureResponderEvent,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { FormEvent, useContext } from "react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { ADD_SUBJECT } from "src/mutations/subjectMutations";
import { GET_SUBJECTS } from "src/queries/subjectQueries";
import { AuthContext } from "src/context/AuthContext";

type Props = {
  navigate: (route: string, query?: any) => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const AddSubjForm = ({ navigate }: Props) => {
  const [addSubject] = useMutation(ADD_SUBJECT, {
    update(cache, { data: { addSubject } }) {
      const data: { subjects: any[] } | null = cache.readQuery({
        query: GET_SUBJECTS,
      });

      if (data) {
        cache.writeQuery({
          query: GET_SUBJECTS,
          data: { subjects: [...data.subjects, addSubject] },
        });
      }
    },
    onCompleted: () => {
      Alert.alert("Success", "Subject has been added successfully");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handleLogin = (values: any, { setSubmitting }: any) => {
    addSubject({
      variables: values,
      refetchQueries: [{ query: GET_SUBJECTS }],
    });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
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
              className="text-xl text-slate-300"
            >
              Add a Subject
            </Text>
          </View>

          {/* add Form */}
          <View className="flex flex-col space-y-5">
            {/* The name */}
            <View className="mt-3">
              <Text
                style={{ fontFamily: "Montserrat_400Regular" }}
                className="text-white text-lg"
              >
                Name of the Subject
              </Text>
              <TextInput
                placeholder="Enter subject name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("password")}
                value={values.name}
                className="w-80 text-black bg-white sm:w-80 h-14 px-2 rounded-md"
              />
              {errors.name && touched.name && (
                <Text style={{ color: "red" }}>{errors.name}</Text>
              )}
            </View>

            {/* Login Button */}
            <View className="mt-5">
              <TouchableOpacity
                onPress={(event: GestureResponderEvent) => {
                  handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
                }}
                disabled={isSubmitting}
                className="w-full items-center flex-row justify-center text-center h-14 bg-slate-800 rounded-md hover:bg-slate-600 px-2 text-white"
              >
                <Text
                  style={{ fontFamily: "Montserrat_400Regular" }}
                  className="text-lg text-white text-center"
                >
                  {isSubmitting ? "Loading..." : "Login"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AddSubjForm;
