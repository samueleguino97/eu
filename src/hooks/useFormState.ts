import { useState } from 'react';

export default function useFormState(initialState = {}): [any, Function] {
  const [state, setState] = useState(initialState);

  function setField(field) {
    return function (value) {
      if (value?.target) {
        setState({ ...state, [field]: value.target.value });
      } else {
        setState({ ...state, [field]: value });
      }
    };
  }
  function getFieldProps(field) {
    return {
      onChange: setField(field),
      value: state[field],
    };
  }
  return [state, getFieldProps];
}
