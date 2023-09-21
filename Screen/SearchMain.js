import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { Divider, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../api";
import { useNavigation } from "@react-navigation/native";

function SearchMain() {
  const navigation = useNavigation();
  const [cities, setCities] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();
  const [administrativeDistrictList, setAdministrativeDistrictList] = useState([
    { name: "서울", click: false },
    { name: "부산", click: false },
    { name: "대구", click: false },
    { name: "인천", click: false },
    { name: "광주", click: false },
    { name: "대전", click: false },
    { name: "울산", click: false },
    { name: "세종", click: false },
    { name: "경기도", click: false },
    { name: "강원도", click: false },
    { name: "충청북도", click: false },
    { name: "충청남도", click: false },
    { name: "전라남도", click: false },
    { name: "전라북도", click: false },
    { name: "경상남도", click: false },
    { name: "경상북도", click: false },
    { name: "제주도", click: false },
    // "서울",
    // "부산",
    // "대구",
    // "인천",
    // "광주",
    // "대전",
    // "울산",
    // "세종",
    // "경기도",
    // "강원도",
    // "충청북도",
    // "충청남도",
    // "전라남도",
    // "전라북도",
    // "경상북도",
    // "경상남도",
    // "제주도",
  ]);
  const [beforeIdx, setBeforeIdx] = useState(null);

  const filterCities = (cities, searchValue) => {
    return cities.filter((city) =>
      city.sido_sgg.toLowerCase().includes(searchValue)
    );
  };
  const search = useMemo(
    () => filterCities(cities, searchValue),
    [searchValue]
  );

  const filterListClick = (sido_sgg) => {
    setSearchValue(sido_sgg);
    navigation.navigate("search_detail", { sido_sgg });
  };
  useEffect(() => {
    const findAllCities = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/city/findAll`);
        setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    findAllCities();
  }, []);

  const onPressChip = (value, index) => {
    value.click = true;
    // console.log("before", administrativeDistrictList[beforeIdx]);
    beforeIdx != null && beforeIdx != index
      ? (administrativeDistrictList[beforeIdx].click = false)
      : null;
    setSearchValue(value.name);
    // console.log("now", value);
    setBeforeIdx(index);
  };
  const administrativeDistrictChip = administrativeDistrictList.map(
    (value, index) => (
      <View style={value.click ? styles.chip_click : styles.chip} key={index}>
        <TouchableOpacity
          key={index}
          style={styles.chip_touchable_block}
          onPress={() => onPressChip(value, index)}
        >
          <Text key={index} style={styles.chip_text}>
            {value.name}
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
  const onPressDeleteIcon = () => {
    setSearchValue("");
    beforeIdx != null
      ? (administrativeDistrictList[beforeIdx].click = false)
      : null;
  };

  return (
    <View style={styles.block}>
      {/* <Text>도시검색</Text> */}
      <View style={styles.chip_block}>{administrativeDistrictChip}</View>
      <View style={styles.search_block}>
        <TextInput
          ref={inputRef}
          value={searchValue}
          onChangeText={(val) => setSearchValue(val)}
          placeholder={"search!"}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => onPressDeleteIcon()}>
          <Feather name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ backgroundColor: "#e8e8e8" }}>
        {search != 0 && searchValue != ""
          ? search.map((city) => (
              <TouchableOpacity
                key={city.sido_sgg}
                style={styles.filterList_block}
                onPress={() => filterListClick(city.sido_sgg)}
              >
                <Text style={styles.filterList_text} key={city.sido_sgg}>
                  {city.sido_sgg}
                </Text>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  chip_block: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#00727C",
  },
  chip_click: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#44AD5E",
  },
  chip_touchable_block: {
    padding: 5,
  },
  chip_text: { color: "white" },
  search_block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: screenWidth - 80,
    height: 45,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  filterList_block: {
    borderStyle: "solid",
    // borderTopWidth: 1,
    borderBottomWidth: 0.3,
    borderColor: "#BDBDBD",
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  filterList_text: {
    fontSize: 15,
    margin: 5,
  },
});

export default SearchMain;
