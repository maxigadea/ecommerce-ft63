'use client'
import { useAuth } from '@/context/AuthContext';
import { validateFormLogin } from '@/lib/validate';
import { login } from '@/services/authService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';

const LoginView = () => {
  const {setUserData} = useAuth();
  const router = useRouter();
  return (
    <div>
     <h1>Login to X-STORE</h1>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={validateFormLogin}
       onSubmit={async (values) => {
            const response = await login(values)
            const {token, user} = response;
            setUserData({token, user})
            router.push("/")
       }}
     >
       {({errors}) => (
         <Form>
            <label>Email:</label>
           <Field type="email" name="email" placeholder="example@gmail.com" />
           <ErrorMessage name="email" component="div" />
           <label>Password:</label>
           <Field type="password" name="password" placeholder="*********" />
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={errors.password || errors.email ? true : false}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
   </div>
  )
}

export default LoginView