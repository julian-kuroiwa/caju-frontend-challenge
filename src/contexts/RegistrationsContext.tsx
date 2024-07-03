import { ReactNode, createContext, useEffect, useState } from 'react';
import request from '~/api';
import { Registration } from '~/types/registration';

interface RegistrationContextProps {
  children: ReactNode;
}

interface HandleStatus {
  registration: Registration;
  status: string;
}

type RegistrationContextType = {
  registrations: Registration[];
  getRegistrations: (props: string) => void;
  addNewRegistration: (props: Registration) => void;
  handleStatus: (props: HandleStatus) => void;
  handleRemove: (props: string) => void;
  loading: boolean;
  loadContent: () => void;
};

export const RegistrationContext = createContext({} as RegistrationContextType);

const RegistrationProvider = ({ children }: RegistrationContextProps) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);

  const addNewRegistration = async (newRegistration: Registration) => {
    setLoading(true);

    try {
      await request.post('/registrations', newRegistration);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRegistrations = async (filter: string) => {
    setRefetch(false);

    try {
      const { data } = await request.get(`/registrations?${filter}`);

      setRegistrations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refetch) getRegistrations('');
  }, [refetch]);

  const handleRemove = async (registrationId: string) => {
    setLoading(true);

    try {
      await request.delete(`/registrations/${registrationId}`);

      const registrationsUpdated = registrations.filter(
        (currentRegistration) => registrationId !== currentRegistration.id,
      );

      setRegistrations(registrationsUpdated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async ({ registration, status }: HandleStatus) => {
    setLoading(true);

    try {
      const { data: registrationUpdated } = await request.put(
        `/registrations/${registration.id}`,
        {
          ...registration,
          status,
        },
      );

      const registrationsUpdated = registrations.map((currentRegistration) =>
        currentRegistration.id === registration.id
          ? registrationUpdated
          : currentRegistration,
      );

      setRegistrations(registrationsUpdated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
      }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export { RegistrationProvider };
