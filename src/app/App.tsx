import "@/app/styles/global.less";
import { AppProviders } from "@/app/providers/AppProviders";
import { JobBoardPage } from "@/pages/jobBoard/JobBoardPage";

export default function App() {
  return (
    <AppProviders>
      <JobBoardPage />
    </AppProviders>
  );
}
