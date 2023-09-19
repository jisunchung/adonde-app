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
import axios from "axios";
import { BASE_URL } from "../api";
import { useNavigation } from "@react-navigation/native";

function SearchMain() {
  const navigation = useNavigation();
  const [cities, setCities] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();
  const [administrativeDistrictList, setAdministrativeDistrictList] = useState([
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라남도",
    "전라북도",
    "경상북도",
    "경상남도",
    "제주도",
  ]);

  const filterCities = (cities, searchValue) => {
    return cities.filter((city) =>
      city.sido_sgg.toLowerCase().includes(searchValue)
    );
  };
  const search = useMemo(
    () => filterCities(cities, searchValue),
    [searchValue]
  );
  const checkSearchValue = () => {
    if (search.length == 0) Alert.alert("검색어를 다시 입력해주세요!");
    else {
      for (let i = 0; i < search.length; i++) {
        if (search[i].sido_sgg == searchValue)
          navigation.navigate("search_detail", { sido_sgg: searchValue });
        else {
          Alert.alert("검색어를 다시 입력해주세요!");
          break;
        }
      }
    }
  };

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

  const administrativeDistrictChip = administrativeDistrictList.map(
    (value, index) => (
      <View style={styles.chip} key={index}>
        <TouchableOpacity
          key={index}
          style={{ padding: 5 }}
          onPress={() => {
            setSearchValue(value);
          }}
        >
          <Text key={index} style={{ color: "white" }}>
            {value}
          </Text>
        </TouchableOpacity>
      </View>
    )
  );

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
        <TouchableOpacity onPress={() => checkSearchValue()}>
          <Ionicons name="md-search" style={{ fontSize: 24 }} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {search != 0 && searchValue != ""
          ? search.map((city) => (
              <TouchableOpacity
                key={city.sido_sgg}
                onPress={() => filterListClick(city.sido_sgg)}
              >
                <Text style={styles.filterList_text} key={city.sido_sgg}>
                  {city.sido_sgg}
                </Text>
                {/* <Divider key={city.sido_code} /> */}
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
    backgroundColor: "#08844E",
  },
  chip_text: {},
  search_block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: screenWidth - 80,
    height: 44,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  filterList_text: {
    fontSize: 15,
    margin: 3,
  },
});

export default SearchMain;
