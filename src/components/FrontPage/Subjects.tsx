import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Subjects } from "src/functions/types";
import { dummy } from "src/dummy";
import SubjectCard from "../shared/SubjectCard";
import { GET_SUBJECTS } from "src/queries/subjectQueries";
import Loader from "components/shared/Loader";

// console.log(dummy?.subjects);

type Props = {
  navigate: (route: string, query?: any) => void;
};

const Subject = ({navigate}: Props) => {
  const [open, setOpen] = useState(true)
  const { loading, error, data } = useQuery(GET_SUBJECTS);

  if (loading) return <Loader open={open} setOpen={setOpen}/>


  const renderSubjectCard = ({ item }: { item: Subjects }) => (
    <SubjectCard navigate={navigate} id={item.id} title={item.name} />
  );

  return (
    <SafeAreaView className="pb-40" style={[styles.container]}>
      <View style={styles.textView}>
        <Text className="text-bold text-white" style={styles.text1}>
          Choose a Subject
        </Text>
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: "green",
            borderRadius: 100,
          }}
        />
      </View>

      <FlatList
        data={data?.subjects}
        className="mb-64"
        renderItem={renderSubjectCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Subject;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  text1: {
    textAlign: "center",
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
});
