import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./Main";
import Settings from "./Settings";
import Mypage from "./Mypage";

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Mypage" component={Mypage} />
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
}

export default MainTab;
