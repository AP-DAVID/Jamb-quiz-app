import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import Signupform from "components/Auth/Signupform";

type Props = {
  navigation: {
    navigate: (route: string) => void;
  };
};

const Signup = ({ navigation: { navigate } }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="position"
        keyboardVerticalOffset={-100}
      >
        <View className="font-link flex-col  space-y-5 h-screen  bg-black">
          <View className="p-10 h-6 pb-20 flex-row space-x-3 items-center">
            {/* Header */}
            <View className="h-6">
              <Text
                style={{ fontFamily: "Montserrat_400Regular" }}
                className="text-white font-bold text-xl"
              >
                Jamb Helper
              </Text>
            </View>
            <View className="h-3 w-3 rounded-full bg-green-500"></View>
          </View>

          {/* Signup Form */}
          <View className="w-full flex-row justify-center">
            <Signupform navigate={navigate} />
          </View>

          <View>
            <Image
              source="https://images.unsplash.com/photo-1571990455570-31e908d689c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8eW9ydWJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              className="object-cover w-full h-full "
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
