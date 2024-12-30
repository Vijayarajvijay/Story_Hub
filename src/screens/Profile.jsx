// AccountDetails.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../utills/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const [userdata, setUser] = useState();

  useEffect(() => {
    getuserDetails();
  }, []);

  const getuserDetails = async () => {
    const userDetails = await AsyncStorage.getItem("user");
    const parserdData = JSON.parse(userDetails);
    setUser(parserdData);

    // console.log('fs',userdata.user.id);
  };

  const handleLogout = () => {
    removeLocal();
    navigation.navigate("Login");
  };

  const removeLocal = async () => {
    await AsyncStorage.clear;
  };

  const userInfo = {
    name: "User",
    phone: "6384084510",
    email: "user@gmail.com",
    age: "06/07/2024",
    gender: "Male",
    location: "Chennai, India",
    pinCode: "600028",
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../assets/profileImg.png")}
        />
        {/* <Text style={styles.name}>{userInfo.name}</Text> */}
      </View>
      <View style={styles.details}>
        <DetailItem
          icon="person-sharp"
          text={userdata?.user?.userName}
          subtext="User-Name"
        />
        <DetailItem
          icon="mail-sharp"
          text={userdata?.user?.email}
          subtext="Email-Id"
        />
        <DetailItem
          icon="location-sharp"
          text={userdata?.user?.address}
          subtext={`Pin Code: ${userInfo.pinCode}`}
        />
      </View>

      <View style={{ paddingHorizontal: 15 }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logout_btn_container}
        >
          <Feather name="power" size={18} color={Colors.white} />
          <Text style={styles.logout_btn_txt}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const DetailItem = ({ icon, text, subtext }) => (
  <View style={styles.detailItem}>
    <Icon
      name={icon}
      size={24}
      color={Colors.secondary}
      style={styles.detailIcon}
    />
    <View>
      <Text style={styles.detailText}>{text}</Text>
      <Text style={styles.detailSubtext}>{subtext}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007bff",
    padding: 15,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
  },
  profile: {
    alignItems: "center",
    marginVertical: 20,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
  },
  details: {
    marginHorizontal: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailIcon: {
    marginRight: 20,
  },
  detailText: {
    fontSize: 16,
  },
  detailSubtext: {
    color: "#aaa",
  },
  EditButton: {
    flexDirection: "row",
    width: "40%",
    height: 40,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
    borderRadius: 10,
  },
  medLogoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 100,
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
  logout_btn_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.black,
    padding: 10,
    marginTop: hp(3),
    borderRadius: 7,
    gap: 10,
    marginBottom: hp(5),
  },
  logout_btn_txt: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});

export default Profile;
