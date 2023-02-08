import * as React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
//redux
import { connect, Connect } from "react-redux";

function Card({ name, img, description, USER_SOTRED_CITIES }) {
  const navigation = useNavigation();
  const [heart, setHeart] = React.useState(false);
  const clickHeart = () => {
    if (heart) {
      console.log("하트 클릭");
    } else {
      console.log("하트 취소");
    }
    setHeart(!heart);
  };
  const clickCard = () => {
    alert("cardclick");
  };
  useEffect(() => {
    // console.log("result page storedcities", USER_SOTRED_CITIES);
    //user가 저장한 도시의 경우 heart가 체크되어있도록 해줌
    if (USER_SOTRED_CITIES.includes(name)) {
      setHeart(true);
    }
  }, [USER_SOTRED_CITIES]);
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
          {/* <Text style={styles.card_des}>{description.split(".", 2)}</Text> */}
          <View style={styles.action_container}>
            <Button
              title="DETAILS"
              onPress={() => navigation.navigate("Detail", { sido_sgg: name })}
            ></Button>
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
    </View>
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
    paddingTop: 8,
  },
  action_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    USER_SOTRED_CITIES: state.user.user_storedCities,
  };
};

export default connect(mapStateToProps)(Card);
