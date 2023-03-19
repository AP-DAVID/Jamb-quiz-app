import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import Loginform from "components/Auth/Loginfiorm";
import { AuthContext } from "src/context/AuthContext";
import { handleLogout } from "src/functions/functions";
import Frontpage from "components/Frontpage";
import Loader from "components/shared/Loader";

type Props = {
  navigation: {
    navigate: (route: string, query?: any) => void;
  };
};

const Login = ({ navigation: { navigate } }: Props) => {
  const { loggedIn, loading, getLoggedIn } = useContext<any>(AuthContext);
  const [open, setOpen] = useState(true)
  console.log("loading", loading)


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="position"
        keyboardVerticalOffset={-100}
      >
        <View className="font-link flex-col  space-y-5 h-screen  bg-black">
          <View className="flex-row px-4 items-center justify-between">
            <View
              className={`p-10 h-6 ${
                loggedIn ? "pb-10" : "pb-40"
              } flex-row space-x-3 items-center`}
            >
              {/* Header */}
              <View className="h-6">
                <Text
                  style={{ fontFamily: "Montserrat_400Regular" }}
                  className="text-white font-bold text-xl"
                >
                  {loggedIn ? `Hello ${loggedIn?.data?.fullname}` : "Jamb Helper"}
                </Text>
              </View>
              <View className="h-3 w-3 rounded-full bg-green-500"></View>
            </View>

            {loggedIn && <TouchableOpacity
              onPress={(e: any) => {
                e.preventDefault();
                handleLogout(getLoggedIn, navigate);
              }}
              className="px-3 py-3 rounded-md bg-slate-600 "
            >
              <Text className="text-white">Log out</Text>
            </TouchableOpacity>}
          </View>

          {
            loading === false && (
              <Loader open={open} setOpen={setOpen}/>
            )
          }

          {/* Login Form */}
          {(!loggedIn && loading === true) && (
            <>
              <View className="w-full flex-row justify-center">
                <Loginform navigate={navigate} />
              </View>

              <View>
                <Image
                  source="https://images.unsplash.com/photo-1571990455570-31e908d689c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8eW9ydWJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className="object-cover w-full h-full "
                />
              </View>
            </>
          )}

          {loggedIn && <Frontpage navigate={navigate} />}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
