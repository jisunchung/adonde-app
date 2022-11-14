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
    // console.log(storage);
    // console.log(storageRef);
    url();
  });

  return (
    <View style={styles.block}>
      <Text style={styles.text}>home</Text>
      <Image
        style={styles.logo}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/adonde-app.appspot.com/o/logo.png?alt=media&token=c715bc89-9a79-43f9-9b04-c04e0896f815",
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
    width: 66,
    height: 70,
  },
});

export default Home;
