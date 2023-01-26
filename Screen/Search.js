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

function filterCities(cities, searchValue) {
  return cities.filter((city) =>
    city.sido_sgg.toLowerCase().includes(searchValue)
  );
}
function Search() {
  const [cities, setCities] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);

  const search = useMemo(
    () => filterCities(cities, searchValue),
    [searchValue]
  );
  const searchIconClick = () => {
    console.log("click!");
    // setSearchIcon(true);
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
                <Text key={city.sido_sgg}>{city.sido_sgg}</Text>
                {/* <Divider key={city.sido_code} /> */}
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
      {/* ) : (
        <Text>hi</Text>
      )} */}
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
});

export default Search;
