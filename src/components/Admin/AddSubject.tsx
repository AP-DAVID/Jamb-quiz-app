import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import Nav from "components/shared/Nav";
import AddSubjForm from "./AdminComponent/AddSubjForm";

type Props = {
  navigation: {
    navigate: (route: string, query?: any) => void;
  };
};

const AddSubject = ({ navigation: { navigate } }: Props) => {
  const { loggedIn, loading, getLoggedIn } = useContext<any>(AuthContext);

  return (
    <View className="bg-black">
      <Nav navigate={navigate} />
      <View className="font-link flex-col justify-center  space-y-5 h-screen  bg-black">
        <View className="w-full flex-row justify-center">
          <AddSubjForm navigate={navigate} />
        </View>
      </View>
    </View>
  );
};

export default AddSubject;
