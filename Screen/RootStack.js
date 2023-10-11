import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTab from "./MainTab";
import Login from "./Login";
import StartingPoint from "./StartingPoint";
import Filter from "./Filter";
import Result from "./Result";
import Details from "./Details";
import { Entypo } from "@expo/vector-icons";
//redux
import { connect } from "react-redux";
import { SET_MAP_ICON } from "../redux/userSlice";

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
          // headerBackTitle: "home",
          headerBackTitleVisible: false,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          // headerShown: false,
          headerTitle: "",
          headerBackTitle: "start",
          // headerBackTitleVisible: false,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "filter",
          // headerBackTitleVisible: false,
          headerLargeTitleShadowVisible: false,
          headerRight: () => (
            <Entypo
              name={MAP_ICON_DATA ? "map" : "list"}
              style={{ fontSize: 23 }}
              color="black"
              onPress={clickMapIcon}
            />
          ),
        })}
      />
      <Stack.Screen name="Detail" component={Details} />
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
