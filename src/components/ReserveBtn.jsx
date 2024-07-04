"use client"
// import { useState } from "react";
import { Today } from "@mui/icons-material"
// import Modal from "./Modal";
import Link from "next/link"
// import { redirect } from "next/dist/server/api-utils"
import { redirect } from "next/navigation"
import { useMediaQuery } from "@mui/material"

const ReserveBtn = ({ text, bgColor, color }) => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const matches = useMediaQuery('(min-width:600px)');


  return (
    <>
      <Link href="/login#estudiantes" >
      <button
        className='btn btn-rounded btn-reservar'
        style={{
          width: matches ? '189px' : '100px',
          height: matches ? '56px' : '40px',
          // margin: '16px 0',
          backgroundColor: bgColor,
          color: color,
          fontSize: matches ? '16px' : '14px',
          fontWeight: 700,
        }}
      // onClick={handleOpen}
      >
        <Today style={{ margin: '-2px 4px 0 0', fontSize: '15px' }} />
        {text}
      </button>
      </Link>
      {/* <Modal open={open} handleClose={handleClose} /> */}
    </>
  )
}

export default ReserveBtn;
