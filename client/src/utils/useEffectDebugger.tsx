import React from "react";

const usePrevious = (value: any, initialValue: any) => {
  const ref = React.useRef(initialValue);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useEffectDebugger = (effectHook: any, dependencies: any[], dependencyNames = []) => {
    const previousDeps = usePrevious(dependencies, []);
  
    const changedDeps = dependencies.reduce((accum, dependency, index) => {
      if (dependency !== previousDeps[index]) {
        const keyName = dependencyNames[index] || index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency
          }
        };
      }
  
      return accum;
    }, {});
  
    if (Object.keys(changedDeps).length) {
      console.log('[use-effect-debugger] ', changedDeps);
    }
  
    React.useEffect(effectHook, dependencies);
  };