import { ReactNode, createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import request from '~/api';
import SpinnerLoadingScreen from '~/components/Loading';
import { initialValues } from '~/constants/registrations';
import {
  NewRegistration,
  Registration,
  StatusType,
} from '~/types/registration';

interface RegistrationContextProps {
  children: ReactNode;
}

interface RegistrationContextType {
  registrations: Registration[];
  getRegistrations: (props: string) => void;
  addNewRegistration: (props: NewRegistration) => void;
  handleStatus: () => void;
  handleRemove: () => void;
  loading: boolean;
  loadContent: () => void;
  setRegistrationNewStatus: (value: keyof typeof StatusType) => void;
  setCurrentRegistration: (value: Registration) => void;
  currentRegistration: Registration;
  registrationNewStatus: keyof typeof StatusType;
}

export const RegistrationContext = createContext({} as RegistrationContextType);
export const useRegistrationContext = () => useContext(RegistrationContext);

const RegistrationProvider = ({ children }: RegistrationContextProps) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [_, setRefetch] = useState(false);
  const [registrationNewStatus, setRegistrationNewStatus] = useState<
    keyof typeof StatusType
  >(StatusType.REVIEW);
  const [currentRegistration, setCurrentRegistration] =
    useState<Registration>(initialValues);

  const delayTurnOffLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const addNewRegistration = async (newRegistration: NewRegistration) => {
    setLoading(true);

    try {
      await request.post('/registrations', newRegistration);
      toast('Cadastro realizado com sucesso!', { type: 'success' });
    } catch (err) {
      console.error(err);
      toast('Erro ao tentar criar um novo cadastro. Tente novamente.', {
        type: 'error',
      });
    } finally {
      delayTurnOffLoading();
    }
  };

  const getRegistrations = async (filter: string) => {
    setRefetch(false);
    setLoading(true);

    try {
      const { data } = await request.get(`/registrations?${filter}`);

      setRegistrations(data);
      if (filter) {
        toast('Filtro realizado com sucesso!', { type: 'success' });

        return;
      }

      toast('Registros carregados com sucesso!', { type: 'success' });
    } catch (err) {
      console.error(err);
      toast('Erro ao tentar filtrar por CPF. Tente novamente.', {
        type: 'error',
      });
    } finally {
      delayTurnOffLoading();
    }
  };

  const handleRemove = async () => {
    setLoading(true);

    try {
      await request.delete(`/registrations/${currentRegistration?.id}`);

      const registrationsUpdated = registrations.filter(
        (registrationFiltered) =>
          currentRegistration?.id !== registrationFiltered.id,
      );

      setRegistrations(registrationsUpdated);
      toast(
        `Registro de ${currentRegistration.employeeName} removido com sucesso!`,
        { type: 'success' },
      );
    } catch (err) {
      console.error(err);
      toast(
        `Erro ao tentar excluir o registro de ${currentRegistration.employeeName}. Tente novamente mais tarde.`,
        {
          type: 'error',
        },
      );
    } finally {
      delayTurnOffLoading();
    }
  };

  const handleStatus = async () => {
    setLoading(true);

    try {
      const { data: registrationUpdated } = await request.put(
        `/registrations/${currentRegistration?.id}`,
        {
          ...currentRegistration,
          status: registrationNewStatus,
        },
      );

      const registrationsUpdated = registrations.map((registrationMapped) =>
        registrationMapped.id === currentRegistration?.id
          ? registrationUpdated
          : registrationMapped,
      );

      setRegistrations(registrationsUpdated);
      toast(
        `Status alterado de ${currentRegistration.employeeName} com sucesso!`,
        { type: 'success' },
      );
    } catch (err) {
      console.error(err);
      toast(
        `Erro ao tentar alterar o status de ${currentRegistration.employeeName} . Tente novamente mais tarde.`,
        {
          type: 'error',
        },
      );
    } finally {
      delayTurnOffLoading();
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        getRegistrations,
        registrations,
        handleStatus,
        handleRemove,
        loading,
        loadContent: () => setRefetch(true),
        addNewRegistration,
        setRegistrationNewStatus,
        registrationNewStatus,
        setCurrentRegistration,
        currentRegistration,
      }}>
      {children}
      <SpinnerLoadingScreen loading={loading} />
    </RegistrationContext.Provider>
  );
};

export { RegistrationProvider };
