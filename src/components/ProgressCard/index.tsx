import { Text, Progress, Card, Center } from "@mantine/core";

interface Props {
  currentValue: number;
  totalValue: number;
}

export function ProgressCard(props: Props) {
  return (
    <Card
      radius="md"
      padding="sm"
      style={{
        position: "fixed",
        zIndex: 10,
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Center>
        <Text fz="sm" tt="uppercase" fw={400} c="brand.8">
          {props.currentValue} / {props.totalValue}
        </Text>
      </Center>
      <Progress
        value={(props.currentValue / props.totalValue) * 100}
        mt="xs"
        size="lg"
        radius="xl"
      />
    </Card>
  );
}
