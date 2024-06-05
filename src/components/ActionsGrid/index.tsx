import {
  Text,
  SimpleGrid,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import classes from "./ActionsGrid.module.css";
import { topics } from "../../constants";

export function ActionsGrid() {
  const theme = useMantineTheme();

  const items = topics.map((item) => (
    <UnstyledButton key={item.title} className={classes.item} px="sm">
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="sm" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <SimpleGrid cols={3}>
      {items}
    </SimpleGrid>
  );
}
