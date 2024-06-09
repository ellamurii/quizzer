import {
  Flex,
  ActionIcon,
  Stack,
  Text,
  Input,
  CloseButton,
  Highlight,
} from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Question } from "../../constants/types";
import { useEffect, useState } from "react";
import { topics } from "../../constants";
import {
  IconArrowsShuffle,
  IconEyeClosed,
  IconEyeCode,
  IconSearch,
} from "@tabler/icons-react";
import { shuffleQuestions } from "../../utils/shuffleQuestions";

const Review = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const topic = searchParams.get("topic");
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>();
  const [value, setValue] = useState("");
  const [answerOnly, setAnswerOnly] = useState(true);

  useEffect(() => {
    const match = topics.find((t) => t.title === topic);
    if (!topic || !match) {
      navigate("/", { replace: true });
    }

    setReviewQuestions(match?.questions);
  }, [navigate, topic]);

  return (
    <Stack>
      <Flex gap="xs" justify="space-between">
        <Input
          placeholder="Search Question"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          rightSectionPointerEvents="all"
          leftSection={<IconSearch size={16} />}
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setValue("")}
              style={{ display: value ? undefined : "none" }}
            />
          }
        />
        <Flex gap="xs">
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
      </Flex>
      {reviewQuestions
        ?.filter((str) =>
          str.question.toLowerCase().includes(value.toLowerCase())
        )
        .map((question, index) => (
          <Stack gap={0} key={index}>
            <Highlight mb="xs" size="sm" fw={600} highlight={value}>
              {question.question}
            </Highlight>
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
