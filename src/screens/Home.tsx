import { View, Text } from "react-native";
import React, { useContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "src/context/AuthContext";

type Props = {
  navigation: {
    navigate: (route: string, query?: any) => void;
  };
};

SplashScreen.preventAutoHideAsync();

const Home = ({ navigation: { navigate } }: Props) => {
  const { loggedIn, loading } = useContext<any>(AuthContext);

  if (!loggedIn) {
    navigate("Login");
    console.log("first", loggedIn);
  } else if (loggedIn?.data?.admin) {
    navigate("Admin");
    console.log("second", loggedIn);
  } else if (!loggedIn?.data?.admin) {
    navigate("Login");
    console.log("Third", loggedIn);
  }

  if (loading) {
    return null;
  }
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
