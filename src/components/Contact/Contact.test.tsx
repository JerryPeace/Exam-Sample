import { render, screen, fireEvent } from '@testing-library/react';
import Contact from './index';

describe('Contact component', () => {
  test('renders without crashing', () => {
    render(
      <Contact
        name="John Doe"
        job="Developer"
        description="Test description"
        onEdited={() => {}}
        onRemoved={() => {}}
      />
    );
  });

  test('displays the correct name, job, and description', () => {
    render(
      <Contact
        name="John Doe"
        job="Developer"
        description="Test description"
        onEdited={() => {}}
        onRemoved={() => {}}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Job: Developer')).toBeInTheDocument();
    expect(screen.getByText('Description: Test description')).toBeInTheDocument();
  });

  test('calls the correct functions when buttons are clicked', () => {
    const onEditedMock = jest.fn();
    const onRemovedMock = jest.fn();

    render(
      <Contact
        name="John Doe"
        job="Developer"
        description="Test description"
        onEdited={onEditedMock}
        onRemoved={onRemovedMock}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(onEditedMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Delete'));
    expect(onRemovedMock).toHaveBeenCalledTimes(1);
  });
});
