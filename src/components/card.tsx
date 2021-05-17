import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Button from './button'
import Typography from './typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Checkbox from './checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import { Tooltip } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

function Cards(props){
  const { title, 
    subHeader,
     imgUrl,
     pingActionsLabel,
     pingActionClick,
       mediaTitle,
        avatar, 
        action, 
        onShowIconClick,
          linkLabel,
           linkLabelLink, 
           checkbox, 
           onCheckBoxClick, 
           checkBoxId, 
           checked, 
           deleteIcon, 
           onRemoveClick,
           myCartIcon,
           onMyCartIconLebel} = props
  const onShowIconClicks = (e)=> {
    e.stopPropagation()
    onShowIconClick()
  }
   const actionsClick = (e)=> {
    e.stopPropagation()
    pingActionClick()
   }
    return(<Fragment>
<Card elevation={2} square className='card'  >
    <CardHeader 
    avatar={
        <Avatar aria-label="recipe" className='avatar'>
          {avatar}
        </Avatar>
      }
    title={ title}
    subheader={<Typography variant='caption' label={subHeader}/>}
    action={
    <Fragment>
        { action  && ( 
          <Tooltip title='Update the system' placement='top'>
            <IconButton size="small" onClick={onShowIconClicks}>
              <EditIcon fontSize='small' />
            </IconButton>
          </Tooltip>)}
          {checkbox &&
          ( <Checkbox 
            id={ checkBoxId}
              checked={checked || false}
              onChange={onCheckBoxClick}
          />)}
          {deleteIcon && (
            <Tooltip title='Remove the system' placement='top'>
              <IconButton size="small" onClick={onRemoveClick}>
                <DeleteIcon fontSize='small' />
              </IconButton>
          </Tooltip>
          )}
          {myCartIcon && (
            <Tooltip title='My Cart' placement='top'>
            <IconButton size="small" href={onMyCartIconLebel}>
                <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
          )}
    </Fragment>
      }
    />
    {mediaTitle && <CardMedia
className='cardMedia'
image={imgUrl}
title={mediaTitle}
/>}

<CardActions disableSpacing>
  {pingActionsLabel && <Button variant='contained' color='primary' onClick={actionsClick} label={pingActionsLabel}/>}
  {linkLabel && <Button variant='outlined' href={linkLabelLink} color='primary' label={linkLabel}/>}
</CardActions> 
</Card>
    </Fragment>)
}
export default Cards