import React, { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import WebView from "react-native-webview";
import axios from "axios";
// import * as AuthSession from "expo-auth-session";
import MypageMain from "./MypageMain";
import { BASE_URL } from "../api";

//redux
import { connect } from "react-redux";
import { SET_USER } from "../redux/userSlice";

//kako login

const REST_API_KEY = "db70b5cab2691de3b46b929e6dbd8eed";
const REDIRECT_URI = "https://auth.expo.io/@jisun0322/adondeTest";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function Login({ SET_USER, USER_DATA }) {
  //   const [ACCESS_TOKEN, setACCESS_TOKEN] = useState("");
  const [user, setUser] = useState(null);

  const getRequestCode = (target) => {
    console.log("-------url : ");
    console.log(target);
    const exp = "code=";
    const condition = target.indexOf(exp);
    console.log("condition", condition);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
      console.log("requestCode", requestCode);
    }
  };

  const requestToken = async (request_code) => {
    console.log("requestToken");
    var returnValue = "none";

    var request_token_url = "https://kauth.kakao.com/oauth/token";

    axios({
      method: "post",

      url: request_token_url,

      params: {
        grant_type: "authorization_code",

        client_id: REST_API_KEY,

        redirect_uri: REDIRECT_URI,

        code: request_code,
      },
    })
      .then(function (response) {
        console.log(
          "----------kakao login Response access_token : ",
          response.data.access_token
        );
        returnValue = response.data.access_token;
        getUserData(response.data.access_token);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const getUserData = async (access_token) => {
    const ACCESS_TOKEN = access_token;
    try {
      const url = "https://kapi.kakao.com/v2/user/me";
      const Header = {
        headers: {
          //   "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      };
      const res = await axios.get(url, Header);
      console.log("res", res.data.kakao_account);
      setUser(res.data.kakao_account);
      getUserId(res.data.kakao_account);
    } catch (e) {
      console.log("axios error");
      console.log(e);

      return;
    }
  };

  const getUserId = async (userObj) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/login`, {
        email: userObj.email,
        nickname: userObj.profile.nickname,
        profile_image: userObj.profile.profile_image_url,
        dateofbirth: userObj.birthday,
      });
      //redux
      SET_USER(res.data);
    } catch (e) {
      console.log("axios error get user Id");
      console.log(e);
    }
  };

  if (user == null) {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            const data = event.nativeEvent.url;
            getRequestCode(data);
          }}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>로그인 완료</Text>
        <Text>{user.profile.nickname}</Text>
        <Text>{user.email}</Text>
      </View>
    );
  }
}
const mapStateToProps = (state, myOwnProps) => {
  console.log("USER_DATA", state.user.user);
  return {
    USER_DATA: state.user.user,
  };
};

const mapDispatchToProps = {
  // ... normally is an object full of action creators
  SET_USER,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
