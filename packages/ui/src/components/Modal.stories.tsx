import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalStory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Welcome">
        <p className="text-gray-600 mb-4">This is a sample modal dialog.</p>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => undefined,
    children: null,
  },
  render: () => <ModalStory />,
};

function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Delete"
      >
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex gap-2">
          <Button variant="danger" onClick={() => setIsOpen(false)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export const ConfirmDialog: Story = {
  args: {
    isOpen: false,
    onClose: () => undefined,
    children: null,
  },
  render: () => <ConfirmModal />,
};

function LargeModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Large Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Large Dialog"
        size="lg"
      >
        <p className="text-gray-600 mb-4">
          This is a larger modal with more space for content.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded">Content 1</div>
          <div className="bg-gray-100 p-4 rounded">Content 2</div>
          <div className="bg-gray-100 p-4 rounded">Content 3</div>
          <div className="bg-gray-100 p-4 rounded">Content 4</div>
        </div>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </Modal>
    </>
  );
}

export const LargeDialog: Story = {
  args: {
    isOpen: false,
    onClose: () => undefined,
    children: null,
  },
  render: () => <LargeModal />,
};
