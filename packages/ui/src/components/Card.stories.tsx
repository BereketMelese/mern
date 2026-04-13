import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Card className="w-80">
      <Card.Body>
        <p>This is a simple card with content.</p>
      </Card.Body>
    </Card>
  ),
};

export const WithHeader: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <h3 className="text-lg font-semibold">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p>This card has a header section.</p>
      </Card.Body>
    </Card>
  ),
};

export const WithFooter: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <h3 className="text-lg font-semibold">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p>This card has both header and footer sections.</p>
      </Card.Body>
      <Card.Footer>
        <button className="text-blue-600 hover:text-blue-700">
          Learn More
        </button>
      </Card.Footer>
    </Card>
  ),
};

export const CompleteExample: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Card className="w-96">
      <Card.Header>
        <h3 className="text-lg font-semibold">User Profile</h3>
      </Card.Header>
      <Card.Body>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john@example.com
          </p>
          <p>
            <strong>Role:</strong> Admin
          </p>
        </div>
      </Card.Body>
      <Card.Footer className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Edit
        </button>
        <button className="flex-1 bg-gray-200 text-gray-900 py-2 rounded hover:bg-gray-300">
          Cancel
        </button>
      </Card.Footer>
    </Card>
  ),
};
