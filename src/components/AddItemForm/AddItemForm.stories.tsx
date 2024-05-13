import React from "react";
import { AddItemForm } from "./AddItemForm";
import { Meta } from "@storybook/react";

const meta: Meta<typeof AddItemForm> = {
  title: "Task component",
  component: AddItemForm,
};

export default meta;

export const AddItemFormBaseExample = () => {
  return (
    <AddItemForm
      addItem={(title: string) => alert(title)}
      placeholderTitle={"Story placeholder"}
    />
  );
};
