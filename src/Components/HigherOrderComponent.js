import { useState, useEffect } from "react";

const withLoadingScreen = (WrappedComponent) => {
  return ({ data, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      // Check if data from props is not null
      if (data) {
        setIsLoading(false);
      }
    }, [data]);
    return isLoading ? <div>Loading...</div> : <WrappedComponent {...props} />;
  };
};

export default withLoadingScreen;
