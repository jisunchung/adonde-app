import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { Divider, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../api";
import WeatherWidget from "../component/WeatherWidget";
import { async } from "@firebase/util";

function filterCities(cities, searchValue) {
  return cities.filter((city) =>
    city.sido_sgg.toLowerCase().includes(searchValue)
  );
}
function Search() {
  const [cities, setCities] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [searchResult, setSearchResult] = useState();

  const search = useMemo(
    () => filterCities(cities, searchValue),
    [searchValue]
  );
  const showSearchResult = useMemo(() => {
    return searchValue == "" ? false : true;
  }, [searchValue]);
  const searchIconClick = async () => {
    console.log("click!");
    setSearchIcon(true);

    try {
      const res = await axios.post(`${BASE_URL}/city/findOne`, {
        sido_sgg: searchValue,
      });
      console.log("findOne", res.data);
      setSearchResult(res.data);
      //   setCities(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filterListClick = (sido_sgg) => {
    setSearchValue(sido_sgg);
  };
  useEffect(() => {
    const findAllCities = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/city/findAll`);
        // console.log("findAll", res.data.length);

        setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    findAllCities();
  }, []);
  return (
    <View style={styles.block}>
      <Text>검색</Text>
      <View style={styles.search_block}>
        <TextInput
          value={searchValue}
          onChangeText={(val) => setSearchValue(val)}
          placeholder={"search!"}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => searchIconClick()}>
          <Ionicons name="md-search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* <Text>{searchValue}</Text> */}
      {/* {!searchIcon ? ( */}
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
      {/* ) : (
        <Text>hi</Text>
      )} */}
      {showSearchResult && searchResult ? (
        <View>
          <WeatherWidget
            lat={searchResult.latitude}
            long={searchResult.longitude}
          />
        </View>
      ) : null}
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
  search_block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: screenWidth - 80,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  filterList_text: {
    fontSize: 15,
    margin: 3,
  },
});

export default Search;
