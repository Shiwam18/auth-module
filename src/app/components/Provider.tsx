"use client"
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react'

interface ProviderProps {
    children : React.ReactNode | React.ReactNode[];
}

const Provider = ({children}:ProviderProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider
