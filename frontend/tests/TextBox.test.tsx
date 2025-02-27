import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom';
import { useState } from 'react';
import TextBox from '../src/components/TextBox'; 


const ControlledTextBox = () => {
  const [value, setValue] = useState('');
  return <TextBox className="textBox" onChange={setValue} input={value} />;
};

describe('TextBox Component', () => {
  it('renders the TextBox component correctly', () => {
    render(
      <MantineProvider>
        <TextBox className="textBox" onChange={() => {}} input="" />
      </MantineProvider>
    );

    const inputElement = screen.getByPlaceholderText('Input Question');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onChange when typing in the input field', async () => {
    render(
      <MantineProvider>
        <ControlledTextBox />
      </MantineProvider>
    );

    const inputElement = screen.getByPlaceholderText('Input Question');
    expect(inputElement).toBeInTheDocument();

    await userEvent.type(inputElement, 'Hello');

    expect(inputElement).toHaveValue('Hello'); 
  });
});
