import React from 'react'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

function SelectBox(props){
    const {label, required, menu= []} = props
    return(
<FormControl variant="outlined" className='selectbox'>
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <Select
        required={required}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label={label}
          {...props}
        >
{menu.map((e,i)=><MenuItem key={i} value={e.value}>{e.name}</MenuItem>)}
        </Select>
      </FormControl>
    )

}
export default SelectBox