import type { Meta, StoryObj } from "@storybook/react";
import { Login } from "../components/Login";

const meta: Meta<typeof Login> = {
  title: "Components/Login",
  component: Login,
  args: {
    onSubmit: (data) => console.log("Login:", data),
  },
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {};
export const Loading: Story = {
  args: {
    loading: true,
  },
};
export const ErrorState: Story = {
  args: {
    error: "Credenciales inválidas",
  },
};
