import { render, screen } from '@testing-library/react';
import App from './components/App';
import Todo from './components/Todo';


test('renders TODO app generally', () => {
  render(<App />);
  expect(screen.getByText(/TODOS/i)).toBeInTheDocument();

  expect(screen.getByText(/What needs to be done?/i)).toBeInTheDocument();

  expect(screen.getByText(/items left/i)).toBeInTheDocument();

  expect(screen.getByText(/All/i)).toBeInTheDocument();
  expect(screen.getByText(/Active/i)).toBeInTheDocument();
  expect(screen.getByText('Completed')).toBeInTheDocument();

  expect(screen.getByText(/CLEAR COMPLETED/i)).toBeInTheDocument();
});

test('renders todo component', () => {
  const testTask = {
      id: 0,
      complete: false,
      content: "Test text"
  }
  render(<Todo task={ testTask } />);
  expect(screen.getByText('Test text')).toBeInTheDocument();

})