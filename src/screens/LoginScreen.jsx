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
import Icon from "react-native-vector-icons/Zocial";
import PasIcon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AxiosService from "../utills/AxiosService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);

    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Email and password are required",
      });
      setLoading(false);
      return;
    }

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
      const res = await AxiosService.post("user/loginUser", {
        email,
        password,
      });

      if (res.status === 200) {
        setEmail("");
        setPassword("");

        Toast.show({
          type: "success",
          text1: res.data.message,
        });

        await AsyncStorage.setItem("user", JSON.stringify(res.data));
        navigation.navigate("BottomTab");
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
    <ScrollView style={{flex:1}} >
      <View style={[styles.container]}>
        <View style={styles.LogoContainer}>
          <Image
            style={{ width: "100%", height: 300, objectFit: "contain" }}
            source={require("../assets/loginImg.png")}
          />
        </View>

        <View style={styles.logtex}>
          <Text style={styles.logtexin}>Welcome Back!</Text>
          <Text style={styles.subtext}> Login to your account</Text>
        </View>

        <View style={{ padding: 20 }}>
          <View style={{ marginVertical: 15 }}>
            <View style={styles.emailInp}>
              <Icon style={styles.icons} name="email" size={25} />
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
          <View style={{ marginTop: 8 }}>
            <View style={[styles.emailInp, { paddingHorizontal: 10 }]}>
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
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={styles.logbutton}
              onPress={(event) => handleLogin(event)}
            >
              {loading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <Text
                  style={{ color: "#ffff", fontWeight: "bold", fontSize: 18 }}
                >
                  Login
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
              style={{ textAlign: "center", marginTop: 15, color: Colors.gray }}
            >
              New on our platform ?
            </Text>
            <Pressable onPress={() => navigation.navigate("SignupScreen")}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 15,
                  color: Colors.secondaryLight,
                  fontWeight: "500",
                }}
              >
                Create an account
              </Text>
            </Pressable>
          </View>
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    // backgroundColor: Colors.blueLight,
  },
  LogoContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
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
  emailInp: {
    width: "auto",
    height: 50,
    // padding: 6,
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
  subtext: {
    color: Colors.secondaryLight,
    fontWeight: "700",
  },
  medLogoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
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

export default LoginScreen;
