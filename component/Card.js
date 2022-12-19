import * as React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

export default function App({ name, img, description }) {
  const [heart, setHeart] = React.useState(false);
  const clickHeart = () => {
    setHeart(!heart);
    console.log("heartClick:", name);
  };
  const clickCard = () => {
    alert("cardclick");
  };
  return (
    <View style={styles.container}>
      <View style={styles.card_template}>
        <Text style={styles.card_title}>
          <Entypo name="location-pin" size={24} color="black" />
          {name}
        </Text>
        <Image
          style={styles.card_image}
          source={{
            uri: img,
          }}
        />
        <View style={styles.text_container}>
          <Text style={styles.card_des}>{description.split(".", 3)}</Text>
          {/* <Text style={styles.card_des}>{description.split(".")}</Text> */}
          {/* <Button title="DETAILS"></Button> */}
          <Entypo
            style={styles.heart_icon}
            name={heart ? "heart" : "heart-outlined"}
            size={24}
            color="black"
            onPress={clickHeart}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "yellow",
  },
  card_template: {
    width: 280,
    height: 380,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 5,
    // borderWidth: 7,
    borderRadius: 10,
  },
  card_image: {
    width: 280,
    height: 250,

    // borderTopStartRadius: 10,
    // borderTopEndRadius: 10,
  },
  text_container: {
    position: "absolute",
    width: 280,
    // height: 30,
    bottom: 0,
    padding: 10,
    // backgroundColor: "rgba(0,0,0, 0.3)",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: "black",
    padding: 10,
    fontSize: 25,
  },
  card_des: {
    color: "black",
  },
  heart_icon: {
    paddingTop: 10,
    paddingLeft: 230,
  },
});
