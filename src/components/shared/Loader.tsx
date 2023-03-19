import React, { useState, useEffect } from "react";
import {
  View,
  Text,

} from "react-native";
interface Props{
    open : any,
    setOpen : any
}



export default function Loader({ open, setOpen } : Props) {
  return (
    <>
   
        <>
          <View className="justify-center text-white items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <View className="items-center space-x-3 flex">
              <View>
                <Text className="text-base text-white">
                  Loading ...
                </Text>
              </View>
              <View>
                <View className="h-10 w-10  border-l-4 border-r-4 rounded-full animate-spin border-blue-900" />
              </View>
            </View>
          </View>
          <View className="opacity-80 fixed inset-0 z-40 bg-black"></View>
        </>
  
    </>
  );
}
