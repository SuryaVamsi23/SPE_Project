import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ViewGroups from './ViewGroups';

describe('ViewGroups Component', () => {
    test('renders the base component', () => {
        render(<MemoryRouter>
            <ViewGroups />
        </MemoryRouter>);
    });

    test('Rendering view Groups', () => {
        render(<MemoryRouter>
            <ViewGroups />
        </MemoryRouter>);
        const text = screen.getByText('Your Groups');
        expect(text).toBeInTheDocument('Your Groups');
    });

    test('Opening and Closing the popup button', () => {
        render(<MemoryRouter>
            <ViewGroups />
        </MemoryRouter>);
        const floatingButton = screen.getByText('+');
        expect(screen.queryByText('Add New Group')).not.toBeInTheDocument();
        fireEvent.click(floatingButton);
        expect(screen.getByText('Add New Group')).toBeInTheDocument();
        const closeButton = screen.getByText('x');
        fireEvent.click(closeButton);
        expect(screen.queryByText('Add New Group')).not.toBeInTheDocument();
    });

});
