import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";

function SearchMain() {
  const navigation = useNavigation();
  const [cities, setCities] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const inputRef = useRef();

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
    setSearchIcon(false);
  };
  //   const searchIconVisible = useMemo(() => setSearchIcon(false), [searchValue]);

  const filterListClick = (sido_sgg) => {
    // setSearchIcon(true);
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
    console.log(inputRef.current.value);
    findAllCities();
    setSearchIcon(false);
  }, []);
  return (
    <View style={styles.block}>
      <Text>도시검색</Text>
      <View style={styles.search_block}>
        <TextInput
          ref={inputRef}
          value={searchValue}
          onChangeText={(val) => setSearchValue(val)}
          placeholder={"search!"}
          style={styles.input}
        />
        {/* {searchIcon ? ( */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("search_detail", { sido_sgg: searchValue })
          }
        >
          <Ionicons name="md-search" style={{ fontSize: 24 }} color="black" />
        </TouchableOpacity>
        {/* ) : null} */}
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

export default SearchMain;
