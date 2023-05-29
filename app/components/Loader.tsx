'use client'
import { PuffLoader } from "react-spinners"

export const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
        <PuffLoader color="#f56565" size={100} />
    </div>
  )
}
