import { Link } from "wouter";

export const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/exam">Exams</Link>
        {"  "}
        <Link href="/exam/create">Create exam</Link>
      </nav>
    </header>
  );
};
