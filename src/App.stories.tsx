import { Meta } from "@storybook/react";
import App from "./App";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

const meta: Meta<typeof App> = {
  title: "App component",
  component: App,
  decorators: [ReduxStoreProviderDecorator],
};

export const AppBaseExample = () => <App />;

export default meta;
