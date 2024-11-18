import { Route, Switch } from "wouter";

import NotFound from "./pages/NotFound";

import { Header } from "./components/Header";
import { ExamList } from "./components/ExamList";
import { CreateExamForm } from "./components/CreateExamForm";

export type Exam = {
  title: string;
  createdAt?: string;
  _id: string;
};

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/exam"><ExamList /></Route>
        <Route path="/exam/create"><CreateExamForm /></Route>

        {/* Not Found Page */}
        <Route><NotFound /></Route>
      </Switch>
    </>
  );
}
