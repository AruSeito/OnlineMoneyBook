import React from "react";
import { AppContext } from "./App";

const WithContext = (Component: typeof React.Component) => {
  return (props: any) => (
    <AppContext.Consumer>
      {({ state }) => {
        return <Component {...props} data={state} />;
      }}
    </AppContext.Consumer>
  );
};

export default WithContext;
