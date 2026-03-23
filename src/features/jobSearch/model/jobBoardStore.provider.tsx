import { useState, type ReactNode } from "react";
import { JobBoardStore } from "./jobBoardStore";
import { JobBoardStoreContext } from "./jobBoardStore.context";

interface JobBoardStoreProviderProps {
  children: ReactNode;
}

export function JobBoardStoreProvider({
  children,
}: JobBoardStoreProviderProps) {
  const [store] = useState(() => new JobBoardStore());

  return (
    <JobBoardStoreContext.Provider value={store}>
      {children}
    </JobBoardStoreContext.Provider>
  );
}
