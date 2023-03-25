import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import Login from "screens/Login";
import { AuthContextProvider } from "src/context/AuthContext";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Signup from "screens/Signup";
import Quiz from "screens/Quiz";
import Admin from "screens/Admin";
import AdminSignup from "screens/AdminSignup";
import Home from "screens/Home";
import { SWRConfig } from "swr";
import { string } from "yup";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        subjects: {
          merge(incoming) {
            return incoming;
          },
        },
      },
    },
    Subject: {
      fields: {
        questions: {
          merge(incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://172.20.10.2:5000/graphql",
  cache,
});

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  // console.log(loggedIn)

  React.useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Montserrat_400Regular });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (appIsReady) {
    SplashScreen.hideAsync();
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <SWRConfig value={{ revalidateOnFocus: true }}>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {/* <Stack.Screen name="Home" component={Home} /> */}
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Admin"
                component={Admin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AdminS"
                component={AdminSignup}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContextProvider>
      </ApolloProvider>
    </SWRConfig>
  );
}
