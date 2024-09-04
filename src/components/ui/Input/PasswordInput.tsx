import React, { useState } from 'react';
import { Input, InputProps } from './Input';

export function PasswordInput(props: InputProps) {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <Input {...props} type={showPassword ? 'text' : 'password'} onShowIcon={() => setShowPassword((oldVal) => !oldVal)} />
    )
}