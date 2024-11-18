import { Link } from "wouter";

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <Link href="/exam" replace state={{ animate: true }}>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
