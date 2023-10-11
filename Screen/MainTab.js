import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "./Settings";
import Mypage from "./Mypage";
import Search from "./Search";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./Home";

const Tab = createBottomTabNavigator();

function MainTab() {
  const TabIcon = ({ name, size, color }) => {
    return <Ionicons name={name} style={{ fontSize: size }} color={color} />;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: (props) => TabIcon({ ...props, name: "md-home-sharp" }),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: "검색",
          headerShadowVisible: false,
          tabBarIcon: (props) => TabIcon({ ...props, name: "md-search" }),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerTitle: "마이페이지",
          headerStyle: { backgroundColor: "#CEF6CE" },
          headerShadowVisible: false,
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
