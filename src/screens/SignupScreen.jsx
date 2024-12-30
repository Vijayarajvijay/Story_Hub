import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../utills/Colors";
import { useState } from "react";
import {
  Zocial,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "react-native-vector-icons";
import PasIcon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AxiosService from "../utills/AxiosService";
import Toast from "react-native-toast-message";

const SignupScreen = () => {
  const [date, setDate] = useState(new Date());
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDateSelected(true);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const userRegister = async () => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid email address",
      });
      setLoading(false);
      return;
    }
    try {
      const res = await AxiosService.post("user/registerUser", {
        userName,
        email,
        address,
        password,
        confirmPassword,
      });

      if (res.status === 201) {
        setUserName("");
        setEmail("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");
        Toast.show({
          type: "success",
          text1: res.data.message,
        });
        navigation.navigate("Login");
      }
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: error.response.data.message,
        });
      } else if (error.message) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      } else {
        console.log("An unexpected error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.LogoContainer}>
        <Image
          style={{ width: "100%", height: 200, marginTop: 50 }}
          //   source={require('../assets/storyTeling.png')}
          source={require("../assets/signupImg.png")}
        />
      </View>

      <View style={styles.logtex}>
        <Text style={styles.logtexin}>Create an account </Text>
        <Text style={styles.subtext}>
          {" "}
          Unlock the universe of stories, your way
        </Text>
      </View>

      <View style={styles.InputContainer}>
        <View style={styles.particularInput}>
          <View style={styles.emailInp}>
            <FontAwesome style={styles.icons} name="user" size={30} />
            <TextInput
              onChangeText={setUserName}
              value={userName}
              style={styles.input}
              placeholder="User Name"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <View style={styles.particularInput}>
          <View style={styles.emailInp}>
            <Zocial style={styles.icons} name="email" size={25} />
            <TextInput
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              placeholder="Email address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <View style={styles.particularInput}>
          <View style={styles.emailInp}>
            <FontAwesome6
              style={styles.icons}
              name="map-location-dot"
              size={25}
            />
            <TextInput
              onChangeText={setAddress}
              value={address}
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <View style={styles.particularInput}>
          <View style={[styles.emailInp, { paddingHorizontal: 15 }]}>
            <PasIcon color={Colors.secondary} name="lock" size={25} />
            <TextInput
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              value={password}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
            />
            <PasIcon
              name={showPassword ? "eye" : "eye-with-line"}
              size={18}
              style={{ marginTop: 7 }}
              onPress={toggleShowPassword}
            />
          </View>
        </View>

        <View style={styles.particularInput}>
          <View style={[styles.emailInp, { paddingHorizontal: 15 }]}>
            <PasIcon color={Colors.secondary} name="lock" size={25} />
            <TextInput
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
            />
            <PasIcon
              name={showConfirmPassword ? "eye" : "eye-with-line"}
              size={18}
              style={{ marginTop: 7 }}
              onPress={toggleShowConfirmPassword}
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.logbutton} onPress={userRegister}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text
                style={{ color: "#ffff", fontWeight: "bold", fontSize: 18 }}
              >
                Signup
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", marginTop: 20, color: Colors.gray }}
          >
            Already have an account ?
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                textAlign: "center",
                marginTop: 15,
                color: Colors.secondaryLight,
                fontWeight: "500",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "gray",
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    borderColor: "purple",
    color: "black",
    paddingRight: 30,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  LogoContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logtex: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logtexin: {
    fontSize: 30,
    fontWeight: "900",
    color: Colors.secondary,
  },
  subtext: {
    color: Colors.secondaryLight,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
  },
  emailInp: {
    width: "auto",
    height: 50,
    marginVertical: 8,
    backgroundColor: Colors.white,
    borderRadius: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logbutton: {
    backgroundColor: Colors.secondary,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 8,
  },
  input: {
    width: "80%",
  },
  icons: {
    color: Colors.secondary,
  },
  InputContainer: {
    padding: 20,
  },
  particularInput: {
    marginTop: 15,
  },
  medLogoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginVertical: 30,
  },
  medLogo: {
    width: "15%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  appName: {
    color: Colors.secondary,
    fontSize: 20,
    fontWeight: "900",
    alignItems: "center",
    marginTop: 15,
  },
});

export default SignupScreen;
