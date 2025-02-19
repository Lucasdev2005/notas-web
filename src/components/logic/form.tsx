'use client'
import { Control, DefaultValues, FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from "react";
import { ZodSchema } from "zod";

interface FormProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>,
    schema: ZodSchema<T>,
    className?: string,
    children: (
        p: {
            register: UseFormRegister<T>, 
            errors: FieldErrors<T>,
            control: Control<T>
        }
    ) => ReactNode,
    defaultValues?: DefaultValues<T> | undefined
}

export default function Form<T extends FieldValues>({ schema, children, onSubmit, className, defaultValues }: FormProps<T>) {

    const { register, handleSubmit, control, formState: { errors } } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <form 
            className={className}
            onSubmit={handleSubmit(onSubmit)}
        >
            {children({ register, errors, control })}
        </form>
    );
}
