import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./Main";
import Settings from "./Settings";
import Mypage from "./Mypage";
import Search from "./Search";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function MainTab() {
  const TabIcon = ({ name, size, color }) => {
    return <Ionicons name={name} style={{ fontSize: size }} color={color} />;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
          tabBarIcon: (props) => TabIcon({ ...props, name: "md-home-sharp" }),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: (props) => TabIcon({ ...props, name: "md-search" }),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerShown: false,
          tabBarIcon: (props) => TabIcon({ ...props, name: "md-person" }),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: (props) =>
            TabIcon({ ...props, name: "md-settings-sharp" }),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
