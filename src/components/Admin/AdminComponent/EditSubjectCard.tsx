import { TouchableOpacity, Text, Dimensions, View } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import React, { useState } from "react";
import UpdateSubModal from "./UpdateSubModal";
import DeleteSubModal from "./DeleteSubModal";
import AddQuesModal from "./AddQuesModal";
import UpdateQuestion from "./UpdateQuestion";

type Props = {
  title: string;
  navigate: (route: string, query?: any) => void;
  id: any;
};

const EditSubjectCard = ({ title, navigate, id }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState(false);
  const [open, setOpen] = useState(false);
  const { width } = Dimensions.get("window");
  const viewHeight = width * 0.5;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("hey");
      }}
      style={{
        height: viewHeight,
        width: "80%",
        backgroundColor: "#051b34",
        marginBottom: 50,
        paddingBottom: 50,
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <UpdateSubModal
        title={title}
        id={id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <AddQuesModal
        setView={setView}
        view={view}
        subjectId={id}
        title={title}
      />

      <DeleteSubModal
        id={id}
        title={title}
        visible={visible}
        setVisible={setVisible}
      />

      <UpdateQuestion id={id} title={title} open={open} setOpen={setOpen}/>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
          fontFamily: "Montserrat_400Regular",
        }}
      >
        {title}
      </Text>

      <View className="flex-row mt-10 group justify-center space-x-4">
        <TouchableOpacity
          onPress={() => {
            setView(true);
          }}
          className=" group-hover:flex"
        >
          <AntDesign name="pluscircle" size={24} color="green" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          className=" group-hover:flex"
        >
          <MaterialIcons name="edit" size={24} color="green" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setOpen(true)
        }} className=" group-hover:flex">
          <FontAwesome5 name="edit" size={24} color="green" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          className=" group-hover:flex"
        >
          <MaterialCommunityIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default EditSubjectCard;
