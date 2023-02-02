import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import axios from "axios";

const REST_API_KEY = "db70b5cab2691de3b46b929e6dbd8eed";
const REDIRECT_URI = "https://auth.expo.io/@jisun0322/adondeTest";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const html = `
  <div>TEST</div>
`;
function Login() {
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
          "----------kakao login Response access_token--------",
          response.data.access_token
        );
        returnValue = response.data.access_token;
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const getCode = (target) => {
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
    </View>
  );
}
export default Login;
