import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "../firebaseConfig";
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
      <Text style={styles.text}>home</Text>
      <Image
        style={styles.logo}
        source={{
          uri: imageUrl,
        }}
      />
      <Button title="go start " onPress={() => navigation.navigate("Start")} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
  logo: {
    width: 210,
    height: 180,
  },
});

export default Home;
