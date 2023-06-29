import { useState, useRef, useEffect } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (initState) => {
  const stateRef = useRef(null);
  const [state, setState] = useState(initState);

  useEffect(() => {
    stateRef.current && stateRef.current(state);
  }, [state]);

  return [
    state,
    (newState) =>
      new Promise((rel) => {
        stateRef.current = rel;
        setState(newState);
      }),
  ];
};
