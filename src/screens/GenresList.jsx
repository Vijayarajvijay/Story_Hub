import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Colors } from "../utills/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const GenreDatas = [
  {
    id: 1,
    image: require("../assets/science_friction.jpg"),
    genreTitle: "Science Fiction",
    subtitle: "Where science meets boundless possibility.",
  },
  {
    id: 2,
    image: require("../assets/harror.jpg"),
    genreTitle: "Horror",
    subtitle: "In the darkness, every shadow tells a story.",
  },
  {
    id: 3,
    image: require("../assets/Mystery.jpg"),
    genreTitle: "Mystery",
    subtitle: "Every mystery begins with a question and ends with a twist.",
  },
  {
    id: 4,
    image: require("../assets/Thriller.jpg"),
    genreTitle: "Thriller",
    subtitle: "Thrills await in the shadows of suspense.",
  },
  {
    id: 5,
    image: require("../assets/Romance.jpg"),
    genreTitle: "Romance",
    subtitle: "Love blooms in every chapter, every word.",
  },
  {
    id: 6,
    image: require("../assets/Biography.jpg"),
    genreTitle: "Biography",
    subtitle: "Biographies turn moments into timeless lessons.",
  },
  {
    id: 7,
    image: require("../assets/historical_friction.jpg"),
    genreTitle: "Historical Fiction",
    subtitle: "History retold, emotions revived.",
  },
  {
    id: 8,
    image: require("../assets/True Crime.jpg"),
    genreTitle: "True Crime",
    subtitle: "Where the truth meets the twisted.",
  },
  {
    id: 9,
    image: require("../assets/Travel.jpg"),
    genreTitle: "Travel",
    subtitle: "Travel is the only thing that makes your stories richer.",
  },
];

const GenresList = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const filteredGenres = GenreDatas.filter((genre) =>
    genre.genreTitle.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.search_container}>
        <View style={styles.search}>
          <Icon style={styles.icons} name="search-sharp" size={25} />
          <TextInput
            style={styles.input}
            placeholder="Search by Genre"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
      </View>

      {/* Genre List */}
      <View style={styles.main_container}>
        {filteredGenres.map((data, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Create Story", { genre: data.genreTitle })
            }
            key={index}
            style={styles.genre_container}
          >
            <Image style={styles.genereImage} source={data.image} />
            <View style={{ flexDirection: "row" }}>
              <View style={styles.heading_Container}>
                <Text style={styles.genre_heading}>{data.genreTitle}</Text>
                <Text style={styles.genre_subtittle}>{data.subtitle}</Text>
              </View>
              <Icon
                style={{ alignSelf: "center" }}
                size={30}
                name="arrow-forward-circle"
              />
            </View>
          </TouchableOpacity>
        ))}

        {filteredGenres.length === 0 && (
          <Text style={styles.noResultsText}>No genres match your search.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default GenresList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main_container: {
    padding: 10,
  },
  genre_container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 15,
    borderColor: "#cbd6d0",
    borderWidth: 1,
    gap: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  genereImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    objectFit: "cover",
  },
  genre_heading: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.secondaryLight,
  },
  heading_Container: {
    width: 210,
    gap: 2,
  },
  genre_subtittle: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: "500",
  },
  search_container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  search: {
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
    width: "80%",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: Colors.gray,
  },
});
