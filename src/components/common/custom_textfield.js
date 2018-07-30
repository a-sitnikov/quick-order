import React from 'react'
import { TextField } from '@material-ui/core';

export default (props) => {
  return <TextField {...props} onChange={props.input.onChange} value={props.input.value}/>
}