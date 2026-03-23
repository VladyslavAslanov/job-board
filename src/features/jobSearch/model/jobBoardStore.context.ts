import { createContext, useContext } from "react";
import { JobBoardStore } from "./jobBoardStore";

export const JobBoardStoreContext = createContext<JobBoardStore | null>(null);

export function useJobBoardStore() {
  const store = useContext(JobBoardStoreContext);

  if (!store) {
    throw new Error(
      "useJobBoardStore must be used within JobBoardStoreProvider"
    );
  }

  return store;
}
