import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  GestureResponderEvent,
} from "react-native";
import React, { FormEvent } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

type Props = {
  navigate: (route: string) => void;
};

const Signupform = ({ navigate }: Props) => {
  const handleSignup = async (values: any) => {
    try {
      const response = await axios.post(
        "http://172.20.10.2:3002/api/user",
        values
      );
      console.log(response);
      Alert.alert("Success", "User created successfully! Please log in");
      navigate("Login");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to create user.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="px-5 flex-col justify-center text-white">
        {/* Header */}
        <View className="space-y-5 items-center">
          <Text
            style={{ fontFamily: "Montserrat_400Regular" }}
            className="text-3xl text-slate-400 tracking-widest     "
          >
            {" "}
            You are Welcome
          </Text>
          <Text
            style={{ fontFamily: "Montserrat_400Regular" }}
            className="text-xl text-slate-300"
          >
            Create your account
          </Text>
        </View>

        {/* Formik Form */}
        <Formik
          initialValues={{ fullname: "", email: "", password: "" }}
          validationSchema={Yup.object({
            fullname: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Must be at least 8 characters")
              .required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            handleSignup(values);
            resetForm();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="flex flex-col space-y-5">
              {/* The fullname */}
              <View className="mt-3">
                <Text
                  style={{ fontFamily: "Montserrat_400Regular" }}
                  className="text-white text-lg"
                >
                  Full Name
                </Text>
                <TextInput
                  style={{ fontFamily: "Montserrat_400Regular" }}
                  keyboardType="default"
                  placeholder="Enter full name"
                  className="w-80 text-black bg-white sm:w-80 h-14 px-2 rounded-md"
                  onChangeText={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                  value={values.fullname}
                />
                {errors.fullname && touched.fullname && (
                  <Text style={{ color: "red" }}>{errors.fullname}</Text>
                )}
              </View>

              {/* The email */}
              <View className="mt-3">
                <Text
                  style={{ fontFamily: "Montserrat_400Regular" }}
                  className="text-white text-lg"
                >
                  Email Address
                </Text>
                <TextInput
                  style={{ fontFamily: "Montserrat_400Regular" }}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  className="w-80 text-black bg-white sm:w-80 h-14 px-2 rounded-md"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                )}
              </View>
              {/* The password */}
           
                <View className="mt-3">
                  <Text
                    style={{ fontFamily: "Montserrat_400Regular" }}
                    className="text-white text-lg"
                  >
                    Password
                  </Text>
                  <TextInput
                    style={{ fontFamily: "Montserrat_400Regular" }}
                    secureTextEntry={true}
                    placeholder="Enter your password"
                    className="w-80 text-black bg-white sm:w-80 h-14 px-2 rounded-md"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <Text style={{ color: "red" }}>{errors.password}</Text>
                  )}
                </View>
           
              {/* Submit Button */}
              <View className="mt-5">
                <TouchableOpacity
                  className="w-full items-center flex-row justify-center text-center h-14 bg-slate-800 rounded-md hover:bg-slate-600 px-2 text-white"
                  onPress={(event: GestureResponderEvent) => {
                    handleSubmit(
                      event as unknown as FormEvent<HTMLFormElement>
                    );
                  }}
                >
                  <Text
                    style={{ fontFamily: "Montserrat_400Regular" }}
                    className="text-white text-lg"
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Already have an account? */}
              <View className="flex-col items-center mt-5">
                <Text
                  style={{ fontFamily: "Montserrat_400Regular" }}
                  className="text-white text-lg"
                >
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigate("Login")}>
                  <Text
                    style={{ fontFamily: "Montserrat_400Regular" }}
                    className="text-sky-400 text-lg"
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Signupform;
