import { useContext } from "react"
import { ConfirmationContext } from "./ConfirmationProvider";


export function useConfirm() {
    const ctx = useContext(ConfirmationContext);
    if (ctx === null) {
        throw new Error(
            'useConfirm() can only be used on the descendants of ConfirmationProvider',
        );
    }
    return ctx;
}