// src/InputsContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';
import { initialInputsState, inputsReducer } from './Inputs.reducer';

type InputsContextType = {
    state: typeof initialInputsState;
    dispatch: React.Dispatch<{ type: any; payload: any }>;
};

export const InputsContext = createContext<InputsContextType | undefined>(undefined);

export const InputsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(inputsReducer, initialInputsState);

    return (
        <InputsContext.Provider value={{ state, dispatch }}>
            {children}
        </InputsContext.Provider>
    );
};
