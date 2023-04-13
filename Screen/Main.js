import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import StartingPoint from "./StartingPoint";
import Filter from "./Filter";
import Result from "./Result";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Details from "./Details";
const Stack = createNativeStackNavigator();

function Main() {
  const navigation = useNavigation();
  const [mapIcon, setMapIcon] = useState(true);
  const clickMapIcon = () => {
    setMapIcon(!mapIcon);
    console.log("clickmapicon", mapIcon);
    //Result페이지에 파라미터를 실어서 보냄
    navigation.navigate("Result", { mapIcon });
  };
  useEffect(() => {
    //   //listicon으로 보여질때 filterscreen으로 돌아갔다가 다시왔을 때 mapicon이 보여야하는데
    //   //listicon이 보이는 오류 처리
    //   setMapIcon(true);
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Start" component={StartingPoint} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen
        initialParams={{ mapIcon: false }}
        name="Result"
        component={Result}
        options={({ navigation }) => ({
          headerRight: () => (
            <Entypo
              name={mapIcon ? "map" : "list"}
              size={24}
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

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
});

export default Main;
