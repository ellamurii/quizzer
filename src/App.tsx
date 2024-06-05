import { Box, Text } from "@mantine/core";
import { ActionsGrid } from "./components/ActionsGrid";

function App() {
  return (
    <Box w="100%">
      <Box
        bg="brand.8"
        c="gray.0"
        mx="-xl"
        mt="-xl"
        p="3rem"
        mb="4rem"
        style={{
          borderBottomRightRadius: "40%",
          borderBottomLeftRadius: "40%",
        }}
      >
        <Text fw={700} fz="xl" ta="center">
          AngelaQuizzer
        </Text>
      </Box>
      <ActionsGrid />
    </Box>
  );
}

export default App;
