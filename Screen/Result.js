import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";
import { BASE_URL } from "../api";
import { useRoute } from "@react-navigation/native";
import { Card, Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import CardComp from "../component/Card";

function Result({ navigation }) {
  const [result, setResult] = useState([]);
  const route = useRoute();
  const searchResult = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/search/`, {
        theme: "",
        population: [0, 0],
        distance: "",
        transportation: [],
        origin: "서울 서울",
      });
      console.log("res.data:", res.data[2]);
      setResult(res.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    searchResult();
  }, []);
  return (
    <ScrollView style={styles.block}>
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

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
});

export default Result;
