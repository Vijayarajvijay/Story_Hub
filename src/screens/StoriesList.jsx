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
import { Colors } from "../utills/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AxiosService from "../utills/AxiosService";
import Toast from "react-native-toast-message";
import moment from "moment";

// const storydetails = [
//     {
//         id:1,
//         genre:'Horror',
//         title:"Beyond the Event Horizon",
//         description:`Lorem ipsum odor amet, consectetuer adipiscing elit. Ante blandit mattis vulputate vestibulum curabitur morbi. Conubia nulla donec sagittis convallis tempor venenatis in primis nisl. Leo rutrum sed sem at tempor; tristique viverra augue habitant. Volutpat vulputate nascetur torquent; rutrum mauris bibendum mauris feugiat. Magna faucibus dis sapien aenean ultrices feugiat augue. Amet vitae feugiat hendrerit rutrum tempus vehicula litora. Taciti hac mollis magna cubilia posuere volutpat tincidunt.

// Platea maximus himenaeos nec vitae hendrerit sodales ultrices. Justo bibendum consequat quisque; cubilia taciti maecenas nibh taciti. Sodales habitant velit hendrerit urna mollis malesuada erat. Ad suscipit quisque dis leo morbi tempor. Sem cras proin mollis dapibus maecenas ullamcorper facilisis. Ac ornare conubia maecenas ultricies luctus nostra. Integer dis sagittis blandit convallis elementum mollis. Netus posuere vestibulum; malesuada dignissim ridiculus cubilia.

// Class hendrerit mus facilisis neque nascetur. Pulvinar torquent morbi ornare tristique tempus pulvinar. Lorem pretium mattis dis leo justo. Auctor torquent orci purus vitae ultricies dis. Augue potenti curabitur posuere metus ornare convallis quisque semper. Odio dui cubilia dapibus potenti sodales vulputate metus sapien. Non luctus posuere velit nascetur nam montes feugiat. Eget netus hac nascetur risus ac quis vel. Quis ornare malesuada accumsan mauris potenti tortor.

// Ridiculus eu conubia class rhoncus in augue. Vestibulum erat feugiat magnis tortor ultrices eleifend cras metus maecenas. Vivamus justo proin vestibulum porttitor montes dui; proin tortor imperdiet. Id eros leo ullamcorper tortor nisl molestie. Bibendum ante fames gravida netus dui vehicula laoreet. Nullam class proin volutpat rutrum imperdiet class curae ultrices. Diam suspendisse augue faucibus venenatis posuere eros suspendisse arcu. Condimentum suscipit convallis donec conubia pretium varius.

// Nam luctus curae mauris phasellus natoque libero ornare aliquet. Nullam sodales auctor massa luctus placerat consectetur. Commodo lectus eu mus vehicula; fringilla ligula potenti imperdiet aliquet. Aliquet nisl viverra sapien vulputate eleifend! Mattis neque et ligula tincidunt parturient hac. Tellus eleifend efficitur eu sapien laoreet pulvinar et molestie magnis. Pharetra penatibus arcu dis sed mus. Suscipit nisi fermentum ridiculus donec nunc quam. Placerat hendrerit sem pulvinar porttitor porttitor mollis lorem mauris.

// Lacinia litora elit dis praesent nibh adipiscing. Felis litora rutrum quis aliquam viverra convallis pulvinar montes. At etiam class cubilia in mollis. Etiam semper porttitor a libero aliquet mattis fringilla viverra. Lobortis vulputate curabitur netus feugiat tempus natoque purus accumsan mi. Montes velit lorem senectus quam eu suspendisse. Pharetra facilisis euismod potenti integer ac varius egestas senectus?

// Inceptos pulvinar rutrum primis curae aenean. Litora cubilia cras donec imperdiet sociosqu elit. Iaculis proin sapien imperdiet vestibulum nunc laoreet. Erat blandit convallis laoreet nibh mattis ut potenti. Platea morbi class odio luctus lacinia quisque a. Lobortis ridiculus mus et montes luctus donec. Platea convallis morbi natoque molestie blandit fusce. Elementum rutrum curabitur libero lorem blandit purus ut.

// Suspendisse lacus varius nunc laoreet elementum lacus lobortis euismod eros. Ullamcorper in fermentum praesent facilisis velit est phasellus class. Vivamus accumsan inceptos eleifend lacus vivamus. Efficitur accumsan convallis tortor elit, est vehicula duis. Nostra sit vulputate feugiat nibh; congue aliquam fusce. Primis accumsan tristique vel finibus a class. Sodales malesuada himenaeos pharetra cras vestibulum massa ad cras. Volutpat ante ultrices a vulputate penatibus etiam non. Turpis maximus adipiscing, maecenas consequat ante rutrum.

// Consequat suscipit aptent fermentum aliquet dapibus posuere maecenas. Porttitor ullamcorper aenean ultricies potenti per nam nec. Nascetur per ac nisl feugiat suspendisse scelerisque. Nostra rhoncus sollicitudin pretium bibendum per, mattis lectus accumsan. Urna nascetur sollicitudin class interdum facilisi integer volutpat consequat porttitor. Suspendisse diam consequat eget venenatis nec lobortis posuere. Arcu augue nullam fermentum nibh phasellus duis. Gravida nunc parturient; leo quisque eu sed dolor vitae.

// Integer ultrices aptent ipsum, natoque tellus lobortis. Sed fringilla pulvinar iaculis hendrerit ipsum viverra? Est mollis gravida nisl gravida ut. Viverra urna amet maximus volutpat vel erat, vitae magna magna. Placerat facilisi massa amet ad vel urna donec diam. Tincidunt tortor nisl porta sagittis fringilla laoreet sodales. Congue dignissim tristique placerat sapien dolor vivamus?`,
// date:"10-02-2024"
//     },
//     {
//         id:2,
//         genre:'Travel',
//         title:"Beyond the Event Horizon",
//         description:`Lorem ipsum odor amet, consectetuer adipiscing elit. Ante blandit mattis vulputate vestibulum curabitur morbi. Conubia nulla donec sagittis convallis tempor venenatis in primis nisl. Leo rutrum sed sem at tempor; tristique viverra augue habitant. Volutpat vulputate nascetur torquent; rutrum mauris bibendum mauris feugiat. Magna faucibus dis sapien aenean ultrices feugiat augue. Amet vitae feugiat hendrerit rutrum tempus vehicula litora. Taciti hac mollis magna cubilia posuere volutpat tincidunt.

// Platea maximus himenaeos nec vitae hendrerit sodales ultrices. Justo bibendum consequat quisque; cubilia taciti maecenas nibh taciti. Sodales habitant velit hendrerit urna mollis malesuada erat. Ad suscipit quisque dis leo morbi tempor. Sem cras proin mollis dapibus maecenas ullamcorper facilisis. Ac ornare conubia maecenas ultricies luctus nostra. Integer dis sagittis blandit convallis elementum mollis. Netus posuere vestibulum; malesuada dignissim ridiculus cubilia.

// Class hendrerit mus facilisis neque nascetur. Pulvinar torquent morbi ornare tristique tempus pulvinar. Lorem pretium mattis dis leo justo. Auctor torquent orci purus vitae ultricies dis. Augue potenti curabitur posuere metus ornare convallis quisque semper. Odio dui cubilia dapibus potenti sodales vulputate metus sapien. Non luctus posuere velit nascetur nam montes feugiat. Eget netus hac nascetur risus ac quis vel. Quis ornare malesuada accumsan mauris potenti tortor.

// Ridiculus eu conubia class rhoncus in augue. Vestibulum erat feugiat magnis tortor ultrices eleifend cras metus maecenas. Vivamus justo proin vestibulum porttitor montes dui; proin tortor imperdiet. Id eros leo ullamcorper tortor nisl molestie. Bibendum ante fames gravida netus dui vehicula laoreet. Nullam class proin volutpat rutrum imperdiet class curae ultrices. Diam suspendisse augue faucibus venenatis posuere eros suspendisse arcu. Condimentum suscipit convallis donec conubia pretium varius.

// Nam luctus curae mauris phasellus natoque libero ornare aliquet. Nullam sodales auctor massa luctus placerat consectetur. Commodo lectus eu mus vehicula; fringilla ligula potenti imperdiet aliquet. Aliquet nisl viverra sapien vulputate eleifend! Mattis neque et ligula tincidunt parturient hac. Tellus eleifend efficitur eu sapien laoreet pulvinar et molestie magnis. Pharetra penatibus arcu dis sed mus. Suscipit nisi fermentum ridiculus donec nunc quam. Placerat hendrerit sem pulvinar porttitor porttitor mollis lorem mauris.

// Lacinia litora elit dis praesent nibh adipiscing. Felis litora rutrum quis aliquam viverra convallis pulvinar montes. At etiam class cubilia in mollis. Etiam semper porttitor a libero aliquet mattis fringilla viverra. Lobortis vulputate curabitur netus feugiat tempus natoque purus accumsan mi. Montes velit lorem senectus quam eu suspendisse. Pharetra facilisis euismod potenti integer ac varius egestas senectus?

// Inceptos pulvinar rutrum primis curae aenean. Litora cubilia cras donec imperdiet sociosqu elit. Iaculis proin sapien imperdiet vestibulum nunc laoreet. Erat blandit convallis laoreet nibh mattis ut potenti. Platea morbi class odio luctus lacinia quisque a. Lobortis ridiculus mus et montes luctus donec. Platea convallis morbi natoque molestie blandit fusce. Elementum rutrum curabitur libero lorem blandit purus ut.

// Suspendisse lacus varius nunc laoreet elementum lacus lobortis euismod eros. Ullamcorper in fermentum praesent facilisis velit est phasellus class. Vivamus accumsan inceptos eleifend lacus vivamus. Efficitur accumsan convallis tortor elit, est vehicula duis. Nostra sit vulputate feugiat nibh; congue aliquam fusce. Primis accumsan tristique vel finibus a class. Sodales malesuada himenaeos pharetra cras vestibulum massa ad cras. Volutpat ante ultrices a vulputate penatibus etiam non. Turpis maximus adipiscing, maecenas consequat ante rutrum.

// Consequat suscipit aptent fermentum aliquet dapibus posuere maecenas. Porttitor ullamcorper aenean ultricies potenti per nam nec. Nascetur per ac nisl feugiat suspendisse scelerisque. Nostra rhoncus sollicitudin pretium bibendum per, mattis lectus accumsan. Urna nascetur sollicitudin class interdum facilisi integer volutpat consequat porttitor. Suspendisse diam consequat eget venenatis nec lobortis posuere. Arcu augue nullam fermentum nibh phasellus duis. Gravida nunc parturient; leo quisque eu sed dolor vitae.

// Integer ultrices aptent ipsum, natoque tellus lobortis. Sed fringilla pulvinar iaculis hendrerit ipsum viverra? Est mollis gravida nisl gravida ut. Viverra urna amet maximus volutpat vel erat, vitae magna magna. Placerat facilisi massa amet ad vel urna donec diam. Tincidunt tortor nisl porta sagittis fringilla laoreet sodales. Congue dignissim tristique placerat sapien dolor vivamus?`,
// date:"10-02-2024"
//     },
//     {
//         id:3,
//         genre:'Romance',
//         title:"Beyond the Event Horizon",
//         description:`Lorem ipsum odor amet, consectetuer adipiscing elit. Ante blandit mattis vulputate vestibulum curabitur morbi. Conubia nulla donec sagittis convallis tempor venenatis in primis nisl. Leo rutrum sed sem at tempor; tristique viverra augue habitant. Volutpat vulputate nascetur torquent; rutrum mauris bibendum mauris feugiat. Magna faucibus dis sapien aenean ultrices feugiat augue. Amet vitae feugiat hendrerit rutrum tempus vehicula litora. Taciti hac mollis magna cubilia posuere volutpat tincidunt.

// Platea maximus himenaeos nec vitae hendrerit sodales ultrices. Justo bibendum consequat quisque; cubilia taciti maecenas nibh taciti. Sodales habitant velit hendrerit urna mollis malesuada erat. Ad suscipit quisque dis leo morbi tempor. Sem cras proin mollis dapibus maecenas ullamcorper facilisis. Ac ornare conubia maecenas ultricies luctus nostra. Integer dis sagittis blandit convallis elementum mollis. Netus posuere vestibulum; malesuada dignissim ridiculus cubilia.

// Class hendrerit mus facilisis neque nascetur. Pulvinar torquent morbi ornare tristique tempus pulvinar. Lorem pretium mattis dis leo justo. Auctor torquent orci purus vitae ultricies dis. Augue potenti curabitur posuere metus ornare convallis quisque semper. Odio dui cubilia dapibus potenti sodales vulputate metus sapien. Non luctus posuere velit nascetur nam montes feugiat. Eget netus hac nascetur risus ac quis vel. Quis ornare malesuada accumsan mauris potenti tortor.

// Ridiculus eu conubia class rhoncus in augue. Vestibulum erat feugiat magnis tortor ultrices eleifend cras metus maecenas. Vivamus justo proin vestibulum porttitor montes dui; proin tortor imperdiet. Id eros leo ullamcorper tortor nisl molestie. Bibendum ante fames gravida netus dui vehicula laoreet. Nullam class proin volutpat rutrum imperdiet class curae ultrices. Diam suspendisse augue faucibus venenatis posuere eros suspendisse arcu. Condimentum suscipit convallis donec conubia pretium varius.

// Nam luctus curae mauris phasellus natoque libero ornare aliquet. Nullam sodales auctor massa luctus placerat consectetur. Commodo lectus eu mus vehicula; fringilla ligula potenti imperdiet aliquet. Aliquet nisl viverra sapien vulputate eleifend! Mattis neque et ligula tincidunt parturient hac. Tellus eleifend efficitur eu sapien laoreet pulvinar et molestie magnis. Pharetra penatibus arcu dis sed mus. Suscipit nisi fermentum ridiculus donec nunc quam. Placerat hendrerit sem pulvinar porttitor porttitor mollis lorem mauris.

// Lacinia litora elit dis praesent nibh adipiscing. Felis litora rutrum quis aliquam viverra convallis pulvinar montes. At etiam class cubilia in mollis. Etiam semper porttitor a libero aliquet mattis fringilla viverra. Lobortis vulputate curabitur netus feugiat tempus natoque purus accumsan mi. Montes velit lorem senectus quam eu suspendisse. Pharetra facilisis euismod potenti integer ac varius egestas senectus?

// Inceptos pulvinar rutrum primis curae aenean. Litora cubilia cras donec imperdiet sociosqu elit. Iaculis proin sapien imperdiet vestibulum nunc laoreet. Erat blandit convallis laoreet nibh mattis ut potenti. Platea morbi class odio luctus lacinia quisque a. Lobortis ridiculus mus et montes luctus donec. Platea convallis morbi natoque molestie blandit fusce. Elementum rutrum curabitur libero lorem blandit purus ut.

// Suspendisse lacus varius nunc laoreet elementum lacus lobortis euismod eros. Ullamcorper in fermentum praesent facilisis velit est phasellus class. Vivamus accumsan inceptos eleifend lacus vivamus. Efficitur accumsan convallis tortor elit, est vehicula duis. Nostra sit vulputate feugiat nibh; congue aliquam fusce. Primis accumsan tristique vel finibus a class. Sodales malesuada himenaeos pharetra cras vestibulum massa ad cras. Volutpat ante ultrices a vulputate penatibus etiam non. Turpis maximus adipiscing, maecenas consequat ante rutrum.

// Consequat suscipit aptent fermentum aliquet dapibus posuere maecenas. Porttitor ullamcorper aenean ultricies potenti per nam nec. Nascetur per ac nisl feugiat suspendisse scelerisque. Nostra rhoncus sollicitudin pretium bibendum per, mattis lectus accumsan. Urna nascetur sollicitudin class interdum facilisi integer volutpat consequat porttitor. Suspendisse diam consequat eget venenatis nec lobortis posuere. Arcu augue nullam fermentum nibh phasellus duis. Gravida nunc parturient; leo quisque eu sed dolor vitae.

// Integer ultrices aptent ipsum, natoque tellus lobortis. Sed fringilla pulvinar iaculis hendrerit ipsum viverra? Est mollis gravida nisl gravida ut. Viverra urna amet maximus volutpat vel erat, vitae magna magna. Placerat facilisi massa amet ad vel urna donec diam. Tincidunt tortor nisl porta sagittis fringilla laoreet sodales. Congue dignissim tristique placerat sapien dolor vivamus?`,
// date:"10-02-2024"
//     },
// ]

const StoriesList = ({ route }) => {
  const navigation = useNavigation();
  const { genre } = route.params;
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [storydetails, setStories] = useState([]);
  const [genreImg, setGenreImg] = useState(null); // State to hold the image source

  useEffect(() => {
    GetStories();

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

  //   useEffect(()=>{
  //   },[genre])

  const GetStories = async () => {
    setLoading(true);
    try {
      const res = await AxiosService.post("story/getAllStoriesbyGenre", {
        genre,
      });

      if (res.status === 200) {
        console.log(res.data.message);
        setStories(res.data.story);
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

  //   console.log('ds',stories);

  const images = [
    require("../assets/openBook.jpg"),
    require("../assets/book2.jpg"),
    require("../assets/book3.jpg"),
    require("../assets/Book4.jpg"),
  ];

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
        {filteredGenres.length > 0 ? (
          filteredGenres.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("Story Details", { story: data })
              }
              style={styles.genre_container}
            >
              <Image
                style={styles.genereImage}
                source={images[index % images.length]}
              />
              <View style={{ flexDirection: "row" }}>
                <View style={styles.heading_Container}>
                  <Text style={styles.genre_heading}>
                    {index + 1}. {data.title}
                  </Text>
                  <Text style={styles.genre_subtittle}>
                    {moment(data.createdAt).format("DD-MM-YYYY")}
                  </Text>
                </View>
                <Icon
                  style={{ alignSelf: "center" }}
                  size={30}
                  name="arrow-forward-circle"
                />
              </View>
            </TouchableOpacity>
          ))
        ) : loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={[
                styles.genre_subtittle,
                { fontSize: 17, textAlign: "center", marginTop: 20 },
              ]}
            >
              No Stories for the genre
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default StoriesList;

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
  container: {
    flex: 1,
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
