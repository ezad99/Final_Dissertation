import { TextInput } from '@mantine/core';

interface TextBoxProps {
    className: string
    onChange: (value: string) => void
    input: string
}

function TextBox({className, onChange, input}: TextBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    onChange(newValue);
  };

  return (
    <div className={className}>
      <TextInput
        value={input}
        variant="filled"
        size="md"
        // error="Invalid Input"
        placeholder="Input Question"
        onChange={handleChange}
      />
    </div>
  );
}

export default TextBox;