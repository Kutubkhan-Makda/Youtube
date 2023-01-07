import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getCommentsOfVideoById } from '../../redux/actions/comments.action'
import Comment from '../Comment/Comment'
import './Comments.scss'
import avtar from '../../Images/Avtar.jpg'
import { useState } from 'react'

const Comments = ({videoId,totalComments}) => {
  const [text,setText] = useState('')

  const handleComment =(e)=>{
    e.preventDefault()
    if(text.length===0) return
    dispatch(addComment(videoId,text))
  }

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCommentsOfVideoById(videoId))
  },[dispatch,videoId])

  const comments = useSelector(state=>state.commentList.comments)

  const _comments = comments?.map(comment=>comment.snippet.topLevelComment.snippet)

  return (
    <div className='Comments'>
      <p>{totalComments} Comments</p>
      <div className="Comments_form d-flex w-100 my-2">
        <img src={avtar} alt="" className='rounded-circle mr-3'/>
        <form onSubmit={handleComment} className='d-flex flex-grow-1'>
          <input type="text" className="flex-grow-1" placeholder='Write a Comment...' value={text} onChange={e=>setText(e.target.value)}/>
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="Comments_list">
        {
          _comments?.map((comment,i)=><Comment comment={comment} key={i}/>)
        }
      </div>
    </div>
  )
}

export default Comments