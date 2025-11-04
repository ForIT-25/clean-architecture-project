import type { Meta, StoryObj } from "@storybook/react";
import { Register, type RegisterData } from "../components/Register";

const meta: Meta<typeof Register> = {
  title: "Components/Register",
  component: Register,
  args: {
    onSubmit: (data: RegisterData) => console.log("Register:", data),
  },
};

export default meta;

type Story = StoryObj<typeof Register>;

export const Default: Story = {};
export const Loading: Story = {
  args: {
    loading: true,
  },
};
export const ErrorState: Story = {
  args: {
    error: "El email ya está registrado",
  },
};
