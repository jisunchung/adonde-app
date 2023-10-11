import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import SimpleCard from "../component/SimpleCard";
import axios from "axios";
import { BASE_URL } from "../api";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
//redux
import { connect } from "react-redux";
import { SET_STORED_CITIES } from "../redux/userSlice";

function Mypage({
  navigation,
  USER_DATA,
  USER_SOTRED_CITIES,
  SET_STORED_CITIES,
}) {
  const [user, setUser] = useState();
  //자식 comp로 전달하는 함수
  function storedCitiesChange(storedCities) {
    console.log("storedCitiesChange!!", storedCities);
    SET_STORED_CITIES(storedCities);
  }

  useEffect(() => {
    const getUserStoredCities = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/user/findOneById`, {
          id: USER_DATA.id,
        });
        console.log("getUserStoredCities in mypage main", res.data);
        setUser(res.data);
        SET_STORED_CITIES(res.data.storedCities);
      } catch (error) {
        console.log(error);
      }
    };
    getUserStoredCities();
  }, [USER_DATA]);
  return user ? (
    <ScrollView>
      <View style={styles.block}>
        <View style={styles.user_block}>
          {user.profile_image == "" ? (
            <FontAwesome name="user-circle-o" size={60} color="black" />
          ) : (
            <Image
              style={styles.profile_img}
              source={{
                uri: user.profile_image,
              }}
            />
          )}
          <Text>{user.nickname}</Text>
          <Text>{user.email}</Text>
        </View>

        {USER_SOTRED_CITIES.map((city_name) => (
          <SimpleCard
            name={city_name}
            key={city_name}
            // storedCitiesChange={storedCitiesChange}
          />
        ))}
      </View>
    </ScrollView>
  ) : (
    <View style={styles.block}>
      <View style={styles.user_block}>
        <FontAwesome
          name="user-circle-o"
          style={{ fontSize: 60 }}
          color="black"
        />
        <Text style={{ margin: 20 }}>로그인 후 사용해주세요!</Text>
        <Button
          textColor="#FFFFFF"
          buttonColor="#44AD5E"
          mode="contained-tonal"
          onPress={() => {
            navigation.push("Login");
          }}
        >
          로그인
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    // flex: 1,
    paddingVertical: 20,
  },
  user_block: {
    alignItems: "center",
    marginBottom: 10,
  },
  profile_img: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginBottom: 10,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  console.log("mypage main get user", state.user.user_obj.user);
  console.log(
    "mypage main get user storedcities",
    state.user.user_storedCities
  );
  return {
    USER_DATA: state.user.user_obj.user,
    USER_SOTRED_CITIES: state.user.user_storedCities,
  };
};

const mapDispatchToProps = {
  SET_STORED_CITIES,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);
