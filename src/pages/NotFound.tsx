import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  // 404 path is intentionally not logged: in production the noise is unhelpful,
  // and Lighthouse penalizes console.error in Best Practices.
  void location;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
