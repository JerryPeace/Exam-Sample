import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent, cleanup, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '@@pages/index';

const mockData = {
  statusCode: 200,
  message: 'Successfully retrieved the contacts list',
  data: [
    {
      id: 1,
      first_name: 'Luke',
      last_name: 'Skywalker',
      job: 'Jedi knight',
      description: 'Son of Anakin Skywalker',
    },
  ],
};

describe('Home Page with mocked getAllContacts', () => {
  beforeAll(() => {
    jest.mock('@@src/apis/clients/contactAPI', () => ({
      ...jest.requireActual('@@src/apis/clients/contactAPI'),
      getAllContacts: jest.fn().mockResolvedValue(mockData),
    }));
  });

  beforeEach(() => {
    const queryClient = new QueryClient();
    act(() => {
      render(
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      );
    });
  });
  afterEach(cleanup);

  test('renders contact names from API', async () => {
    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(), {
      timeout: 5000,
    });
    mockData.data.forEach((contact) => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      expect(screen.getByText(fullName)).toBeInTheDocument();
    });
  });

  test('"Add Contact" button functionality', async () => {
    const addButton = screen.getByText('Add Contact');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    const drawerHeader = await waitFor(() => screen.getByText('Create User Contact'), {
      timeout: 5000,
    });
    expect(drawerHeader).toBeInTheDocument();
  });

  test('sorting functionality', () => {
    const sortButton = screen.getByLabelText('sorting data');
    expect(sortButton).toBeInTheDocument();

    fireEvent.click(sortButton);
  });
});
