"use client"
import { redirect } from "next/navigation"
import Signout from "../components/Signout"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
// import { POST } from "../api/send/route";
import axios from "axios";
import {sendEmail}  from "../actions/users/send"
import { toast } from "react-toastify";
export default function Home() {
    const Router = useRouter();
    const session =  useSession();

    const [emailverify, setEmailverify] = useState(false);
    const [email, setEmail] = useState(session.data?.user?.email);

    const handleClick = async () => {
        console.log("in the handle click")
        await sendEmail(session.data?.user?.email);
        alert("email sent")
        
        toast.done("email sent")
    }
    return(
        <div className="d-flex place-items center justify-content-center h-screen align-items-center gap-2">
            
            <ToastContainer/>
            
            <div className="">

            <div> username: {session.data?.user?.name} </div>
            <div> email: {session.data?.user?.email} 

                <button 

                    className="bg-black rounded-pill p-2 text-white"

                    onClick={handleClick}>verify my mail
                
                </button>
            
            </div>
            
            <button 
            className="bg-black rounded-pill text-white p-2"
            onClick={()=>Router.push("auth/signout")}>Logout</button>



            </div>

        </div>
    )
}