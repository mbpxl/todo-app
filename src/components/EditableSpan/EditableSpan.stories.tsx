import { Meta } from "@storybook/react";
import { EditableSpan } from "./EditableSpan";

const meta: Meta<typeof EditableSpan> = {
  title: "Task component",
  component: EditableSpan,
};

export default meta;

export const EditableSpanBaseExample = () => {
  return (
    <EditableSpan
      title={"Double click on me!"}
      onChangeTitle={(title: string) => alert(title)}
    />
  );
};
