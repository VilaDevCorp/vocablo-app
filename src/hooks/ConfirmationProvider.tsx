import { createContext, ReactNode, useState } from "react";


interface ConfirmationContext {
    visible: boolean;
    onConfirm?: () => void;
    message?: string;
    showConfirmationModal: (message: string, confirm: () => void) => void;
    closeConfirmationModal: () => void;
}

export const ConfirmationContext = createContext<ConfirmationContext>({} as ConfirmationContext);


export function ConfirmationProvider({ children }: { children: ReactNode }) {

    const [visible, setVisible] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [icon, setIcon] = useState<ReactNode | undefined>(undefined)
    const [onConfirm, setOnConfirm] = useState<() => void>()


    const showConfirmationModal = (message: string, confirm: () => void) => {
        setMessage(message)
        setOnConfirm(() => () => { confirm(); closeConfirmationModal() })
        setVisible(true)
    }


    const closeConfirmationModal = () => {
        setVisible(false)
        setIcon(undefined)
        setMessage('')
        setOnConfirm(undefined)
    }

    const value: ConfirmationContext = {
        visible,
        message,
        onConfirm,
        showConfirmationModal,
        closeConfirmationModal
    }


    return (<ConfirmationContext.Provider
        value={value}>
        {children}
    </ConfirmationContext.Provider>
    )
}