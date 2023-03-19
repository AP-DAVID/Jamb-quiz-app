import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import Subject from "./FrontPage/Subjects";

type Props = {
  navigate: (route: string, query?: any) => void;
};

const Frontpage = ({ navigate }: Props) => {
  const { loggedIn } = useContext<any>(AuthContext);

  return (
    <View className="px-2">
      <Subject navigate={navigate} />
    </View>
  );
};

export default Frontpage;

const styles = StyleSheet.create({});
