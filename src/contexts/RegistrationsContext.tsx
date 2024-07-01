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

type RegistrationContextType = {
  registrations: Registration[]
}

export const RegistrationContext = createContext({} as RegistrationContextType);

const RegistrationProvider = ({ children }: RegistrationContextProps) => {
  const [registrations, setRegistrations] = useState<Registration[]>([])

  const getRegistrations = async () => {
    try {
      const {data} = await request.get('/registrations')

      setRegistrations(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getRegistrations()
  }, [])

 return (
   <RegistrationContext.Provider value={{ registrations }}>
     {children}
   </RegistrationContext.Provider>
 );
};

export { RegistrationProvider };