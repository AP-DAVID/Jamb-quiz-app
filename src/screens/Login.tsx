import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import Loginform from "components/Auth/Loginfiorm";
import { AuthContext } from "src/context/AuthContext";
import { handleLogout } from "src/functions/functions";
import Frontpage from "components/Frontpage";
import Loader from "components/shared/Loader";
import AdminF from "components/Admin/AdminF";
import Nav from "components/shared/Nav";

type Props = {
  navigation: {
    navigate: (route: string, query?: any) => void;
  };
};

const Login = ({ navigation: { navigate } }: Props) => {
  const { loggedIn, loading, getLoggedIn } = useContext<any>(AuthContext);
  const [open, setOpen] = useState(true);

  console.log("loggedIn", loggedIn);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="position"
        keyboardVerticalOffset={-100}
      >
        <View
          className={`font-link flex-col ${
            loggedIn && !loggedIn?.data?.admin && loggedIn?.check
              ? ""
              : "justify-center"
          } space-y-5 h-screen bg-black`}
        >
          {!loggedIn?.data?.admin && loggedIn?.check && (
            <Nav navigate={navigate} />
          )}

          {loading === false && <Loader open={open} setOpen={setOpen} />}

          {/* Login Form */}
          {(!loggedIn?.check && loading) === true && (
            <>
              <View className="w-full flex-row justify-center">
                <Loginform navigate={navigate} />
              </View>

              {/* <View>
                <Image
                  source="https://images.unsplash.com/photo-1571990455570-31e908d689c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8eW9ydWJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className="object-cover w-full h-full "
                />
              </View> */}
            </>
          )}
          {loggedIn && loggedIn?.data?.admin && loggedIn?.check && <AdminF />}
          {loggedIn && !loggedIn?.data?.admin && loggedIn?.check && (
            <Frontpage navigate={navigate} />
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
