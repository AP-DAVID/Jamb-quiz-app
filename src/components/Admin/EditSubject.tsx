import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Nav from "components/shared/Nav";
import { GET_SUBJECTS } from "src/queries/subjectQueries";
import { Subjects } from "src/functions/types";
import { useQuery } from "@apollo/client";
import Loader from "components/shared/Loader";
import EditSubjectCard from "./AdminComponent/EditSubjectCard";

type Props = {
  navigation: {
    navigate: (route: string, query?: any) => void;
  };
};


const EditSubject = ({ navigation: { navigate } }: Props) => {

  const [open, setOpen] = useState(true);
    const {
      data: apolloData,
      loading: apolloLoading,
      error: apolloError,
      refetch: apolloRefetch,
    } = useQuery(GET_SUBJECTS, {pollInterval : 1000});

  console.log(apolloData)
  if (apolloLoading)
    return <Loader open={open} setOpen={setOpen} />;

  const renderSubjectCard = ({ item }: { item: Subjects }) => (
    <EditSubjectCard
      key={item.id}
      title={item.name}
      id={item.id}
      navigate={navigate}
    />
  );

  return (
    <SafeAreaView className="pb-40" style={[styles.container]}>
      <View className="font-link flex-col  space-y-5 h-screen  bg-slate-500">
        <Nav navigate={navigate} />

        <View style={styles.textView}>
          <Text className="text-bold text-white" style={styles.text1}>
            Edit Subject and Questions
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
          data={apolloData?.subjects}
          className="mb-40"
          renderItem={renderSubjectCard}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditSubject;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  text1: {
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
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
