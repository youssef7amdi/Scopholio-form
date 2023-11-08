import {
  Box,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Outlet, NavLink as RouterNavLink } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import HelpIcon from "@mui/icons-material/Help";

const settingsRoutes = [
  {
    primary: "Profile",
    to: "profile",
  },
  {
    primary: "Account",
    to: "account",
  },
];

export default function SettingsLayout() {
  const settingNav = (
    <div>
      <List
        sx={{
          paddingBottom: "0",
        }}
      >
        <Stack
          direction={{ xs: "row", md: "column" }}
          justifyContent={{
            xs: "center",
          }}
          spacing={1}
        >
          {settingsRoutes.map((router) => (
            <ListItem
              key={router.primary}
              component={RouterNavLink}
              to={router.to}
              sx={{
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: {
                  xs: "0",
                  md: "6px",
                },
                borderTopRightRadius: {
                  xs: "6px",
                  md: "0",
                },
                marginBottom: {
                  xs: "0",
                  md: "5px",
                },
                color: "#6297c5",
                "&:hover": {
                  backgroundColor: "secondary.light",
                },
                "&.active": {
                  backgroundColor: "secondary.light",
                },
                width: {
                  xs: "90px",
                  md: "auto",
                },
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <ListItemText primary={router.primary} />
            </ListItem>
          ))}
        </Stack>
      </List>
    </div>
  );

  return (
    <Stack component="section" padding="0 30px 30px 0" minHeight="100%">
      <Stack direction="row" spacing={2} justifyContent="flex-end" mb={2}>
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: "capitalize", color: "#ada7a7" }}
          startIcon={<MailIcon />}
        >
          Support
        </Button>
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: "capitalize", color: "#ada7a7" }}
          startIcon={<HelpIcon />}
        >
          help
        </Button>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        border="1px solid rgba(0, 0, 0, .3)"
        padding={3}
        borderRadius={2}
        flexGrow="1"
        justifyContent={{
          xs: "center",
        }}
      >
        <Box
          component="nav"
          width={{
            xs: "100%",
            md: "180px",
          }}
          aria-label="settings folders"
          textAlign="center"
        >
          <>{settingNav}</>
        </Box>
        <Box flexGrow={1} bgcolor="secondary.light" p={2}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
}
