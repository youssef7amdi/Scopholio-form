import { Divider, Stack, Box } from "@mui/material";
import Header from "./Header";
import SideBar from "./SideBar";

export default function PageLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <Stack minHeight={"100dvh"}>
      <Header />
      <Stack direction="row" spacing={2} flexGrow={1}>
        <SideBar />
        <Divider />
        <Box flexGrow="1">{children}</Box>
      </Stack>
    </Stack>
  );
}
