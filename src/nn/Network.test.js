import axios from 'axios';
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Network from './Network';

jest.mock('axios'); // Mock axios module// Network.test.js

require = require('esm')(module /*, options*/);
module.exports = require('./Network.test.esm.js').default;




describe('Network component', () => {
  test('renders user data after successful API call', async () => {
    const mockedData = [
      { firstName: 'John', lastName: 'Doe', maidenName: 'Smith', age: 25 },
      { firstName: 'Jane', lastName: 'Smith', maidenName: 'Doe', age: 30 },
    ];

    axios.get.mockResolvedValue({ data: { users: mockedData } });

    render(<Network />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();

      mockedData.forEach((user) => {
        expect(screen.getByText(`FirstName: ${user.firstName}`)).toBeInTheDocument();
        expect(screen.getByText(`LastName: ${user.lastName}`)).toBeInTheDocument();
        expect(screen.getByText(`MaidenName: ${user.maidenName}`)).toBeInTheDocument();
        expect(screen.getByText(`Age: ${user.age}`)).toBeInTheDocument();
      });
    });
  });
});
