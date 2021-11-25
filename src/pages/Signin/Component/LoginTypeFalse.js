import React from 'react';
import * as Yup from 'yup';
import { saveLocalData } from 'services/auth/localStorageData';
import { useMutation, useQuery } from 'react-query';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import ErrorService from 'services/formatError/ErrorService';

function LoginTypeFalse() {
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
      type: 'false',
      email: '',
      telephone: '',
      ipAddress: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Must be a valid email').required('Required'),

      telephone: Yup.string().required('Required').min(2, 'atleast 2 digit'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      LoginApiTrue.mutate(values);
    },
  });
  // eslint-disable-next-line
  const FetchIp = useQuery(
    'FetchIp',
    () => userServices.commonGetService(`https://geolocation-db.com/json/`),
    {
      onError: (error) => {},
      onSuccess: (data) => {
        ///alert(data.data.IPv4);

        formik.setFieldValue('ipAddress', data.data.IPv4);
      },
    }
  );
  // FetchIp();
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='relative w-full mb-3'>
          <div class='relative flex w-full flex-wrap items-stretch mb-3'>
            <span class='z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
              <i class='fas fa-envelope'></i>
            </span>
            <input
              type='text'
              placeholder='email'
              class='px-3 py-3 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='email'
              id='email'
              value={formik.values.studentCode}
              onChange={(e) => formik.setFieldValue('email', e.target.value)}
            />

            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-600 text-xs'>{formik.errors.email}</div>
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
              placeholder='telephone'
              className='px-3 py-3 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='telephone'
              id='telephone'
              value={formik.values.password}
              onChange={(e) =>
                formik.setFieldValue('telephone', e.target.value)
              }
            />

            {formik.touched.telephone && formik.errors.telephone ? (
              <div className='text-red-600 text-xs'>
                {formik.errors.telephone}
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

export default LoginTypeFalse;
