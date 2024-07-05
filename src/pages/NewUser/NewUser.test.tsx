import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegistrationProvider } from '~/contexts/RegistrationsContext';
import NewUserPage from '.';

const pushMock = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: pushMock,
  }),
}));

const renderComponent = () =>
  render(
    <RegistrationProvider>
      <NewUserPage />
    </RegistrationProvider>,
  );

describe('NewUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('should be able to submit the form if its fulfilled', async () => {
    renderComponent();

    const user = userEvent.setup();

    const employeeNameField = screen.getByLabelText('Nome');
    await waitFor(() => user.type(employeeNameField, 'teste teste'));

    const emailField = screen.getByLabelText('Email');
    await waitFor(() => user.type(emailField, 'teste@gmail.com'));

    const cpfField = screen.getByLabelText('CPF');
    await waitFor(() => user.type(cpfField, '63788799072'));

    const admissionDateField = screen.getByLabelText('Data de admissão');
    fireEvent.change(admissionDateField, { target: { value: '2020-05-12' } });

    const submitButton = screen.getByText('Cadastrar');
    fireEvent.click(submitButton);

    await waitFor(() => expect(pushMock).toHaveBeenCalledTimes(1));
  });

  it('should show "Nome inválido" if name is not matching the requirements', async () => {
    renderComponent();

    const user = userEvent.setup();

    const employeeNameField = screen.getByLabelText('Nome');
    await waitFor(() => user.type(employeeNameField, 'te'));

    const errorMessage = screen.getByText('Nome inválido');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should show "E-mail é inválido" if email is not matching the requirements', async () => {
    renderComponent();

    const user = userEvent.setup();

    const emailField = screen.getByLabelText('Email');
    await waitFor(() => user.type(emailField, 'tedsfew'));

    const errorMessage = screen.getByText('E-mail é inválido');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should show "CPF é inválido" if CPF is not matching the requirements', async () => {
    renderComponent();

    const user = userEvent.setup();

    const cpfField = screen.getByLabelText('CPF');
    await waitFor(() => user.type(cpfField, '1234'));

    const errorMessage = screen.getByText('CPF é inválido');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should show "Data de admissão é obrigatório" if date is not filled', async () => {
    renderComponent();

    const submitButton = screen.getByText('Cadastrar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Data de admissão é obrigatório');
      expect(errorMessage).toBeInTheDocument();
    })
  });
});
