import { Box, Button, Card, Flex } from "@mantine/core";
import { topics } from "./constants";
import { ProgressCard } from "./components/ProgressCard";
import { Question } from "./constants/types";
import { useState } from "react";
// import { ActionsGrid } from "./components/ActionsGrid";

function App() {
  const geo = topics[0]; // TODO: make dynamic options
  const [shuffledQuestions] = useState<Question[]>(
    shuffleQuestions(geo.questions)
  );

  return (
    <Box maw={400} w="100%" p="xl" mx="auto">
      <Box w="100%">
        {/* <ActionsGrid /> */}
        <ProgressCard currentValue={10} totalValue={geo.questions.length} />
        <Box mt="xl" pt="lg">
          {shuffledQuestions.map((question, index) => (
            <Card key={index} withBorder mb="lg">
              <Card bg="brand.1" withBorder w="100%">
                {question.question}
              </Card>
              <Flex pt="md" direction="column" gap="xs">
                {question.options.map((choice, choiceIndex) => (
                  <Button key={choiceIndex} variant="outline">
                    {choice}
                  </Button>
                ))}
              </Flex>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const shuffleQuestions = (array: Question[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default App;
