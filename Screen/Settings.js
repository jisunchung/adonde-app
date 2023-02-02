import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Divider, Text, Switch } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
function Settings({ navigation }) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
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
        <TouchableOpacity>
          <Text style={styles.settingList_text}>광고등록</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity>
          <Text style={styles.settingList_text}>로그아웃</Text>
        </TouchableOpacity>
        <Divider />
      </View>
      <Button
        textColor="#FFFFFF"
        buttonColor="#44AD5E"
        mode="contained-tonal"
        onPress={() => navigation.push("Login")}
      >
        Subtmit
      </Button>
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

export default Settings;
