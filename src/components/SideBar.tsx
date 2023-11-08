import {
  Box,
  Stack,
  Typography,
  Divider,
  Chip,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
} from "@mui/material";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;
const routersArr = [
  {
    icon: <WidgetsOutlinedIcon fontSize="inherit" />,
    primary: "Showcases",
    to: "/showcases",
  },
  {
    icon: <ShowChartIcon fontSize="inherit" />,
    primary: "My progress",
    to: "/progress",
  },
  {
    icon: <ChecklistOutlinedIcon fontSize="inherit" />,
    primary: "Survey & Tests",
    to: "/survey",
  },
  {
    icon: <SpeakerNotesOutlinedIcon fontSize="inherit" />,
    primary: "History",
    to: "/history",
  },
  {
    icon: <SettingsOutlinedIcon fontSize="inherit" />,
    primary: "Settings",
    to: "/settings",
  },
];

export default function SideBar() {
  const [selectedTopicsArr, setSelectedTopicsArr] = useState<string[]>([
    "Technology",
    "Medicine",
  ]);
  const [editTopics, setEditTopics] = useState<boolean>(false);
  const [topicValue, setTopicValue] = useState<string>("");

  function handleAddTopic() {
    if (
      selectedTopicsArr
        .join(" ")
        .toLowerCase()
        .includes(topicValue.toLowerCase())
    )
      return;
    setSelectedTopicsArr((prev) => [...prev, topicValue]);
    setTopicValue("");
  }

  const drawer = (
    <div>
      <List sx={{ padding: { xs: "0 5px", md: "0 20px 20px" } }}>
        {routersArr.map((router) => (
          <ListItem
            key={router.primary}
            component={RouterNavLink}
            to={router.to}
            disablePadding
            sx={{
              borderRadius: "6px",
              marginBottom: "5px",
              color: "gray",
              padding: { xs: "7px 4px", md: "0" },
              "&:hover": {
                backgroundColor: "secondary.light",
                color: "black",
              },
              "&.active": {
                backgroundColor: "secondary.light",
                color: "black",
              },
            }}
          >
            {router.icon ? (
              <ListItemAvatar sx={{ minWidth: "30px", marginLeft: "5px" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    backgroundColor: "white",
                    color: "#62656a",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  {router.icon}
                </Avatar>
              </ListItemAvatar>
            ) : null}
            <ListItemText
              primary={router.primary}
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ display: { xs: "none", md: "block" } }} />
    </div>
  );

  const selectedTopicsItems = (
    <Box
      sx={{ display: { xs: "none", md: "block" }, padding: "20px" }}
      maxWidth={drawerWidth}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          marginTop: "30px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" rowGap={1} flexWrap={"wrap"}>
          {selectedTopicsArr?.length > 0 ? (
            selectedTopicsArr?.map((topic) => (
              <Chip
                key={topic}
                label={topic}
                variant="outlined"
                disabled={!editTopics}
                onDelete={() =>
                  setSelectedTopicsArr((prev) =>
                    prev.filter((item) => item !== topic)
                  )
                }
              />
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "gray" }}>
              Selected Topics
            </Typography>
          )}
        </Stack>
        <Button
          variant="text"
          color="success"
          disableRipple
          onClick={() => setEditTopics((prev) => !prev)}
          size="small"
          sx={{ textTransform: "capitalize" }}
        >
          {editTopics ? "Save" : "Edit"}
        </Button>
      </Stack>

      <Box marginTop={3} textAlign="right">
        <TextField
          variant="standard"
          label="Search and add Topics"
          size="small"
          value={topicValue}
          onChange={(e) => setTopicValue(e.target.value)}
        />
        {topicValue?.trim().length > 0 && (
          <Button
            variant="outlined"
            disableRipple
            color="primary"
            onClick={handleAddTopic}
            size="small"
            sx={{ marginTop: "15px" }}
          >
            Add
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      minHeight="100%"
      sx={{
        flexShrink: { sm: 0 },
        borderRight: "1px solid rgba(0 , 0, 0, 0.1)",
      }}
      aria-label="mailbox folders"
    >
      <Box width={{ xs: "fit-content", md: drawerWidth }}>{drawer}</Box>
      <Box>{selectedTopicsItems}</Box>
    </Box>
  );
}
