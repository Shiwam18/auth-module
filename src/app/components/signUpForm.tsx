"use client"
import { useEffect, useRef, useState } from 'react';
import  Styles  from './signUpform.module.css';
import { signup } from '../../../public/actions';
import Router, { redirect, useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { log } from 'console';
import Image from 'next/image';
import img from '@/app/public/google.png';
import img2 from "@/app/public/github.png";
import {GENDER}  from "@prisma/client";

export default function SignUp() {
  const formRef = useRef(null);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState("0");
  const {status} =  useSession();

  useEffect(()=>{
    if(status==="authenticated"){
        router.refresh();
        router.push("/Home");
    }
  }, [status])


  const handleSubmit = async (event: any) => {
    
    
    
    if(email.length===0){
      alert("please provide email")
      return null;
    }

    if(!phone){
      alert("please enter phone number")
      return null;
    }

    if(gender==="0") {
      alert("Please select gender");
      return null;
    }

    if(password.length===0){
      alert("please provide password");
      return null;
    }

    if(password!=confirmPassword){
      alert("password mismatch");
      setPassword("");
      setConfirmPassword("");
      return null;
    }


    const data = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phone:phone,
      gender: gender,

    };
    
    
    const response = await signup({data});
    if(response?.status===200){
      router.push("/auth/login")
    }
    else{
      router.refresh();
    }
  };

  return (
    <div className='bg-grad h-screen d-flex justify-content-center'>
      <div className={`${Styles.formBody} rounded p-3 `}>
      <h1 className=' text-white d-flex justify-content-center quicksand-heading pt-5 '>SignUp</h1>
        <form action={handleSubmit}>
          
          <div className="form-group py-5">
            <label className='text-white'>Name</label>
            <input type="name" value={name} onChange={(e:any)=>setName(e.target.value)} className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter your name"/>
          </div>
          <div className="form-group pb-5">
          <label className='text-white'>Email</label>
            <input type="email" value={email} onChange={(e:any)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>

          <div className='form-group d-flex gap-4 pb-5'>
            <div>
              <label className='text-white'>Phone</label>
              <input type="number" value={phone} onChange={(e:any)=>setPhone(e.target.value)} className="form-control" id="exampleInputphone" placeholder='Enter Phone No'/>
            </div>
            <div>
              <label className='text-white'>Gender</label><span className='text-danger'> *</span>
              <select name="gender" value={gender} onChange={(e:any)=>setGender(e.target.value)} className="form-control" id="exampleInputphone"> 
              <option value="0">Select Gender</option>
              {Object.keys(GENDER).map(value=>{ 
                return(<option value={value}>{value}</option>)
                
              })}
              
              </select>
            </div>
          </div>

          <div className="form-group pb-5">
          <label className='text-white'>Password</label>
            <input type="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div className="form-group pb-5">
          <label className='text-white'>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e:any)=>setConfirmPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Re-enter password"/>
          </div>
          <div className='pb-3 align-items-center'>
            <div className=' d-flex justify-content-center quicksand-text'><button type="submit" className=" btn text-white bg-black" >Submit</button></div>
            <div className='d-flex justify-content-center quicksand-text text-white'><a href="/auth/login" className={Styles.textDecoration}>already have an account? Log-in.</a></div>
          </div>


        </form> 
        <br />
        <p className='text-white d-flex justify-content-center'>or signIn with</p> 
        <div className='d-flex justify-content-between '>
        <button onClick={()=>{signIn("google"); }} className='border-0 rounded-pill'> <Image src={img} alt='goole-logo' width={50} height={50}/> Google </button>
        <button onClick={()=>{signIn("github"); }} className='border-0 rounded-pill'> <Image src={img2} alt='github-log' width={50} height={50}/> Github</button>
        </div>
      </div>
    </div>
  );
}







{/* <form className='container'>
  <div className="form-group">
   
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form> */}