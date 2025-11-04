import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "../components/Navbar";
import type { NavbarProps } from "../components/Navbar";

const meta: Meta<NavbarProps> = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    appName: "Hotel Manager Pro",
    onLogin: () => console.log("Action: Login clicked"),
    onLogout: () => console.log("Action: Logout clicked"),
    onNavigateToProfile: () => console.log("Action: Navigate to Profile"),
  },
};

export default meta;

type Story = StoryObj<NavbarProps>;

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    userName: undefined,
  },
};

export const LoggedInUser: Story = {
  args: {
    isLoggedIn: true,
    userName: "Andrés",
  },
};

export const LoggedInWithLongName: Story = {
  args: {
    isLoggedIn: true,
    userName: "María Fernanda Guzmán de los Santos",
  },
};
