import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const handleSubmit = jest.fn();

        const formik = {
          handleSubmit,
          handleChange: jest.fn().mockImplementation((name) => (value) => {
            formik.values[name] = value;
          }),
          values: {
            username: '',
            password: '',
          },
          touched: {},
          errors: {},
        };
  
        render(<SignInContainer formik={formik} />);
  
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByText('Sign in');
  
        fireEvent.changeText(usernameInput, 'kalle');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(submitButton);
  
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(1);
        });
  
        expect(formik.values.username).toBe('kalle');
        expect(formik.values.password).toBe('password');
    });
  });
});