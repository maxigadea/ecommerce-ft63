'use client'
import { validateFormRegister } from '@/lib/validate';
import { register } from '@/services/authService';
// import { validateFormRegister } from '@/lib/validate';
 import { Formik, Form, Field, ErrorMessage } from 'formik';

const RegisterView = () => {
  return (
    <div>
     <h1>Register to X-STORE</h1>
     <Formik
       initialValues={{ email: '', password: '', name: '', address: '', phone: '' }}
       validationSchema={validateFormRegister}
       onSubmit={async (values) => {
            await register(values)
       }}
     >
       {() => (
         <Form>
            <label>Email:</label>
           <Field type="email" name="email" placeholder="example@gmail.com" />
           <ErrorMessage name="email" component="div" />
           <label>Password:</label>
           <Field type="password" name="password" placeholder="*********" />
           <ErrorMessage name="password" component="div" />
           <label>Name:</label>
           <Field type="text" name="name" placeholder="John Doe" />
           <ErrorMessage name="name" component="div" />
           <label>Address:</label>
           <Field type="text" name="address" placeholder="Calle 13" />
           <ErrorMessage name="address" component="div" />
           <label>Phone:</label>
           <Field type="text" name="phone" placeholder="011-234567" />
           <ErrorMessage name="phone" component="div" />
           <button type="submit" >
             Submit
           </button>
         </Form>
       )}
     </Formik>
   </div>
  )
}

export default RegisterView