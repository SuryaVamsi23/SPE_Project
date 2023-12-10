import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginScreen from './LoginScreen';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

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

    // test('Checking Login Button Functionality', async() =>{
    //     const history = createMemoryHistory();
    //     render(
    //         <Router history={history}>
    //             <LoginScreen />
    //         </Router>
    //     );

    //     fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'suryavamsikalaga@gmail.com' } });
    //     fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: '12345678' } });
    //     fireEvent.click(screen.getByText('Proceed'));
    // });

    test('Checking Signup', async() =>{
        render(<LoginScreen />);
        fireEvent.click(screen.getByText('Sign up'));
        const nameElement = screen.getByPlaceholderText('Enter your name');
        fireEvent.change(nameElement, { target: { value: 'Surya' } });
        const emailElement = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(emailElement, { target: { value: 'suryavamsikalaga@gmail.com' } });
        const passwordElement = screen.getByPlaceholderText('Enter your password');
        fireEvent.change(passwordElement, { target: { value: '12345678' } });
        const confirmElement = screen.getByPlaceholderText('Confirm your password');
        fireEvent.change(confirmElement, { target: { value: '12345678' } });
        expect(nameElement.value).toBe('Surya');
        expect(emailElement.value).toBe('suryavamsikalaga@gmail.com');
        expect(passwordElement.value).toBe('12345678');
        expect(confirmElement.value).toBe('12345678');
    });


});
