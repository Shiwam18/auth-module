"use client"
import { useEffect, useState } from 'react';
import  Styles  from './login.module.css';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

export default function LogIn() {

    const router = useRouter();
    const {status} = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: any) => {


    event.preventDefault();
    

    if(email.length===0 || password.length===0) {
      alert("please fill the form!")
      return null;
    }
    try {   
        
        const loginResponse  = await signIn('credentials', {
          email, 
          password,
          redirect:false,
        })
        
        if(!loginResponse || loginResponse.ok!==true){
            alert("invalid credientials")
        }
        else{
            router.refresh();
        }
        
    } catch (error:any) {
        console.log(error.message);
        
    }
    
  };

  useEffect(()=>{
    if(status==="authenticated"){
        router.refresh();
        router.push("/Home");
    }
  }, [status])

  return (
    <div className='bg-grad h-screen d-flex justify-content-center'>
      <form className={`${Styles.formBody} rounded`}>
        <h1 className=' text-white d-flex justify-content-center quicksand-heading pt-5 '>Login</h1>
        <div className="form-group ps-5 pe-5 pt-5">
          <label className='text-white'>Email</label>
          <input type="email" value={email} onChange={(e:any)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group p-5">
        <label className='text-white'>Password</label>
          <input type="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className='pb-5 align-items-center'>
          <div className=' d-flex justify-content-center quicksand-text'><button type="submit" className=" btn text-white bg-black" onClick={handleSubmit}>Submit</button></div>
          <ToastContainer/>
          <div className='d-flex justify-content-center quicksand-text text-white'><a href="/auth/signup" className={Styles.textDecoration}>haven't registered yet? Register.</a></div>
        </div>
      </form> 
    </div>
  );
}

