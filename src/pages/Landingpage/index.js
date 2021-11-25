import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  let navigate = useNavigate();
  return (
    <div>
      <a onClick={() => navigate('/home')} className='text-red-500'>
        Example page
      </a>
      <a onClick={() => toast('Welcome!')}>Notify!</a>
    </div>
  );
}

export default LandingPage;
