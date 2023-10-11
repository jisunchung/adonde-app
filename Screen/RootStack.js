import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTab from "./MainTab";
import Login from "./Login";
import StartingPoint from "./StartingPoint";
import Filter from "./Filter";
import Result from "./Result";
import Details from "./Details";
//icon
import { Entypo } from "@expo/vector-icons";
//redux
import { connect } from "react-redux";
import { SET_MAP_ICON } from "../redux/userSlice";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

function RootStack({ MAP_ICON_DATA, SET_MAP_ICON }) {
  const clickMapIcon = () => {
    SET_MAP_ICON(!MAP_ICON_DATA);
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Start"
        component={StartingPoint}
        options={{
          headerTitle: "출발지 설정",
          headerBackTitleVisible: false,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          headerTitle: "",
          headerBackTitle: "start",
          headerBackTitleVisible: false,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "filter",
          headerBackTitleVisible: false,
          headerLargeTitleShadowVisible: false,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="home"
                size={24}
                color="black"
                onPress={() => navigation.navigate("Home")}
              />
              <Entypo
                name={MAP_ICON_DATA ? "map" : "list"}
                style={{ fontSize: 23, marginLeft: 20 }}
                color="black"
                onPress={clickMapIcon}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Detail"
        component={Details}
        options={{
          // headerTitle: "",
          headerBackTitleVisible: false,
          headerLargeTitleShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state, myOwnProps) => {
  return {
    MAP_ICON_DATA: state.user.mapIcon,
  };
};

const mapDispatchToProps = {
  SET_MAP_ICON,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootStack);
