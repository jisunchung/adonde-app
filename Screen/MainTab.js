import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./Main";
import Settings from "./Settings";
import Mypage from "./Mypage";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function MainTab() {
  const TabIcon = ({ name, size, color }) => {
    return <Ionicons name={name} size={size} color={color} />;
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
          tabBarIcon: (props) =>
            TabIcon({ ...props, name: "md-settings-sharp" }),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
