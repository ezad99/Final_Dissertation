import { TextInput } from '@mantine/core';

interface TextBoxProps {
    className: string;
    onChange: (value: string) => void;
    input: string;
    onEnterPress?: () => void; 
}

function TextBox({ className, onChange, input, onEnterPress }: TextBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnterPress) {
      event.preventDefault();
      onEnterPress();
    }
  };

  return (
    <div className={className}>
      <TextInput
        value={input}
        variant="filled"
        size="xs"
        placeholder="Input Question"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default TextBox;
