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
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

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
      <View style={styles.settingList_block}>
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
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/orgs/adonde-app/repositories");
          }}
        >
          <View style={styles.settingList_action}>
            <View style={styles.settingList_left_group}>
              <AntDesign name="github" size={24} color="black" />
              <Text style={styles.settingList_text}>github</Text>
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
            Linking.openURL("https://forms.gle/6GZKtYZaf7UvstnT6");
          }}
        >
          <View style={styles.settingList_action}>
            <View style={styles.settingList_left_group}>
              <Octicons name="paper-airplane" size={24} color="black" />
              <Text style={styles.settingList_text}>아이디어 및 버그 제보</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => navigation.navigate("About")}>
          <View style={styles.settingList_action}>
            <View style={styles.settingList_left_group}>
              <Ionicons
                name="information-circle-outline"
                size={30}
                color="black"
              />
              <Text style={styles.settingList_text}>About</Text>
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
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  settingList_block: {
    margin: 20,
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
