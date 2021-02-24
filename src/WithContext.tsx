import React from "react";
import { AppContext } from "./App";

const WithContext = (Component: typeof React.Component) => {
  return (props: any) => (
    <AppContext.Consumer>
      {({ state, actions }) => {
        return <Component {...props} data={state} actions={actions} />;
      }}
    </AppContext.Consumer>
  );
};

export default WithContext;
