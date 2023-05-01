import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
} from 'react';

interface SampleProviderProps {
  children: ReactNode;
}

interface SampleContextType {
  sampleValue: string;
  setSampleValue: Dispatch<SetStateAction<string>>;
}

export const SampleContext = createContext<SampleContextType>({
  sampleValue: '',
  setSampleValue: () => {},
});

export const SampleProvider = ({ children }: SampleProviderProps) => {
  const [sampleValue, setSampleValue] = useState('');
  return (
    <SampleContext.Provider value={{ sampleValue, setSampleValue }}>
      {children}
    </SampleContext.Provider>
  );
};
