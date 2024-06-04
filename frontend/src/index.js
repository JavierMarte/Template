import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { Provider } from 'react-redux'; // Correct import for Redux provider
import store from './store'; // Ensure you have this import for your Redux store

import { GlobalProvider } from "contexts/GlobalContext";

import { SettingsProvider } from "contexts/SettingsContext";
import { Toaster } from "react-hot-toast";
//import { ReactFlowProvider } from "reactflow";
import { QuickstartProvider } from "contexts/QuickContext";
import { Layout } from "layout";


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Toaster position="top-right" />
      <ThemeEditorProvider>
        <HashRouter>

            <Provider store={store}>
            <GlobalProvider>
              <SettingsProvider>
                <QuickstartProvider>

                  <Switch>
                    <Layout />
                  </Switch>

            

                </QuickstartProvider>

              </SettingsProvider>
            </GlobalProvider>
            </Provider>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
