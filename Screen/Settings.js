import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Divider, Text, Switch } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
//redux
import { connect } from "react-redux";
import { SET_STORED_CITIES, SET_USER } from "../redux/userSlice";

function Settings({ navigation, SET_USER, SET_STORED_CITIES }) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const logout = () => {
    const user = { id: null, nickname: "비회원" };
    console.log("로그아웃!");
    SET_USER(user);
    SET_STORED_CITIES([]);
    alert("로그아웃 되었습니다!");
  };
  return (
    <View style={styles.block}>
      {/* <Text style={styles.text}>settingScreen</Text> */}
      <View style={styles.settingList_block}>
        <TouchableOpacity>
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
        <Divider />
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://adonde-ad.netlify.app/login");
          }}
        >
          <Text style={styles.settingList_text}>광고등록</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => logout()}>
          <Text style={styles.settingList_text}>로그아웃</Text>
        </TouchableOpacity>
        <Divider />
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
    marginTop: 20,
  },
  settingList_action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingList_text: {
    fontSize: 20,
    margin: 20,
  },
  text: {
    fontSize: 24,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {};
};
const mapDispatchToProps = {
  SET_STORED_CITIES,
  SET_USER,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
