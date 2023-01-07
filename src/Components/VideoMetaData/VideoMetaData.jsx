import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { MdThumbDown, MdThumbUp } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import ShowMoreText from 'react-show-more-text'
import { getChannleDetails, getSubscriptionStatus } from '../../redux/actions/channel.action'
import './VideoMetaData.scss'

const VideoMetaData = ({video:{snippet,statistics},videoId}) => {
  const {channelId,channelTitle,description,title,publishedAt} = snippet;
  const {viewCount,likeCount,dislikeCount} = statistics;

  const dispatch = useDispatch()

  const {snippet:channelSnippet,statistics:channelStatistics} = useSelector(state => state.channelDetails.channel)

  const subscriptionStatus = useSelector(state=>state.channelDetails.subscriptionStatus)

  useEffect(()=>{
    dispatch(getChannleDetails(channelId))
    dispatch(getSubscriptionStatus(channelId))
  },[dispatch,channelId])

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData_top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            <AiFillEye/>{numeral(viewCount).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span className='mr-3'>
              <MdThumbUp size={26}/>
              {numeral(likeCount).format("0.a")}
            </span>
            <span className='mr-3'>
              <MdThumbDown size={26}/>
              {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="py-3 my-2 videoMetaData_channel d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <img src={channelSnippet?.thumbnails?.default?.url} alt="channel_logo" className='me-3 rounded-circle'/>
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>{numeral(channelStatistics?.subscriberCount).format("0.a")} Subscribers</span>
          </div>
        </div>
        <button className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}>{subscriptionStatus?'subscribed':'Subscribe'}</button>
      </div>
      <div className="videoMetaData_discription">
        <ShowMoreText lines={3} more="SHOW MORE" less="SHOW LESS" anchorClass='showMoreText' expanded={false}>
          {description}
        </ShowMoreText>
      </div>
    </div>
  )
}

export default VideoMetaData