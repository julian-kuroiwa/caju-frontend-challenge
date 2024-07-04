import { render } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { RegistrationProvider } from '~/contexts/RegistrationsContext';
import { registrationsMock } from '~/mocks/responses/registrations';
import DashboardPage from '.';

jest.mock('axios');
const mAxios = axios as jest.MockedFunction<typeof axios>;

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Dashboard', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it('should match snapshot', () => {
    const mockResponse = {
      data: registrationsMock,
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;
    mAxios.mockResolvedValue(mockResponse);
    const { container } = render(
      <RegistrationProvider>
        <DashboardPage />
      </RegistrationProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
