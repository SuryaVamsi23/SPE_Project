import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import GroupCard from './GroupCard';

describe('GroupsCards Component', () => {
    test('renders the base component', () => {
        render(<MemoryRouter>
            <GroupCard groupName="Goa Trip" members="6" cost="25000" />
        </MemoryRouter>);
    });

    test('Renders GroupCard component with correct props', () => {
        const props = {
            groupName: 'Test Group',
            members: 5,
            cost: 100,
        };
        render(<MemoryRouter>
            <GroupCard {...props} />
        </MemoryRouter>);
        expect(screen.getByText(`Group Name: ${props.groupName}`)).toBeInTheDocument();
        expect(screen.getByText(`Members: ${props.members}`)).toBeInTheDocument();
        expect(screen.getByText(`Total Expense: ${props.cost}`)).toBeInTheDocument();
        const viewMoreButton = screen.getByText('View More');
        expect(viewMoreButton).toBeInTheDocument();
    });

});