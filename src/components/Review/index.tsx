import { Flex, ActionIcon, Stack, Text } from "@mantine/core";
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
import { shuffleQuestions } from "../../utils/shuffleQuestions";

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
        <Stack gap={0} key={index}>
          <Text mb="xs" size="sm" fw={600}>
            {question.question}
          </Text>
          {question.options.map(
            (choice, choiceIndex) =>
              (answerOnly ? question.answerIndex === choiceIndex : true) && (
                <Text key={choiceIndex} size="xs">
                  - {choice}
                </Text>
              )
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default Review;
