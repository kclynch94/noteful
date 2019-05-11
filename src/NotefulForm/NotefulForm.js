import React from 'react';
import './NotefulForm.css';
import PropTypes from 'prop-types';

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

NotefulForm.propTypes = {
  children: PropTypes.array,
  onSubmit: PropTypes.func,
}