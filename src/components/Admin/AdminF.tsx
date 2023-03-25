// import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AddSubject from "./AddSubject";
import EditSubject from "./EditSubject";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        initialRouteName="Subject"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#ffff",
          tabBarInactiveTintColor: "#828282",
          tabBarStyle: {
            backgroundColor: "#051b34",
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 3 },
            shadowColor: "#000",
            shadowOpacity: 0.5,
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "Montserrat_400Regular",
            fontWeight: "bold",
            marginBottom: 5,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Subject") {
              iconName = "home";
            } else if (route.name === "Quiz") {
              iconName = "book";
            }

            return (
              <MaterialCommunityIcons
                // name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Addsubject"
          component={AddSubject}
          options={{
            tabBarLabel: "Add Subject",
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "#ffffff",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Edit"
          component={EditSubject}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
}
