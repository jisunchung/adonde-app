import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/Screen/RootStack";

// redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./src/redux/reducer";

const store = configureStore({
  reducer: rootReducer,
});
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
