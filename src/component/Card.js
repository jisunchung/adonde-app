import * as React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api";
//redux
import { connect, Connect } from "react-redux";
import { SET_STORED_CITIES } from "../redux/userSlice";

function Card({ name, img, USER_DATA, USER_SOTRED_CITIES, SET_STORED_CITIES }) {
  const navigation = useNavigation();
  const [heart, setHeart] = React.useState(false);
  // addStoredCity
  const addStoredCity = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/user/addStoredCity`, {
        id: USER_DATA.id,
        sido_sgg: name,
      });

      console.log("addStoredCity", res.data);
      SET_STORED_CITIES(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //deleteStoredCity
  const deleteStoredCity = async (sido_sgg) => {
    try {
      const res = await axios.put(`${BASE_URL}/user/deleteStoredCity`, {
        id: USER_DATA.id,
        sido_sgg: name,
      });

      console.log("deleteStoredCity", res.data);
      SET_STORED_CITIES(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const clickHeart = () => {
    if (USER_DATA.id != null) {
      if (!heart) {
        console.log("하트 클릭");
        addStoredCity();
      } else {
        console.log("하트 취소");
        deleteStoredCity();
      }
      setHeart(!heart);
    } else {
      alert("로그인 후 사용해주세요!");
    }
  };
  useEffect(() => {
    // console.log("result page storedcities", USER_SOTRED_CITIES);
    //user가 저장한 도시의 경우 heart가 체크되어있도록 해줌
    if (USER_SOTRED_CITIES.includes(name)) {
      setHeart(true);
    } else {
      setHeart(false);
    }
  }, [USER_SOTRED_CITIES]);
  return (
    <View style={styles.container}>
      <View style={styles.card_template}>
        <Text style={styles.card_title}>
          <Entypo
            name="location-pin"
            style={styles.card_title_icon}
            color="black"
          />
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
            <Button
              title="DETAILS"
              onPress={() => navigation.navigate("Detail", { sido_sgg: name })}
            ></Button>
            <Entypo
              style={styles.heart_icon}
              name={heart ? "heart" : "heart-outlined"}
              color="black"
              onPress={clickHeart}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
    height: 280,
  },
  text_container: {
    position: "absolute",
    width: 280,
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
  card_title_icon: { fontSize: 20 },
  card_des: {
    color: "black",
  },
  heart_icon: {
    fontSize: 25,
    paddingTop: 8,
  },
  action_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    USER_DATA: state.user.user_obj.user,
    USER_SOTRED_CITIES: state.user.user_storedCities,
  };
};

const mapDispatchToProps = {
  SET_STORED_CITIES,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
