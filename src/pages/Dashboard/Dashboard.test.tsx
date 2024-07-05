import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { RegistrationProvider } from '~/contexts/RegistrationsContext';
import { registrationsMock } from '~/mocks/responses/registrations';
import DashboardPage from '.';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.useFakeTimers();

const renderComponent = () =>
  render(
    <RegistrationProvider>
      <DashboardPage />
    </RegistrationProvider>,
  );

describe('Dashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { container } = renderComponent();

    await screen.findAllByTestId('registration-card', { exact: false });

    expect(container).toMatchSnapshot();
  });

  it('should show cards on dashboard with registrations', async () => {
    renderComponent();

    const registrationCards = await screen.findAllByTestId(
      'registration-card',
      { exact: false },
    );

    expect(registrationCards.length).toEqual(registrationsMock.length);
  });

  it('should be able to filter the card by cpf', async () => {
    renderComponent();

    const value = '39487627388';
    const filteredRegistration = registrationsMock.filter(
      (registration) => registration.cpf === value,
    );
    const searchInput = screen.getByPlaceholderText('Digite um CPF válido');
    fireEvent.change(searchInput, { target: { value } });

    jest.advanceTimersByTime(1000);

    const registrationCards = await screen.findAllByTestId(
      'registration-card',
      { exact: false },
    );

    expect(registrationCards.length).toEqual(filteredRegistration.length);
    expect(
      screen.getByText(filteredRegistration[0]?.employeeName),
    ).toBeInTheDocument();
  });

  it('should be able to move to collumn "Reprovado" if click in "Reprovar" and confirm the action', async () => {
    renderComponent();

    const reproveButton = await screen.findByTestId(
      'change-status-modal-reproved-button',
    );

    const registrationsReproved = screen.getAllByTestId(
      'registration-card-REPROVED',
    );

    expect(registrationsReproved.length).toEqual(1);

    fireEvent.click(reproveButton);

    const confirmChangeStatus = await screen.findByRole('button', {
      name: 'Confirmar',
    });

    fireEvent.click(confirmChangeStatus);

    await waitFor(() => {
      const newRegistrationsReproved = screen.getAllByTestId(
        'registration-card-REPROVED',
      );
      expect(newRegistrationsReproved.length).toEqual(2);
    });
  });

  it('should be able to move to collumn "Aprovado" if click in "Aprovar" and confirm the action', async () => {
    renderComponent();

    const approveButton = await screen.findByTestId(
      'change-status-modal-approved-button',
    );

    const registrationsApproved = screen.getAllByTestId(
      'registration-card-APPROVED',
    );

    expect(registrationsApproved.length).toEqual(1);

    fireEvent.click(approveButton);

    const confirmChangeStatus = await screen.findByRole('button', {
      name: 'Confirmar',
    });

    fireEvent.click(confirmChangeStatus);

    await waitFor(() => {
      const newRegistrationsApproved = screen.getAllByTestId(
        'registration-card-APPROVED',
      );
      expect(newRegistrationsApproved.length).toEqual(2);
    });
  });

  it('should be able to move to collumn "Pronto para revisar" if click in "Revisar novamente" and confirm the action', async () => {
    renderComponent();

    const reviewButton = await screen.findAllByTestId(
      'change-status-modal-review-button',
    );

    const registrationsReview = screen.getAllByTestId(
      'registration-card-REVIEW',
    );

    expect(registrationsReview.length).toEqual(1);

    fireEvent.click(reviewButton[0]);

    const confirmChangeStatus = await screen.findByRole('button', {
      name: 'Confirmar',
    });

    fireEvent.click(confirmChangeStatus);

    await waitFor(() => {
      const newRegistrationsReview = screen.getAllByTestId(
        'registration-card-REVIEW',
      );
      expect(newRegistrationsReview.length).toEqual(2);
    });
  });

  it('should be able to remove a registration if trash can button is clicked and confirm the action', async () => {
    renderComponent();

    const registrationCards = await screen.findAllByTestId(
      'registration-card',
      { exact: false },
    );

    expect(registrationCards.length).toEqual(registrationsMock.length);

    const deleteButton = within(registrationCards[0]).getByTestId(
      'delete-button',
    );

    fireEvent.click(deleteButton);

    const removeConfirmationButton = await screen.findByRole('button', {
      name: 'Confirmar',
    });

    fireEvent.click(removeConfirmationButton);

    await waitFor(() => {
      const registrations = screen.getAllByTestId('registration-card', {
        exact: false,
      });
      expect(registrations.length).toEqual(2);
    });
  });
});
