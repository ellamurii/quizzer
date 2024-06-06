import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Box, createTheme, MantineProvider } from "@mantine/core";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "@mantine/core/styles.css";
import "./global.css";
import Review from "./components/Review";
import Quiz from "./components/Quiz";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="review" element={<Review />} />
      <Route path="quiz" element={<Quiz />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Box maw={400} w="100%" p="xl" mx="auto">
        <RouterProvider router={router} />
      </Box>
    </MantineProvider>
  </React.StrictMode>
);
