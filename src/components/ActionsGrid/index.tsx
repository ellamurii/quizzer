import {
  Text,
  SimpleGrid,
  UnstyledButton,
  useMantineTheme,
  Box,
  Stack,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./ActionsGrid.module.css";
import { topics } from "../../constants";
import useModeStore from "../../store/useMode";
import {
  IconArrowNarrowRight,
  IconListCheck,
  IconPencilMinus,
} from "@tabler/icons-react";

export function ActionsGrid() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { topic, setTopic, mode, setMode } = useModeStore();

  const items = topics.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      px="sm"
      bg={theme.colors[item.color][0]}
      onClick={() => setTopic(topic === item.title ? "" : item.title)}
      style={{
        ...(topic === item.title
          ? { border: `2px solid ${theme.colors[item.color][6]}` }
          : {}),
      }}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7} c={theme.colors[item.color][7]}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Stack gap="3rem">
      <Box>
        <Text size="xl" fw={600} c="dark.7" mb="md">
          Choose a Topic
        </Text>
        <SimpleGrid cols={3}>{items}</SimpleGrid>
      </Box>
      <Box>
        <Text size="xl" fw={600} c="dark.7" mb="md">
          In the mood for?
        </Text>
        <SimpleGrid cols={2}>
          <UnstyledButton
            className={classes.item}
            px="sm"
            bg="green.0"
            onClick={() => setMode(mode === "review" ? undefined : "review")}
            style={{
              ...(mode === "review"
                ? { border: `2px solid ${theme.colors["green"][6]}` }
                : {}),
            }}
          >
            <IconListCheck color={theme.colors["green"][6]} size="2rem" />
            <Text size="sm" mt={7} c={theme.colors["green"][7]}>
              Review
            </Text>
          </UnstyledButton>
          <UnstyledButton
            className={classes.item}
            px="sm"
            bg="pink.0"
            onClick={() => setMode(mode === "quiz" ? undefined : "quiz")}
            style={{
              ...(mode === "quiz"
                ? { border: `2px solid ${theme.colors["pink"][6]}` }
                : {}),
            }}
          >
            <IconPencilMinus color={theme.colors["pink"][6]} size="2rem" />
            <Text size="sm" mt={7} c={theme.colors["pink"][7]}>
              Quiz
            </Text>
          </UnstyledButton>
        </SimpleGrid>
      </Box>
      <Button
        size="lg"
        rightSection={<IconArrowNarrowRight />}
        disabled={!topic || !mode}
        onClick={() => navigate(`/${mode}?topic=` + topic)}
      >
        Proceed
      </Button>
    </Stack>
  );
}
