import { render, screen } from '@testing-library/react';
import App from './components/App';

test('renders TODO app', () => {
  render(<App />);
  expect(screen.getByText(/TODOS/i)).toBeInTheDocument();

  expect(screen.getByText(/What needs to be done?/i)).toBeInTheDocument();

  expect(screen.getByText(/items left/i)).toBeInTheDocument();

  expect(screen.getByText(/All/i)).toBeInTheDocument();
  expect(screen.getByText(/Active/i)).toBeInTheDocument();
  expect(screen.getByText('Completed')).toBeInTheDocument();

  expect(screen.getByText(/CLEAR COMPLETED/i)).toBeInTheDocument();
});
