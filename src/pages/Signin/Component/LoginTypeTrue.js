import React from 'react';
import * as Yup from 'yup';
import {
  localStorageData,
  saveLocalData,
} from 'services/auth/localStorageData';
import { useMutation, useQuery } from 'react-query';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import ErrorService from 'services/formatError/ErrorService';
function LoginTypeTrue() {
  const LoginApiTrue = useMutation(
    (LoginApi) => userServices.commonPostService('/loginStudent', LoginApi),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (data) => {
        saveLocalData(data.data);
        toast.success('Login successfully');
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
      studentCode: Yup.string().required('Required'),

      password: Yup.string().required('Required').min(2, 'atleast 2 digit'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      LoginApiTrue.mutate(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='relative w-full mb-3'>
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
              className='input-styl mx-2 h-12 px-2 py-2 w-20'
              placeholder='studentCode'
            />

            {formik.touched.studentCode && formik.errors.studentCode ? (
              <div className='text-red-600 text-xs'>
                {formik.errors.studentCode}
              </div>
            ) : null}
          </div>
        </div>

        <div className='relative w-full mb-3'>
          {/* <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Password
                    </label> */}
          <div class='relative flex w-full flex-wrap items-stretch mb-3'>
            <span class='z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
              <i class='fas fa-phone'></i>
            </span>
            <input
              type='text'
              placeholder='Telefono'
              className='px-3 py-3 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='password'
              id='password'
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue('password', e.target.value)}
              className='input-styl mx-2 h-12 px-2 py-2 w-20'
              placeholder='password'
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
            className='text-white  text-sm font-bold uppercase px-6 py-3  outline-none focus:outline-none  '
            type='submit'
          >
            <img
              alt='...'
              className='w-full h-full mr-1'
              src={require('assets/img/Entrar.png').default}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginTypeTrue;
