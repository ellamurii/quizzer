import { Card, Flex, Button, ActionIcon, Stack } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import useModeStore from "../../store/useMode";
import { Question } from "../../constants/types";
import { useEffect, useState } from "react";
import { topics } from "../../constants";
import {
  IconArrowsShuffle,
  IconEyeClosed,
  IconEyeCode,
} from "@tabler/icons-react";

const Review = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const topic = searchParams.get("topic");
  const { answerOnly, setAnswerOnly } = useModeStore();
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
        <ActionIcon
          variant="gradient"
          size="lg"
          gradient={{ from: "grape", to: "brand", deg: 75 }}
          onClick={() => setAnswerOnly(!answerOnly)}
        >
          {answerOnly ? <IconEyeCode /> : <IconEyeClosed />}
        </ActionIcon>
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

const shuffleQuestions = (array: Question[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default Review;
