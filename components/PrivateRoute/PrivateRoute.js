import { useRouter } from "next/router";

const PrivateRoute = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const router = useRouter();

      const accessToken = localStorage.getItem("token");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        router.replace("/auth/login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default PrivateRoute;
