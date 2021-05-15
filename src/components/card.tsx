import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Button from './button'
import Typography from './typography'
import Avatar from '@material-ui/core/Avatar'
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from './checkbox'
import DeleteIcon from '@material-ui/icons/Delete';
function Cards(props){
  const { title, 
    subHeader,
     imgUrl,
      actionsLabel,
      actionClick,
       mediaTitle,
        avatar, 
        action, 
        onShowIconClick,
          linkLabel,
           linkLabelLink, checkbox, onCheckBoxClick, checkBoxId, checked, deleteIcon, onRemoveClick} = props
  const onShowIconClicks = (e)=> {
    e.stopPropagation()
    onShowIconClick()
  }
   const actionsClick = (e)=> {
    e.stopPropagation()
    actionClick()
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
   { action  && ( <IconButton onClick={onShowIconClicks}>
        <EditIcon fontSize='small' />
      </IconButton>)}
{checkbox &&
      ( <Checkbox 
        id={ checkBoxId}
           checked={checked || false}
           onChange={onCheckBoxClick}
      />)}
{deleteIcon && (
      <IconButton onClick={onRemoveClick}>
        <DeleteIcon fontSize='inherit' />
      </IconButton>
      ) }
    </Fragment>
      }
    />
    {mediaTitle && <CardMedia
className='cardMedia'
image={imgUrl}
title={mediaTitle}
/>}

<CardActions disableSpacing>
  {actionsLabel && <Button variant='contained' color='primary' onClick={actionsClick} label={actionsLabel}/>}
  {linkLabel && <Button variant='outlined' href={linkLabelLink} color='primary' label={linkLabel}/>}
</CardActions> 
</Card>
    </Fragment>)
}
export default Cards