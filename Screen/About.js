import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

function About() {
  return (
    <View style={styles.block}>
      <View style={styles.about_view}>
        <View style={styles.dev_title}>
          <Fontisto
            name="persons"
            style={styles.dev_title_icon}
            color="black"
          />
          <Text style={styles.dev_title_text}>developers</Text>
        </View>

        {/*  */}
        <View style={styles.dev_part_block}>
          <Text style={styles.dev_part_text}>Frontend</Text>
          <View style={styles.dev_person_info}>
            <Text style={styles.dev_person_info_text}>└─ jisun</Text>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://github.com/jisunchung");
              }}
            >
              <Text style={styles.git_link}>https://github.com/jisunchung</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*  */}

        <View style={styles.dev_part_block}>
          <Text style={styles.dev_part_text}>Backend</Text>
          <View style={styles.dev_person_info}>
            <Text style={styles.dev_person_info_text}>└─ jangwoo</Text>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://github.com/forrestpark");
              }}
            >
              <Text style={styles.git_link}>
                https://github.com/forrestpark
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dev_person_info}>
            <Text style={styles.dev_person_info_text}>└─ dokyung</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://github.com/dokker19");
              }}
            >
              <Text style={styles.git_link}>https://github.com/dokker19</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  block: {
    flex: 1,

    backgroundColor: "white",
  },
  about_view: {
    marginTop: 30,
    marginHorizontal: 40,
  },
  dev_title: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dev_title_icon: { fontSize: 24 },
  dev_title_text: { marginLeft: 10, fontSize: 20 },
  dev_part_block: {
    borderStyle: "solid",
    borderWidth: 2,
    width: screenWidth - 80,
    paddingLeft: 10,
    marginVertical: 10,
  },
  dev_part_text: { marginVertical: 8, fontSize: 18, fontWeight: "bold" },
  dev_person_info: {
    marginVertical: 10,
  },
  dev_person_info_text: {
    fontSize: 18,
  },
  git_link: {
    textDecorationLine: "underline",
    color: "#5882FA",
    marginLeft: 38,
  },
});
export default About;
