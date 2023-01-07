import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiFillEye } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'
import request from '../../api'
import './VideoHorizontal.scss'

const VideoHorizontal = ({video,searchScreen,subScreen}) => {
  const {id,snippet:{channelId,channelTitle,description,title,publishedAt,thumbnails:{medium},resourceId}} = video

  const isVideo = !(id.kind === 'youtube#channel' || subScreen)

  const [views,setViews] = useState(null)
  const [duration,setDuration] = useState(null)
  const [channelIcon,setChannelIcon] = useState(null)

  useEffect(()=>{
    const get_video_details =async ()=>{
      const {data:{items}} = await request('/videos',{
        params:{
          part:'contentDetails,statistics',
          id:id.videoId,
        }
      })
      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)
    }
    if(isVideo)
      get_video_details()
  },[id,isVideo])

  useEffect(()=>{
    const get_channel_icon =async ()=>{
      const {data:{items}} = await request('/channels',{
        params:{
          part:'snippet',
          id:channelId,
        }
      })
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    get_channel_icon()
  },[channelId])

  const seconds = moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds*1000).format("mm:ss")

  const navigate = useNavigate()

  const _channelId = resourceId?.channelId || channelId

  const handleClick = ()=>{
    isVideo?
    navigate(`/watch/${id.videoId}`):
    navigate(`/channel/${_channelId}`)
  }

  const thumbnail = !isVideo && 'VideoHorizontal_thumbnail-channel' 

  return (
    <Row className='VideoHorizontal m-1 py-2 align-items-center' onClick={handleClick}>
      <Col xs={6} md={searchScreen||subScreen?4:6} className="VideoHorizontal_left">
        <LazyLoadImage src={medium.url} effect='blur' className={`VideoHorizontal_thumbnail ${thumbnail}`} wrapperClassName='VideoHorizontal_thumbnail'/>
        {isVideo && <span className='VideoHorizontal_duration'>{_duration}</span>}
      </Col>
      <Col xs={6} md={searchScreen||subScreen?8:6} className="VideoHorizontal_right p-0">
        <p className="VideoHorizontal_title mb-1">{title}</p>
        {isVideo && (
          <div className="VideoHorizontal_details">
            <AiFillEye/> {numeral(views).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </div>
        )}
        {(searchScreen||subScreen) && <p className='mt-1 VideoHorizontal_discription'>{description}</p>}
        <div className="VideoHorizontal_channel d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect='blur'/>}
        <p className='mb-0'>{channelTitle}</p>
        </div>
        {subScreen && (
           <p className='mt-2'>
              {video.contentDetails.totalItemCount} Videos
           </p>
        )}
      </Col>
    </Row>
  )
}

export default VideoHorizontal