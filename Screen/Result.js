import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import axios from "axios";
import { BASE_URL } from "../api";
import { useRoute } from "@react-navigation/native";
import { Card, Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import CardComp from "../component/Card";
import { Entypo } from "@expo/vector-icons";
import ResultMap from "./ResultMap";

function Result({ navigation }) {
  const [result, setResult] = useState([]);
  const route = useRoute();
  const searchResult = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/search/`, {
        theme: route.params.FilterValue["theme"],
        population: route.params.FilterValue["population"],
        distance: route.params.FilterValue["distance"],
        transportation: route.params.FilterValue["access"],
        origin: route.params.FilterValue["origin"],
      });
      //   console.log("res.data:", res.data[2]);
      console.log("res.data length:", res.data.length);
      setResult(res.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    searchResult();
    // console.log("mapIcon", route.params.mapIcon);
    console.log("-------resultpage-----");
    console.log("result", route.params.FilterValue["access"]);
  }, []);
  //cardlist 형식으로 보여줌
  if (!route.params.mapIcon) {
    return (
      <ScrollView style={styles.block}>
        {/* <Entypo name="map" size={24} color="black" /> */}
        {result.length == 0 ? (
          <Text>로딩중...</Text>
        ) : (
          result.map((data) => (
            <CardComp
              key={data.sido_sgg}
              name={data.sido_sgg}
              img={data.image_src}
              description={data.description}
            ></CardComp>
          ))
        )}
        {/* {result.length == 0 ? (
            <Text>로딩중...</Text>
          ) : (
            result.map((data) => (
              <Card key={data.sido_sgg} styl>
                <Card.Title>{data.sido_sgg}</Card.Title>
                <Card.Divider />
                <Card.Image
                  source={{
                    uri: data.image_src,
                  }}
                />
                <Text style={{ marginBottom: 10 }}>{data.description}</Text>
                <Button
                  icon={<Icon name="code" color="#ffffff" />}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="DETAILS"
                />
              </Card>
            ))
          )} */}
      </ScrollView>
    );
  }
  //map에 마커로 표시해서 보여줌
  else {
    return (
      <SafeAreaView>
        <ResultMap result={result} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
});

export default Result;
