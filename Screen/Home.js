import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "../firebaseConfig";
import { Button } from "react-native-paper";

function Home({ navigation }) {
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage(app);
  const storageRef = ref(storage, `logo.png`);
  const url = async () => {
    const imageUrl = await getDownloadURL(storageRef);
    setImageUrl(imageUrl);
    console.log(imageUrl);
  };
  useEffect(() => {
    console.log(storage);
    // console.log(storageRef);
    url();
  });

  return (
    <View style={styles.block}>
      {/* <Text style={styles.text}>home</Text> */}
      <Image
        style={styles.logo}
        source={
          imageUrl
            ? {
                uri: imageUrl,
              }
            : null
        }
      />
      <Image source={require("../assets/adonde_title.png")} />
      <Button
        color="#f194ff"
        title="start "
        onPress={() => navigation.navigate("Start")}
      />
      <Button
        icon="airplane"
        mode="contained-tonal"
        onPress={() => navigation.navigate("Start")}
      >
        Start!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: "#44AD5E",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    // padding: 16,
    fontSize: 24,
  },
  logo: {
    width: 230,
    height: 225,
  },
  start_btn: {
    width: 30,
  },
});

export default Home;
