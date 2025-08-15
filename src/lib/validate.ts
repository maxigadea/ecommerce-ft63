import { ILoginErrors, ILoginProps } from "@/types";
import * as Yup from 'yup';

export const validateFormLogin = (values: ILoginProps) => {
         const errors: ILoginErrors = {};
         if (!values.email) {
           errors.email = 'Email is required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         } else if (!values.password) {
            errors.password = "Password is required"
         }
         return errors;
}

export const validateFormRegister = Yup.object({
  email: Yup.string()
    .email('El correo electrónico debe ser válido')
    .required('El correo electrónico es obligatorio'),
  
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
  
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es obligatorio'),
  
  address: Yup.string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .required('La dirección es obligatoria'),
  
  phone: Yup.string()
    .required('El teléfono es obligatorio'),
});
