import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import axios from "axios";
import { BASE_URL } from "../api";
import { useRoute } from "@react-navigation/native";
import { Card, Icon, Overlay } from "react-native-elements";
import { ScrollView } from "react-native";
import CardComp from "../component/Card";
import { Entypo } from "@expo/vector-icons";
import ResultMap from "./ResultMap";
import * as Shake from "expo-shake";

function Result({ navigation }) {
  const [result, setResult] = useState([]);
  const [shake, setShake] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const route = useRoute();

  const getRandomArbitrary = (min, max) => {
    var rand;
    rand = Math.floor(Math.random() * (max - min) + min);
    return rand;
  };
  const getRandomNumber = useMemo(
    () => getRandomArbitrary(0, result.length),
    [shake]
  );
  const showRandomCard =
    result.length != 0 ? (
      <View style={styles.random_block}>
        <Text>result length: {result.length}</Text>
        <Text>random num : {getRandomNumber}</Text>
        <Text>random num : {getRandomNumber}</Text>
        <Text>random num : {getRandomNumber}</Text>
        <Text>{randomNum}</Text>
        <Button title="다시하기" onPress={() => setShake(false)}></Button>
        <CardComp
          key={result[getRandomNumber].sido_sgg}
          name={result[getRandomNumber].sido_sgg}
          img={result[getRandomNumber].image_src}
          description={result[getRandomNumber].description}
        ></CardComp>
      </View>
    ) : null;

  useEffect(() => {
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
        //   console.log("Random Num", getRandomArbitrary(0, res.data.length));
        setResult(res.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    searchResult();
    Shake.addListener(() => {
      //   alert("shake!");
      setShake(true);
      //   alert(getRandomArbitrary(0, 100));
    });
    // setShake(true);
    // setRandomNum(getRandomArbitrary(0, result.length));

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
          <View>
            <View style={{}}>
              <Overlay isVisible={shake}>
                {/* {showRandomCard} */}

                <CardComp
                  key={result[getRandomNumber].sido_sgg}
                  name={result[getRandomNumber].sido_sgg}
                  img={result[getRandomNumber].image_src}
                  description={result[getRandomNumber].description}
                ></CardComp>

                <Button title="x" onPress={() => setShake(false)}></Button>
              </Overlay>
              <Button title="shake" onPress={() => setShake(true)}></Button>
            </View>
            {result.map((data) => (
              <View>
                <CardComp
                  key={data.sido_sgg}
                  name={data.sido_sgg}
                  img={data.image_src}
                  description={data.description}
                ></CardComp>
              </View>
            ))}
          </View>
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
  random_block: {
    // backgroundColor: "#ffffff",
    // opacity: 0.5,
  },

  text: {
    padding: 16,
    fontSize: 24,
  },
});

export default Result;
