import axios from "axios";

export const handleLogout = async (getLoggedIn: any, navigate: any) => {
  try {
    await axios.get("http://172.20.10.2:3002/api/user/logout");
    await getLoggedIn();
    alert("Logout successful");
      navigate("Login");
  } catch (error) {
    return error;
  }
};
