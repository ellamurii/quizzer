import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { topics } from "../../constants";
import { Question } from "../../constants/types";
import { Stack, Flex, ActionIcon, Button, Box, Text } from "@mantine/core";
import { IconArrowNarrowLeft, IconArrowsShuffle } from "@tabler/icons-react";
import { shuffleQuestions } from "../../utils/shuffleQuestions";
import { ProgressCard } from "../ProgressCard";
import Lottie from "lottie-react";
import sparkleLottie from "./../../lottie/sparkle.json";
import finishedLottie from "./../../lottie/finished.json";

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const topic = searchParams.get("topic");
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const match = topics.find((t) => t.title === topic);
    if (!topic || !match) {
      navigate("/", { replace: true });
    }

    setReviewQuestions(match?.questions);
  }, [navigate, topic]);

  const handleCorrect = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setCurrentStep((s) => s + 1);
    }, 500);
  };

  return (
    <Stack>
      {reviewQuestions && currentStep >= reviewQuestions.length && (
        <Box mt="lg">
          <Text c="brand.9" fw={700} fz="xl" ta="center">
            Ediwaaaaw! Yiee
          </Text>
          <Lottie animationData={finishedLottie} />
          <Button
            fullWidth
            size="lg"
            leftSection={<IconArrowNarrowLeft />}
            onClick={() => {
              setCurrentStep(0);
              setAnswers(undefined);
              navigate("/", { replace: true });
            }}
          >
            Main Menu
          </Button>
        </Box>
      )}

      {reviewQuestions && currentStep < reviewQuestions.length && (
        <ProgressCard
          currentValue={currentStep + 1}
          totalValue={reviewQuestions.length}
        />
      )}
      {reviewQuestions && currentStep < reviewQuestions.length && (
        <Flex ml="auto" gap="xs" pt="46px">
          <ActionIcon
            variant="gradient"
            size="lg"
            gradient={{ from: "grape", to: "brand", deg: 75 }}
            onClick={() => {
              if (!reviewQuestions) return;
              setCurrentStep(0);
              setAnswers(undefined);
              setReviewQuestions([...shuffleQuestions(reviewQuestions)]);
            }}
          >
            <IconArrowsShuffle />
          </ActionIcon>
        </Flex>
      )}
      {reviewQuestions?.map(
        (question, index) =>
          index === currentStep && (
            <Box key={index}>
              <Text ta="center" fz="h4" my="lg">
                {question.question}
              </Text>
              <Flex pt="md" direction="column" gap="xs">
                {question.options.map((choice, choiceIndex) => (
                  <Box key={choiceIndex} pos="relative">
                    {answers?.[index] === question.answerIndex &&
                      answers?.[index] === choiceIndex && (
                        <Lottie
                          animationData={sparkleLottie}
                          style={{
                            position: "absolute",
                            zIndex: 20,
                            top: "-60px",
                            right: 0,
                            left: 0,
                          }}
                        />
                      )}
                    <Button
                      fullWidth
                      radius="xl"
                      size="md"
                      variant="light"
                      className="choice-btn"
                      style={{
                        height: "unset",
                        minHeight:
                          "var(--button-height, var(--button-height-sm))",
                      }}
                      {...(answers?.[index] !== choiceIndex
                        ? {}
                        : {
                            color:
                              answers?.[index] === question.answerIndex &&
                              answers?.[index] === choiceIndex
                                ? "cyan.5"
                                : "red.5",
                            variant: "filled",
                          })}
                      onClick={() => {
                        setAnswers((s) => ({
                          ...s,
                          [`${index}`]: choiceIndex,
                        }));
                        if (choiceIndex === question.answerIndex) {
                          handleCorrect();
                        }
                      }}
                    >
                      {choice}
                    </Button>
                  </Box>
                ))}
              </Flex>
            </Box>
          )
      )}
    </Stack>
  );
};

export default Quiz;
