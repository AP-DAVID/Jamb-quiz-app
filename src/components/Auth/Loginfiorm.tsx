import {
  GestureResponderEvent,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { FormEvent, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "src/context/AuthContext";

type Props = {
  navigate: (route: string, query?: any) => void;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Loginform = ({ navigate }: Props) => {

   const { getLoggedIn, loggedIn } = useContext<any>(AuthContext);

  const handleLogin = (values: any, { setSubmitting }: any) => {
    axios
      .post("http://172.20.10.2:3002/api/user/signin", values)
      .then((response) => {
        getLoggedIn();
        console.log("your login", loggedIn)
        navigate("Login")
        alert("Login successful");
      })
      .catch((error) => {
        alert("Login failed");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
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
              className="text-3xl text-slate-400 tracking-widest     "
            >
              {" "}
              Welcome back
            </Text>
            <Text
              style={{ fontFamily: "Montserrat_400Regular" }}
              className="text-xl text-slate-300"
            >
              Login to your account
            </Text>
          </View>

          {/* Login Form */}
          <View className="flex flex-col space-y-5">
            {/* The email */}
            <View className="mt-3">
              <Text
                style={{ fontFamily: "Montserrat_400Regular" }}
                className="text-white text-lg"
              >
                Email Address
              </Text>
              <TextInput
                keyboardType="email-address"
                placeholder="Email-Address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                className="w-80 text-black bg-white sm:w-80 h-14 px-2 rounded-md"
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
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                className="w-80 text-black bg-white sm:w-80 h-14 px-2 rounded-md"
              />
              {errors.password && touched.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
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

            {/* Signup Link */}
            <View className="mt-3">
              <Text
                className="text-white"
                style={{ fontFamily: "Montserrat_400Regular" }}
              >
                Don't have an account?{" "}
                <Text
                  className="text-sky-400"
                  onPress={() => navigate("Signup")}
                >
                  Signup
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Loginform;
