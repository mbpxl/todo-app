import { Meta } from "@storybook/react";
import { Task } from "./Task";
import { ReduxStoreProviderDecorator } from "../../stories/ReduxStoreProviderDecorator";

const meta: Meta<typeof Task> = {
  title: "Task component",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        todoListId={"todoListId1"}
        t={{
          id: "1",
          title: "NEXT-JS",
          isDone: false,
        }}
      />
      <Task
        todoListId={"todoListId2"}
        t={{
          id: "2",
          title: "CSS",
          isDone: true,
        }}
      />
    </>
  );
};
