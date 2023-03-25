import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import { handleLogout } from "src/functions/functions";
import LogModal from "./LogModal";

type Props = {
  navigate: (route: string, query?: any) => void;
};

const Nav = ({ navigate }: Props) => {
  const { loggedIn, loading, getLoggedIn } = useContext<any>(AuthContext);
  const [visible, setVisible] = useState(false);
  return (
    <View className="flex-row mt-10 px-4 items-center justify-between">
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
      <LogModal navigate={navigate} setVisible={setVisible} visible={visible} />
      {/* {loggedIn?.data && ( */}
      <TouchableOpacity
        onPress={(e: any) => {
          e.preventDefault();
          setVisible(true);
        }}
        className="px-3 py-3 rounded-md bg-slate-600 "
      >
        <Text
          style={{ fontFamily: "Montserrat_400Regular" }}
          className="text-white"
        >
          Log out
        </Text>
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
};

export default Nav;
