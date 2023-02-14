import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
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
          <Text style={styles.card_title}>
            <Entypo name="info-with-circle" size={24} color="black" />
            {name}
          </Text>
          <Image
            style={styles.card_image}
            source={{
              uri: img,
            }}
          />
          <View style={styles.text_container}>
            {/* <Text style={styles.card_des}>{description.split(".", 2)}</Text> */}
            <View style={styles.action_container}>
              {/* <Button
              title="DETAILS"
              onPress={() => navigation.navigate("Detail", { sido_sgg: name })}
            ></Button> */}
              <Text> {description}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "yellow",
  },
  card_template: {
    width: 280,
    height: 380,
    backgroundColor: "#D8F781",
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
    height: 280,

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
    backgroundColor: "#44AD5E",
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
    paddingTop: 8,
  },
  action_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AdCard;
