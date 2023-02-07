import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import SimpleCard from "../component/SimpleCard";
import axios from "axios";
import { BASE_URL } from "../api";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
//redux
import { connect } from "react-redux";

function MypageMain({ navigation, USER_DATA }) {
  const [StoredCities, setStoredCities] = useState([]);
  const [user, setUser] = useState();
  function storedCitiesChange(storedCities) {
    console.log("storedCitiesChange!!", storedCities);
    setStoredCities(storedCities);
  }
  useEffect(() => {
    const getUserStoredCities = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/user/findOneById`, {
          id: USER_DATA.id,
        });

        console.log("getUserStoredCities", res.data);
        setUser(res.data);
        setStoredCities(res.data.storedCities);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    getUserStoredCities();
  }, []);
  return user ? (
    <View style={styles.block}>
      <View style={styles.user_block}>
        {user.profile_image == "" ? (
          <FontAwesome name="user-circle-o" size={90} color="black" />
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
      <ScrollView>
        {StoredCities.map((city_name) => (
          <SimpleCard
            name={city_name}
            key={city_name}
            storedCitiesChange={storedCitiesChange}
          />
        ))}
      </ScrollView>
    </View>
  ) : (
    <View style={styles.block}>
      <View style={styles.user_block}>
        <FontAwesome name="user-circle-o" size={90} color="black" />
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
  },
});

const mapStateToProps = (state, myOwnProps) => {
  console.log("mypage main get user id", state.user.user_obj.user.id);
  return {
    USER_DATA: state.user.user_obj.user,
  };
};

export default connect(mapStateToProps)(MypageMain);
