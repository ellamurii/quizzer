import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./global.css";

const theme = createTheme({
  colors: {
    brand: [
      "#f4f1f9",
      "#e5dfec",
      "#c8bcda",
      "#ab97c8",
      "#9277b8",
      "#8362af",
      "#7b58ab",
      "#694996",
      "#5e4086",
      "#513677",
    ],
  },
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "brand",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
