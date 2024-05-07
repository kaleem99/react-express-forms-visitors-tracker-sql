import { useState, useEffect } from "react";

const withLoadingScreen = (WrappedComponent) => {
  return ({ columns, data, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      // Check if data from props is not null
      // console.log(columns)
      console.log(data);
      if (data || columns) {
        setIsLoading(false);
        console.log(data);
      }
    }, [data, columns]);
    return isLoading ? <div>Loading...</div> : <WrappedComponent {...props} />;
  };
};

export default withLoadingScreen;
