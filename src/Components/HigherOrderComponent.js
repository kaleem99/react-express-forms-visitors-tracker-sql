import { useState, useEffect } from "react";

const withLoadingScreen = (WrappedComponent) => {
  return ({ columns, data, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      // Check if data from props is not null
      // console.log(columns)
      if (data || columns) {
        setIsLoading(false);
      }
    }, [data, columns]);
    return isLoading ? <div>Loading...</div> : <WrappedComponent {...props} />;
  };
};

export default withLoadingScreen;
