import React from 'react'
import './NotefulForm.css'

export default function NotefulForm(props) {
  const { ...otherProps } = props
  return (
    <form
      className='Noteful-form'
      action='#'
      {...otherProps}
    />
  )
}