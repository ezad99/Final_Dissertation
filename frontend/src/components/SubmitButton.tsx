import { Button } from '@mantine/core';

// Reusable Button Component
const SubmitButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      className="button"
      variant="filled"
      color="rgb(145, 0, 207)"
      radius="md"
      size="2md"
      onClick={onClick}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
