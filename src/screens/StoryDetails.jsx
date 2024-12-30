import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../utills/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
const StoryDetails = ({ route }) => {
  const { story } = route.params;

  console.log("da", story);

  return (
    <ScrollView>
      <View style={styles.create_component}>
        <Text style={styles.Creatr_head}>Creator Details</Text>
        <View style={styles.Details_inside_container}>
          <View
            style={{
              flexDirection: "row",
              padding: 1,
              alignItems: "center",
              gap: 15,
            }}
          >
            <Icon color={Colors.gray} name="person-circle" size={40} />
            <Text
              style={{ fontSize: 15, fontWeight: "500", textAlign: "center" }}
            >
              {story.userDetails.userName}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 1,
              alignItems: "center",
              gap: 20,
            }}
          >
            <Icon name="mail" color={Colors.gray} size={35} />
            <Text
              style={{ fontSize: 15, fontWeight: "500", textAlign: "center" }}
            >
              {story.userDetails.email}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 1,
              alignItems: "center",
              gap: 20,
            }}
          >
            <Icon color={Colors.gray} name="today" size={35} />
            <Text
              style={{ fontSize: 15, fontWeight: "500", textAlign: "center" }}
            >
              {moment(story.createdAt).format(" DD-MM-YYYY")}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.details_container}>
        <Text style={styles.label}>Genre of the story</Text>
        <View style={styles.Input_container}>
          <Text style={styles.input}>{story.genre}</Text>
        </View>
      </View>

      <View style={styles.details_container}>
        <Text style={styles.label}>Story Title</Text>
        <View style={styles.Input_container}>
          <Text style={styles.input}>{story.title}</Text>
        </View>
      </View>

      <View style={styles.details_container}>
        <Text style={styles.label}>Story description</Text>
        <View
          style={[
            styles.Input_container,
            { height: "auto", paddingHorizontal: 10 },
          ]}
        >
          <Text style={[styles.input, { padding: 15, textAlign: "justify" }]}>
            {story.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default StoryDetails;

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
    //   width: "100%",
    //   paddingHorizontal:15,
    color: Colors.gray,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  details_container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
    color: Colors.secondaryLight,
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
  create_component: {
    backgroundColor: Colors.white,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: "#cbd6d0",
    borderWidth: 1,
  },
  Creatr_head: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 10,
    color: Colors.black,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    textAlign: "center",
    paddingBottom: 10,
  },
  Details_inside_container: {
    padding: 15,
  },
});
