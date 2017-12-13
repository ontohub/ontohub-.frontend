import React from "react";

export const withRefs = refsMap => BaseComponent => {
  const refs = {};

  return props => (
    <BaseComponent
      {...props}
      refs={refs}
      {...Object.keys(refsMap).reduce(
        (acc, refName) => ({
          ...acc,
          [refsMap[refName]]: element => {
            refs[refName] = element;
          }
        }),
        {}
      )}
    />
  );
};

export default withRefs;
