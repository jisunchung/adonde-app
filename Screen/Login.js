import React, { useState } from "react";
import { View, Alert, Text } from "react-native";
import WebView from "react-native-webview";
import axios from "axios";
import * as AuthSession from "expo-auth-session";

const REST_API_KEY = "db70b5cab2691de3b46b929e6dbd8eed";
const REDIRECT_URI = "https://auth.expo.io/@jisun0322/adondeTest";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function Login() {
  //   const [ACCESS_TOKEN, setACCESS_TOKEN] = useState("");
  const [user, setUser] = useState(null);
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
    } catch (e) {
      console.log("액시오스 에러");
      console.log(e);

      // const response =  Failure<string> => {
      //   result: 'fail',
      //   error: '토큰 에러',
      // };
      return;
    }
  };
  const requestToken = async (request_code) => {
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

  const getCode = (target) => {
    console.log("-------url : ");
    console.log(target);
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
      console.log("requestCode", requestCode);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {user != null ? (
        <View>
          <Text>로그인성공</Text>
          <Text>{user.profile.nickname}</Text>
          <Text>{user.email}</Text>
          <Text>{user.birthday}</Text>
        </View>
      ) : (
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            const data = event.nativeEvent.url;
            getCode(data);
          }}
        />
      )}
    </View>
  );
}
export default Login;
