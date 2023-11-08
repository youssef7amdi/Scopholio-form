import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  Avatar,
  Badge,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PublicIcon from "@mui/icons-material/Public";
import { profile } from "../constants/images";

export default function Header() {
  const [pageLanguage, setPageLanguage] = useState<string>("en");
  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageLanguage(event.target.value as string);
  };

  return (
    <AppBar
      position="static"
      variant="outlined"
      elevation={0}
      sx={{
        backgroundColor: "white",
        border: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12);",
        marginBottom: "30px",
      }}
    >
      <Toolbar>
        <Typography
          sx={{
            fontWeight: "bold",
            flexGrow: "1",
            typography: { sm: "h6", md: "h4" },
          }}
        >
          <Box
            component="span"
            sx={{
              color: "white",
              backgroundColor: "primary.main",
            }}
          >
            sco
          </Box>
          <Box
            component="span"
            sx={{
              color: "#4b2aaa",
            }}
          >
            folio
          </Box>
          <Box
            component="span"
            sx={{
              color: "#00b5a2",
            }}
          >
            .
          </Box>
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            select
            id="language-select"
            value={pageLanguage}
            onChange={handleLanguageChange}
            size="small"
            InputProps={{
              sx: { width: "115px", borderRadius: "50px", fontSize: "12px" },
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"ar"}>Arabic</MenuItem>
          </TextField>
          <IconButton>
            <Badge
              variant="dot"
              color="error"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <Avatar src={profile} alt="error" />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
