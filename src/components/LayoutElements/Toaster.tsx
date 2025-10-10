import { FC, ReactNode } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';



const toaster = (type: 'info' | 'success' | 'error' | 'warn',
  message: string) => {
  return (

    toast[type](message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })

  );
}
export default toaster;