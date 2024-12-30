import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View,TextInput,TouchableOpacity,Button} from "react-native";
import { Colors } from "../utills/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from 'expo-av';
import { Biographies } from "../AudioBookData/Biography";
import { HistoricalFiction } from "../AudioBookData/HistoricalFiction";
import { Horror } from "../AudioBookData/Horror";
import { Mystery } from "../AudioBookData/Mystery";
import { Romance } from "../AudioBookData/Romance";
import { ScienceFiction } from "../AudioBookData/ScienceFiction";
import { Thriller } from "../AudioBookData/Thriller";
import { Travel } from "../AudioBookData/Travel";
import { TrueCrime } from "../AudioBookData/TrueCrime";



const AudioBookList = ({ route }) => {
    const navigation = useNavigation()
  const { genre } = route.params;
  const [playingId, setPlayingId] = useState(null); 
  const [sound, setSound] = useState(null); 
  const [storydetails , setStoryDetails] = useState([])
  const [genreImg, setGenreImg] = useState(null); 
  const [searchText, setSearchText] = useState("");

  

  useEffect(() => {

if(genre === 'Biography'){
setStoryDetails(Biographies)
}
else if (genre === 'Historical Fiction'){
    setStoryDetails(HistoricalFiction)

} 
else if (genre === 'Horror'){
    setStoryDetails(Horror)

}
else if (genre === 'Mystery'){
    setStoryDetails(Mystery)

}
else if (genre === 'Romance'){
    setStoryDetails(Romance)

}
else if (genre === 'Science Fiction'){
    setStoryDetails(ScienceFiction)

}
else if (genre === 'Thriller'){
    setStoryDetails(Thriller)

}
else if (genre === 'Travel'){
    setStoryDetails(Travel)

}
else if (genre === 'True Crime'){
    setStoryDetails(TrueCrime)

}

    if (genre === "Science Fiction") {
      setGenreImg(require("../assets/science_friction.jpg"));
    } else if (genre === "Horror") {
      setGenreImg(require("../assets/harror.jpg"));
    } else if (genre === "Mystery") {
      setGenreImg(require("../assets/Mystery.jpg"));
    } else if (genre === "Thriller") {
      setGenreImg(require("../assets/Thriller.jpg"));
    } else if (genre === "Romance") {
      setGenreImg(require("../assets/Romance.jpg"));
    } else if (genre === "Biography") {
      setGenreImg(require("../assets/Biography.jpg"));
    } else if (genre === "Historical Fiction") {
      setGenreImg(require("../assets/historical_friction.jpg"));
    } else if (genre === "True Crime") {
      setGenreImg(require("../assets/True Crime.jpg"));
    } else if (genre === "Travel") {
      setGenreImg(require("../assets/Travel.jpg"));
    }
  }, [genre]);

  console.log('ds',storydetails);
  const images = [
    require('../assets/audioBook1.jpg'),
    require('../assets/audioBook2.jpg'),
    require('../assets/audioBook3.jpg'),
    require('../assets/audioBook4.jpg'),
  ];

  

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined; // Cleanup sound on unmount
  }, [sound]);

  const playAudio = async (id, audio) => {
    if (sound) {
      await sound.unloadAsync(); // Stop currently playing audio
    }
    const { sound: newSound } = await Audio.Sound.createAsync(audio);
    setSound(newSound);
    setPlayingId(id);
    await newSound.playAsync(); // Start playing the new audio
  };

  const toggleAudio = async (id, audio) => {
    if (playingId === id) {
      // If the audio is already playing, pause it
      await sound.pauseAsync();
      setPlayingId(null);
    } else {
      // If a new audio is selected, play it
      await playAudio(id, audio);
    }
  };

  const filteredGenres = storydetails.filter((genre) =>
    genre.title.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <ScrollView style={styles.container}>
      <View style={styles.Image_container}>
        {genreImg && ( 
          <Image
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              objectFit: "cover",
            }}
            source={genreImg}
          />
        )}
        <Text style={styles.genre_heading_Top}>{genre} Genre</Text>
      </View>
      <View style={styles.search_container}>
        <View style={styles.search}>
          <Icon style={styles.icons} name="search-sharp" size={25} />
          <TextInput
            style={styles.input}
            placeholder="Search Story Name"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
      </View>
      <View style={styles.main_container}>
        {filteredGenres.map((data, index) => (
          <View key={data.id} style={styles.genre_container}>
            <Image style={styles.genereImage} source={images[index % images.length]} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.heading_Container}>
                <Text style={styles.genre_heading}>
                  {index + 1}. {data.title}
                </Text>
                <Text style={styles.genre_subtitle}>{data.date}</Text>
              </View>
              <Icon
                name={playingId === data.id ? "pause-circle" : "play-circle"}
                size={30}
                color={Colors.secondaryLight}
                onPress={() => toggleAudio(data.id, data.audio)}
              />
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  );
};

export default AudioBookList;

const styles = StyleSheet.create({
  Image_container: {
    padding: 10,
  },
  genre_heading_Top: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.secondaryLight,
    textAlign: "center",
    marginTop: 10,
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
  container:{
    flex:1
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
  main_container: {
    padding: 10,
  },
});
