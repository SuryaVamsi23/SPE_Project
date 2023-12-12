import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GroupPage from './GroupsPage';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';


describe('Group Page Component',()=>{
    test('renders the base component', () => {
        render(<MemoryRouter>
            <GroupPage />
            </MemoryRouter>);
    });    
})