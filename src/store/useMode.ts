import { create } from "zustand";

interface QuizzerState {
  mode?: "review" | "quiz" | "timed";
  topic: string;
  compact: boolean;
}

interface QuizzerActions {
  setMode: (mode: QuizzerState["mode"]) => void;
  setTopic: (topic: string) => void;
  setCompact: (compact: boolean) => void;
}

const useModeStore = create<QuizzerState & QuizzerActions>((set) => ({
  mode: undefined,
  topic: "",
  compact: false,
  setMode: (mode) => set({ mode }),
  setTopic: (topic) => set({ topic }),
  setCompact: (compact) => set({ compact }),
}));

export default useModeStore;
