import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { topics } from "../../constants";
import { Question } from "../../constants/types";
import useModeStore from "../../store/useMode";
import { Stack, Flex, ActionIcon, Button, Card } from "@mantine/core";
import { IconArrowsShuffle } from "@tabler/icons-react";
import { shuffleQuestions } from "../../utils/shuffleQuestions";

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const topic = searchParams.get("topic");
  const { answerOnly } = useModeStore();
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>();

  useEffect(() => {
    const match = topics.find((t) => t.title === topic);
    if (!topic || !match) {
      navigate("/", { replace: true });
    }

    setReviewQuestions(match?.questions);
  }, [navigate, topic]);

  return (
    <Stack>
      <Flex ml="auto" gap="xs">
        {/* <ActionIcon
          variant="gradient"
          size="lg"
          gradient={{ from: "grape", to: "brand", deg: 75 }}
          onClick={() => setAnswerOnly(!answerOnly)}
        >
          {answerOnly ? <IconEyeCode /> : <IconEyeClosed />}
        </ActionIcon> */}
        <ActionIcon
          variant="gradient"
          size="lg"
          gradient={{ from: "grape", to: "brand", deg: 75 }}
          onClick={() =>
            reviewQuestions &&
            setReviewQuestions([...shuffleQuestions(reviewQuestions)])
          }
        >
          <IconArrowsShuffle />
        </ActionIcon>
      </Flex>
      {reviewQuestions?.map((question, index) => (
        <Card key={index} withBorder mb="lg">
          <Card w="100%">{question.question}</Card>
          <Flex pt="md" direction="column" gap="xs">
            {question.options.map(
              (choice, choiceIndex) =>
                (answerOnly ? question.answerIndex === choiceIndex : true) && (
                  <Button key={choiceIndex} variant="light">
                    {choice}
                  </Button>
                )
            )}
          </Flex>
        </Card>
      ))}
    </Stack>
  );
};

export default Quiz;
