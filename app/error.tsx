'use client'

import { FC, useEffect } from "react"

interface ErrorStateProps{
    error: Error
}
import React from 'react'
import { EmptyState } from "./components/EmptyState"

const ErrorState:FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
      console.error(error)
    }, [error])
    return (
        <EmptyState 
            title="Something went wrong"
            subtitle="Please try again later"
        />
    )
}

export default ErrorState
