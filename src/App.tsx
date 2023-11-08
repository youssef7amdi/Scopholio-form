import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";

import Settings from "./pages/Settings";
import MyProgress from "./pages/MyProgress";
import Survey from "./pages/Survey";
import History from "./pages/History";
import ShowCases from "./pages/ShowCases";
import PageNotFound from "./pages/PageNotFound";
import Account from "./components/Account";
import Profile from "./components/Profile";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00b5a2",
    },
    secondary: {
      main: "#e5e5e6",
      light: "#edeff0",
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          backgroundColor: "#edeff0",
          width: "100%",
          margin: "0",
          borderRadius: "none",
          fontSize: "10px",
          padding: "2px",
        },
      },
    },
  },
});

function App() {
  return (
    <Box minHeight="100dvh">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to="settings" />} />
            <Route path="showcases" element={<ShowCases />} />
            <Route path="progress" element={<MyProgress />} />
            <Route path="survey" element={<Survey />} />
            <Route path="history" element={<History />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<Navigate replace to="account" />} />
              <Route path="account" element={<Account />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  );
}

export default App;
