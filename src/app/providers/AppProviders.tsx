import { JobBoardStoreProvider } from "@/features/jobSearch/model/jobBoardStore.provider";
import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <JobBoardStoreProvider>{children}</JobBoardStoreProvider>;
}
