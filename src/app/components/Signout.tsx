"use client"

import credential from 'credential';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import React, { useEffect } from 'react'

const Signout = () => {
    
    useEffect(()=>{
        signOut({
            callbackUrl: "/auth/login",
            redirect:true
        });
        
    }, [])
    
  return null;
}

export default Signout;
