import React from 'react'
import './BookDes.css'
import {useDispatch, useSelector} from "react-redux"

function BookDes() {
  const data = useSelector(state => state.books.book);
  console.log("data", data);
  return (
<div className='book-description'>
      <h1>Book Description</h1>
        <div className='book-title'>
        <h3>Book Title:-   </h3>
            <h4>{ data["Title"] }</h4>
        </div>
        <div className='book-author'>
            <h3>Book Author:- </h3>
        <h4>{ data["Authors"] }</h4>
        </div>
      <p>{ data["Description"] }</p>
        </div>
  )
}

export default BookDes