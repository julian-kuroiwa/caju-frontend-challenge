import { ReactNode, createContext, useEffect, useState } from 'react';
import request from '~/api';

export interface Registration {
  admissionDate: string
  cpf: string
  email: string
  employeeName: string
  id: string
  status: string
}

interface RegistrationContextProps {
  children: ReactNode
}

interface HandleStatus {
  registration: Registration
  status: string
}

type RegistrationContextType = {
  registrations: Registration[]
  handleStatus: (props: HandleStatus) => void;
  handleRemove: (props: string) => void;
}

export const RegistrationContext = createContext({} as RegistrationContextType);

const RegistrationProvider = ({ children }: RegistrationContextProps) => {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  const getRegistrations = async () => {
    try {
      const {data} = await request.get('/registrations')

      setRegistrations(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRegistrations()
  }, [])

  const handleRemove = async (registrationId: string) => {
    try {
      await request.delete(`/registrations/${registrationId}`)

      setLoading(true)
    } catch (err) {
      console.error(err)
    }
  };

  const handleStatus = async ({registration, status}: HandleStatus) => {
    try {
      const {data: registrationUpdated} = await request.put(`/registrations/${registration.id}`, {
        ...registration,
        status
      })

      const registrationsUpdated = registrations.map((currentRegistration) =>
        currentRegistration.id === registration.id ? registrationUpdated : currentRegistration
      )

      setRegistrations(registrationsUpdated)
    } catch (err) {
      console.error(err)
    }
  };

 return (
   <RegistrationContext.Provider value={{ registrations, handleStatus, handleRemove }}>
     {children}
   </RegistrationContext.Provider>
 );
};

export { RegistrationProvider };