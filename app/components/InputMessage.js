import React from "react";

import AppText from "./AppText";

const InputMessage = ({ visible, error, color }) => {
  if (!visible || !error) {
    return null;
  }

  return (
    <AppText color={color} size={16}>
      {error}
    </AppText>
  );
};

export default InputMessage;
