import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import writeBook from "../assets/writeBook.png";
import listenBook from "../assets/listenBook.png";
import { Colors } from "../utills/Colors";
import Carousel_slider from "../components/Carousel_slider";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 5 }}>
        <Carousel_slider />
      </View>
      <Text style={styles.heading_style}>Curated Genre Based Narratives</Text>
      <View style={styles.main_image_container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Genres")}
          style={styles.image_container}
        >
          <Image style={styles.image_style} source={writeBook} />
          <Text style={styles.TextStyle}>
            Create Your Genre Based Narratives
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("All Genres")}
          style={[styles.image_container, { marginTop: 20 }]}
        >
          <Image style={styles.image_style} source={listenBook} />
          <Text style={styles.TextStyle}>Listen Your Genre Story</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_style: {
    width: 170,
    height: 170,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  image_container: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#cbd6d0",
    marginTop: 10,
    width: 300,
  },
  main_image_container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  TextStyle: {
    marginVertical: 10,
    fontSize: 14,
    fontWeight: "600",
    borderTopColor: Colors.gray,
  },
  heading_style: {
    backgroundColor: Colors.white,
    height: 40,
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "700",
    color: Colors.secondaryLight,
    marginTop: 10,
  },
});
