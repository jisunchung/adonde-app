import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api";

function AdCard({ name, img, description }) {
  const navigation = useNavigation();

  useEffect(() => {}, []);
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.card_template}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.card_title_text}>
              <Entypo name="info-with-circle" size={20} color="black" />
            </Text>
            <Text style={styles.card_title_text}>{name}</Text>
          </View>
          <View style={styles.card_info_container}>
            <Image
              style={styles.card_image}
              source={img ? { uri: img } : null}
            />
            <Text numberOfLines={5} style={styles.card_des_text}>
              {" "}
              {description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginBottom: 50,
    // backgroundColor: "yellow",
  },
  card_template: {
    // padding: 5,
    width: screenWidth,
    height: 170,
    backgroundColor: "#E0F2F7",
    //그림자...
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.84,
    elevation: 1,

    // borderWidth: 7,
    // borderRadius: 10,
  },

  card_title_text: {
    color: "black",
    padding: 8,
    fontSize: 20,
  },
  card_info_container: {
    flexDirection: "row",
    marginLeft: 30,
    // backgroundColor: "red",
    width: screenWidth - 40,
    // flexWrap: "wrap",
    // justifyContent: "center"
  },
  card_image: {
    width: 120,
    height: 120,
    // flexWrap: "wrap",
    // borderTopStartRadius: 10,
    // borderTopEndRadius: 10,
    flexShrink: 0,
  },
  card_des_text: {
    margin: 15,
    fontSize: 15,
    // flexWrap: "wrap",
    flexShrink: 1,
  },
});

export default AdCard;
