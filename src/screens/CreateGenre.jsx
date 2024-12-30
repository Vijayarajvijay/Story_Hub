import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import bookGif from "../assets/write.png";
import { Colors } from "../utills/Colors";
import AxiosService from "../utills/AxiosService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreateGenre = ({ route }) => {
  const { genre } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const createStory = async () => {
    const userDetails = await AsyncStorage.getItem("user");
    const parsedData = JSON.parse(userDetails);
    const userId = parsedData.user.id;

    setLoading(true);
    try {
      const res = await AxiosService.post("story/createStory", {
        userId,
        title,
        genre,
        description,
      });

      if (res.status === 201) {
        Toast.show({
          type: "success",
          text1: res.data.message,
        });
        setTitle("");
        setDescription("");

        navigation.navigate("BottomTab");
      }
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: error.response.data.message || "Something went wrong.",
        });
      } else if (error.message) {
        Toast.show({
          type: "error",
          text1: error.message || "An error occurred.",
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
      <View>
        <View style={styles.heading_container}>
          <Image
            style={{ width: 150, height: 150 }}
            source={bookGif}
            alt="gif"
          />
          <Text style={styles.heading_style}>
            Write and Share Your Masterpiece
          </Text>
        </View>
        <View style={styles.details_container}>
          <Text style={styles.label}>Genre of the story</Text>
          <View style={styles.Input_container}>
            <TextInput
              style={styles.input}
              placeholder="Search by Genre"
              placeholderTextColor="#aaa"
              value={genre}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.details_container}>
          <Text style={styles.label}>Story Title</Text>
          <View style={styles.Input_container}>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              placeholder="Enter Title"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <View style={styles.details_container}>
          <Text style={styles.label}>Story description</Text>
          <View style={[styles.Input_container, styles.textAreaContainer]}>
            <TextInput
              style={[styles.input, styles.textAreaInput]}
              multiline={true}
              onChangeText={setDescription}
              numberOfLines={50}
              placeholder="Enter your story description"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.logbutton} onPress={createStory}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Text
              style={{
                color: "#ffff",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Create Story
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateGenre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  heading_style: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    color: Colors.secondaryLight,
  },
  Input_container: {
    width: "auto",
    height: 50,
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    paddingHorizontal: 15,
    color: Colors.gray,
    fontSize: 15,
    fontWeight: "500",
  },
  details_container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 10,
  },
  textAreaContainer: {
    height: 400,
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  textAreaInput: {
    textAlignVertical: "top",
    width: "100%",
    height: "100%",
    padding: 10,
  },
  logbutton: {
    backgroundColor: Colors.secondary,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 8,
    // padding:10,
    margin: 20,
  },
});
