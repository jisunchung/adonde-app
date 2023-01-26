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
import { Divider, Text, Switch } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
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

  const search = useMemo(
    () => filterCities(cities, searchValue),
    [searchValue]
  );
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
      <TextInput
        value={searchValue}
        onChangeText={(val) => setSearchValue(val)}
        placeholder={"search!"}
        style={styles.input}
      />
      <Text>{searchValue}</Text>
      <ScrollView>
        {search != 0 && searchValue != ""
          ? search.map((city) => (
              <Text key={city.sido_sgg}>{city.sido_sgg}</Text>
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
  input: {
    width: screenWidth - 90,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
});

export default Search;
