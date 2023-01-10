import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useState } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import Slider from "@react-native-community/slider";
import { useRoute } from "@react-navigation/native";
function Filter({ navigation }) {
  const route = useRoute();
  const [theme, setTheme] = useState([]);
  const [population, setPopulation] = useState(0);
  const [distance, setDistance] = useState(0);
  const [access, setAccess] = useState([]);

  const themeItems = [
    { key: "1", value: "산" },
    { key: "2", value: "계곡" },
    { key: "3", value: "바다" },
    { key: "4", value: "강" },
  ];
  const accessItems = [
    { key: "1", value: "직통 고속버스", disabled: false },
    { key: "2", value: "직통 시외버스", disabled: false },
    { key: "3", value: "직통 기차", disabled: false },
  ];
  const access_unify = {
    "직통 고속버스": "express_direct",
    "직통 시외버스": "suburbs_direct",
    "직통 기차": "train_direct",
  };

  const setAccItemStatus = (express, suburbs, train) => {
    if (express == null) {
      accessItems[0].disabled = true;
    }
    if (suburbs == null) {
      accessItems[1].disabled = true;
    }
    if (train == null) {
      accessItems[2].disabled = true;
    }
    if (express == null && suburbs == null && train == null) {
      Alert.alert("선택가능한 access 없음");
    }
  };
  const clickSubmitBtn = () => {
    //filter 데이터를 처리해준다
    //테마 ? [] : ""
    // if (theme.length == 0) {
    //   setTheme("");
    // }
    // console.log("테마", theme);
    //인구수 array[0,0]

    //거리 == 0 ? "" : 거리값(int)

    //접근성 array[]

    navPush();
  };

  const navPush = () => {
    //Result페이지로 result값을 넘겨준다

    navigation.push("Result", {
      FilterValue: {
        origin: route.params.origin,
        theme: theme,
        population: [0, population],
        distance: distance,
        access: translateAccessKoToEn(),
      },
    });
  };
  const translateAccessKoToEn = () => {
    let tempAccess = [...access];
    tempAccess.map((item, index) => {
      if (!isAlpha(item)) {
        tempAccess[index] = access_unify[item];
      }
    });
    return tempAccess;
  };
  const isAlpha = (str) => {
    const pattern_eng = /[a-zA-Z]/;
    if (pattern_eng.test(str)) {
      return true;
    } else {
      return false;
    }
  };
  //   access.map((item, index) => {
  //     if(!isAlpha(item)){
  //         access[index] = access_unify[item]
  //         }
  //       }
  //   })

  useEffect(() => {
    // express: express_res.data,
    // suburbs: suburbs_res.data,
    // train: train_res.data,
    // console.log("filter express", route.params.express);
    // console.log("filter suburbs", route.params.suburbs);
    // console.log("filter train", route.params.train);
    setAccItemStatus(
      route.params.express,
      route.params.suburbs,
      route.params.train
    );
    //filter 데이터를 처리해준다
    //테마 ? [] : ""
    if (theme.length == 0) {
      setTheme("");
    }

    //거리 == 0 ? "" : 거리값(int)
    if (distance == 0) {
      setDistance("");
    }
  }, [theme, distance]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.box}>
          <Text>테마</Text>
          <MultipleSelectList
            placeholder="테마를 골라주세요"
            setSelected={(val) => setTheme(val)}
            data={themeItems}
            save="value"
            // onSelect={() => alert(selected)}
            label="테마"
          />
          <Text>{theme}</Text>
          <Text>인구수</Text>
          <Slider
            style={styles.slider}
            value={population}
            onValueChange={(val) => setPopulation(val)}
            minimumValue={0}
            maximumValue={1000}
            minimumTrackTintColor="#44AD5E"
            maximumTrackTintColor="#FFFFFF"
            step={1}
          />
          <Text>{population} ~ 1000</Text>
          <Text>거리</Text>
          <Slider
            style={styles.slider}
            value={distance}
            onValueChange={(val) => setDistance(val)}
            minimumValue={0}
            maximumValue={500}
            minimumTrackTintColor="#44AD5E"
            maximumTrackTintColor="#FFFFFF"
            step={10}
          />
          <Text>{distance}km</Text>
          <Text>접근성</Text>
          <MultipleSelectList
            placeholder="접근성을 골라주세요"
            setSelected={(val) => setAccess(val)}
            data={accessItems}
            save="value"
            // onSelect={() => alert(selected)}
            label="접근성"
          />
          <Text>{access}</Text>
          <Button title="submit" onPress={() => clickSubmitBtn()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: "pink",
  },
  box: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  slider: {
    width: screenWidth - 40,
  },
});

export default Filter;
