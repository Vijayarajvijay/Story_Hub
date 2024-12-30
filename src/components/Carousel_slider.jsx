import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useRef } from "react";
  import Carousel from "react-native-reanimated-carousel";
import { Colors } from "../utills/Colors";
    import { configureReanimatedLogger,ReanimatedLogLevel } from "react-native-reanimated";
  
  
  const Carousel_slider = () => {
    const [activeIndex, setactiveIndex] = useState(0);
    const carouselRef = useRef();
    const width = Dimensions.get("window").width;
  
    const images = [
      { image: require("../assets/slider1.png") },
      { image: require("../assets/slideImg2.jpg") },
      { image: require("../assets/slideImg3.jpg") },
    ];
  
    configureReanimatedLogger({
      level: ReanimatedLogLevel.warn,
      strict: false, 
    });
  
  
    //   pagination
    const renderPagination = () => {
      return (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
              onPress={() => carouselRef.current.scrolltoindex(index)}
            />
          ))}
        </View>
      );
    };
    return (
      <View style={styles.main_container}>
        <Carousel
          ref={carouselRef}
          width={width}
          height={width / 2.5}
          data={images}
          renderItem={({ item }) => (
            <View style={styles.img_container}>
              <Image source={item.image} style={styles.carousel_img} />
            </View>
          )}
          autoPlay
          scrollAnimationDuration={2000}
          snapEnabled
          onSnapToItem={(index) => setactiveIndex(index)}
        />
        {renderPagination()}
      </View>
    );
  };
  
  export default Carousel_slider;
  
  const styles = StyleSheet.create({
    main_container: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
      marginTop:5
    },
    carousel_img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    img_container: {
      marginHorizontal: 1,
      overflow: "hidden",
    },
    pagination: {
      flexDirection: "row",
      position: "absolute",
      bottom: -15,
    },
    dot: {
      width: 6,
      height: 6,
      backgroundColor: Colors.gray,
      marginHorizontal: 3,
      borderRadius: 100,
    },
    activeDot: {
      width: 12,
      height: 6,
      backgroundColor: Colors.secondaryLight,
    },
  });
  