import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Divider, Text, Switch } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-paper";

//redux
import { connect } from "react-redux";
import { SET_STORED_CITIES, SET_USER } from "../redux/userSlice";

function Settings({ navigation, SET_USER, SET_STORED_CITIES, USER_DATA }) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const logout = () => {
    const user = { id: null, nickname: "비회원" };
    console.log("로그아웃!");
    SET_USER(user);
    SET_STORED_CITIES([]);
    alert("로그아웃 되었습니다!");
  };
  useEffect(() => {
    console.log("userdata", USER_DATA);
  }, []);
  return (
    <View style={styles.block}>
      {/* <Text style={styles.text}>settingScreen</Text> */}
      <View style={styles.settingList_block}>
        {/* <TouchableOpacity>
          <View style={styles.settingList_action}>
            <Text style={styles.settingList_text}>언어세팅</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
        <Divider />
        <View style={styles.settingList_action}>
          <Text style={styles.settingList_text}>다크모드</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <Divider /> */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://adonde-ad.netlify.app/login");
          }}
        >
          <View style={styles.settingList_action}>
            <View style={styles.settingList_left_group}>
              <AntDesign name="notification" size={24} color="black" />

              <Text style={styles.settingList_text}>광고등록</Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.instagram.com/adonde.kr/");
          }}
        >
          <View style={styles.settingList_action}>
            <View style={styles.settingList_left_group}>
              <Entypo name="instagram" size={24} color="black" />
              <Text style={styles.settingList_text}>인스타그램</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity>
          <View style={styles.settingList_action}>
            <View style={styles.settingList_left_group}>
              <AntDesign name="questioncircleo" size={24} color="black" />
              <Text style={styles.settingList_text}>about</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>

        {USER_DATA.id != null ? (
          <>
            <Divider />
            <TouchableOpacity onPress={() => logout()}>
              <View style={styles.settingList_action}>
                <View style={styles.settingList_left_group}>
                  <AntDesign name="logout" size={24} color="red" />
                  <Text style={[styles.settingList_text, { color: "red" }]}>
                    로그아웃
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </>
        ) : null}

        {/* <Text>{USER_DATA.nickname}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  settingList_block: {
    margin: 25,
  },
  settingList_action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingList_left_group: { flexDirection: "row", alignItems: "center" },
  settingList_text: {
    fontSize: 20,
    margin: 20,
  },
  text: {
    fontSize: 24,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    USER_DATA: state.user.user_obj.user,
  };
};
const mapDispatchToProps = {
  SET_STORED_CITIES,
  SET_USER,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
