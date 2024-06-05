import { create } from "zustand";

interface QuizzerState {
  mode?: "review" | "quiz" | "timed";
  topic: string;
  answerOnly: boolean;
}

interface QuizzerActions {
  setMode: (mode: QuizzerState["mode"]) => void;
  setTopic: (topic: string) => void;
  setAnswerOnly: (answerOnly: boolean) => void;
}

const useModeStore = create<QuizzerState & QuizzerActions>((set) => ({
  mode: undefined,
  topic: "",
  answerOnly: false,
  setMode: (mode) => set({ mode }),
  setTopic: (topic) => set({ topic }),
  setAnswerOnly: (answerOnly) => set({ answerOnly }),
}));

export default useModeStore;
