import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginScreen from './LoginScreen';
import { MemoryRouter } from 'react-router-dom';

describe('LoginScreen Component', () => {
    test('renders the base component', () => {
        render(<LoginScreen />);
      });

      test('Handling email input in login', () => {
        render(<LoginScreen />);
        const inputElement = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(inputElement, { target: { value: 'suryavamsikalaga@gmail.com' } });
        expect(inputElement.value).toBe('suryavamsikalaga@gmail.com');
      });

      test('Handling password input in login', () => {
        render(<LoginScreen />);
        const inputElement = screen.getByPlaceholderText('Enter your password');
        fireEvent.change(inputElement, { target: { value: '12345678' } });
        expect(inputElement.value).toBe('12345678');
      });

    //   test('Checking Login Button Functionality', () => {
    //     render(
    //         <MemoryRouter>
    //           <LoginScreen />
    //         </MemoryRouter>
    //       );

    //       fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'suryavamsikalaga@gmail.com' } });
    //       fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: '12345678' } });
    //       fireEvent.click(screen.getByText('Proceed'));
    //       expect(screen.queryByText('Login')).not.toBeInTheDocument(); 
    //   });

});
