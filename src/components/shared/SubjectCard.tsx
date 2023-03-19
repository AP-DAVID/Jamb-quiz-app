import React, { useRef, useEffect, useState } from "react";
import { View, Text, Animated, TouchableOpacity, Dimensions } from "react-native";
import { Subjects } from "src/functions/types";

type Props = {
  title: string;
  navigate: (route: string, query?: any) => void;
  id : number;
};

const SubjectCard = ({ title, navigate, id }:Props) => {
  // const [query, setQuery] = useState(data)
  const animValue = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");
  const viewHeight = width * 0.5;

  const fadeIn = () => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const interpolatedValue = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const navigateQuiz = () => {
    console.log("presed", title)
    navigate("Quiz", {id})
  }

  return (
    <TouchableOpacity
      onPress={navigateQuiz}
      style={{
        height: viewHeight,
        width: "80%",
        backgroundColor: "#051b34",
        marginBottom: 50,
        paddingBottom : 50,
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SubjectCard;
