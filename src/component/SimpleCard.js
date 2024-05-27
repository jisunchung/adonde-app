import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api";
//redux
import { connect } from "react-redux";
import { SET_STORED_CITIES } from "../redux/userSlice";

function SimpleCard({ name, USER_DATA, SET_STORED_CITIES }) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState(true);
  const deleteStoredCity = async (sido_sgg) => {
    try {
      const res = await axios.put(`${BASE_URL}/user/deleteStoredCity`, {
        id: USER_DATA.id,
        sido_sgg: sido_sgg,
      });

      console.log("deleteStoredCity", res.data);
      SET_STORED_CITIES(res.data);
      // storedCitiesChange(res.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const clickHeart = () => {
    setHeart(!heart);
    console.log("heartClick:", name);
    deleteStoredCity(name);
  };
  const clickCard = () => {
    alert("cardclick");
  };
  useEffect(() => {});
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card_template}
        onPress={() => navigation.navigate("Detail", { sido_sgg: name })}
      >
        <View style={styles.card_title_view}>
          <Entypo name="location-pin" style={styles.card_title_icon} />
          <Text style={styles.card_title}>{name}</Text>
        </View>
        <Entypo
          style={styles.heart_icon}
          name={heart ? "heart" : "heart-outlined"}
          onPress={clickHeart}
        />
      </TouchableOpacity>
    </View>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    // backgroundColor: "yellow",
  },
  card_template: {
    width: screenWidth - 40,
    height: 60,
    backgroundColor: "#44AD5E",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // shadowOpacity: 0.7,
    // shadowRadius: 3.84,
    elevation: 5,
    // borderWidth: 7,
    borderRadius: 5,
    margin: 8,
    paddingEnd: 20,
  },
  card_title_view: {
    flexDirection: "row",
    marginLeft: 20,
  },
  card_title: {
    color: "white",
    fontSize: 20,
    marginLeft: 20,
  },
  card_title_icon: { fontSize: 23, color: "#D7F9DB" },
  heart_icon: {
    fontSize: 20,
    color: "#D7F9DB",
  },
});

const mapStateToProps = (state, myOwnProps) => {
  // console.log("simplecard get user id", state.user.user_obj.user.id);
  return {
    USER_DATA: state.user.user_obj.user,
  };
};
const mapDispatchToProps = {
  SET_STORED_CITIES,
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCard);
