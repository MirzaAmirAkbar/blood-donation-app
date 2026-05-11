import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom';

// Mock navigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockedNavigate.mockReset();
    global.fetch = jest.fn();
  });

  it('renders email and password inputs', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('submits the form and navigates on success', async () => {
    const mockUser = { email: 'test@example.com' };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ message: 'Login successful', user: mockUser }),
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });

    // Also confirm localStorage is updated
    expect(localStorage.getItem('email')).toBe('test@example.com');
  });

  it('shows alert on failed login', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ message: 'Invalid credentials' }),
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    });
  });
});
