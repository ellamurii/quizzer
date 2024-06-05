import { create } from "zustand";

interface QuizzerState {
  mode?: "review" | "quiz" | "timed";
  topic: string;
  answerOnly: boolean;
  compact: boolean;
}

interface QuizzerActions {
  setMode: (mode: QuizzerState["mode"]) => void;
  setTopic: (topic: string) => void;
  setAnswerOnly: (answerOnly: boolean) => void;
  setCompact: (compact: boolean) => void;
}

const useModeStore = create<QuizzerState & QuizzerActions>((set) => ({
  mode: undefined,
  topic: "",
  answerOnly: false,
  compact: false,
  setMode: (mode) => set({ mode }),
  setTopic: (topic) => set({ topic }),
  setAnswerOnly: (answerOnly) => set({ answerOnly }),
  setCompact: (compact) => set({ compact }),
}));

export default useModeStore;
