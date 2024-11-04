import { TextInput } from '@mantine/core';

interface TextBoxProps {
    onChange: (value: string) => void
    input: string
}

function TextBox({onChange, input}: TextBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    onChange(newValue);
  };

  return (
    <TextInput
      value={input}
      variant="filled"
      size="md"
      // error="Invalid Input"
      placeholder="Input Question"
      onChange={handleChange}
    />
  );
}

export default TextBox;