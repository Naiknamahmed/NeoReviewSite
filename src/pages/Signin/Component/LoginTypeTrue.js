import React, {useState} from 'react';
import * as Yup from 'yup';
import { saveLocalData } from 'services/auth/localStorageData';
import { useMutation } from 'react-query';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import ErrorService from 'services/formatError/ErrorService';
import { Navigate } from 'react-router';


function LoginTypeTrue() {

  const [toNext, setToNext] = useState(false)

  const LoginApiTrue = useMutation(
    (LoginApi) => userServices.commonPostService('/loginStudent', LoginApi),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (data) => {
        if (data.data.status === 'Sucessfull') {
          toast.success('Has iniciado sesión con éxito');
          saveLocalData(data.data.data);
          setToNext(true);
        } else {
          toast.error(
            <div dangerouslySetInnerHTML={{ __html: data.data.message }} />
          );
        }
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      type: 'true',
      studentCode: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      studentCode: Yup.string().required('necesario'),
      password: Yup.string().required('necesario'),
    }),
    onSubmit: async (values) => {
      LoginApiTrue.mutate(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='relative w-full mb-2'>
          <div className='relative flex w-full flex-wrap items-stretch mb-3'>
            <span className='z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
            <img alt='studentcode_icon' src={require('assets/img/user.webp').default} className='w-full h-full py-2'/>
            </span>
            <input
              type='text'
              placeholder='Nombre de usuario'
              className='px-3 py-5 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='studentCode'
              id='studentCode'
              style={{lineHeight:'10%'}}
              value={formik.values.studentCode}
              onChange={(e) =>
                formik.setFieldValue('studentCode', e.target.value)
              }
            />
            {formik.touched.studentCode && formik.errors.studentCode ? (
              <div className='text-red-600 text-xs'>
                {formik.errors.studentCode}
              </div>
            ) : null}
          </div>
        </div>

        {/* <div className='relative w-full mb-3'>
          <div class='relative flex w-full flex-wrap items-stretch mb-3'>
            <span class='z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
              <i class='fas fa-user'></i>
            </span>
            <input
              type='text'
              placeholder='studentCode'
              class='px-3 py-3 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='studentCode'
              id='studentCode'
              value={formik.values.studentCode}
              onChange={(e) =>
                formik.setFieldValue('studentCode', e.target.value)
              }
              placeholder='studentCode'
            />

          
          </div>
        </div> */}

        <div className='relative w-full mb-3'>
          {/* <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Password
                    </label> */}
          <div className='relative flex w-full flex-wrap items-stretch mb-3'>
            <span className='z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
            <img alt='password_icon' src={require('assets/img/password.webp').default} className='w-full h-full py-1.5 px-0.5'/>
            </span>
            <input
              type='password'
              placeholder='Contraseña'
              className='px-3 py-5 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded text-sm outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='password'
              id='password'
              style={{lineHeight:'10%'}}
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue('password', e.target.value)}
            />

            {formik.touched.password && formik.errors.password ? (
              <div className='text-red-600 text-xs'>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
        </div>

        <div className='text-center'>
          <button
            className='text-white text-sm font-bold uppercase px-6 py-1 outline-none focus:outline-none  '
            type='submit'
          >
            <img
              alt='...'
              className='w-full h-full mr-1'
              src={require('assets/img/btn2.webp').default}
            />
            {toNext ? <Navigate to="/home" /> : null}
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginTypeTrue;
