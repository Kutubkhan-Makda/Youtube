import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from '../../Components/Comments/Comments'
import VideoHorizontal from '../../Components/VideoHorizontal/VideoHorizontal'
import VideoMetaData from '../../Components/VideoMetaData/VideoMetaData'
import { getRelatedVideos, getVideoById } from '../../redux/actions/videos.action'
import './WatchScreen.scss'

const WatchScreen = () => {
  const {id} = useParams()

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getVideoById(id))
    dispatch(getRelatedVideos(id))
  },[dispatch,id])

  const {videos,loading:relatedVideosLoding} = useSelector(state=>state.relatedVideos)
  const {video,loading} = useSelector(state => state.selectedVideo)

  return (
    <Row>
        <Col lg={8}>
            <div className="WatchScreen_player">
              <iframe src={`https://www.youtube.com/embed/${id}`}
              frameBorder="0" title={video?.snippet?.title} 
              allowFullScreen width='100%' height='100%'></iframe>
            </div>
            {
              !loading ? <VideoMetaData video={video} videoId={id}/> : <h6>Loading...</h6>
            }
            
            <Comments videoId={id} totalComments={video?.statistics?.commentCount}/>
        </Col>
        <Col lg={4}>
          {
            !relatedVideosLoding ? videos?.filter(video=>video.snippet).map(video=><VideoHorizontal video={video} key={video.id.videoId}/>) : <SkeletonTheme color='#343a40' highlightColor='#3c4147'><Skeleton width="100%" height="130px" count={15}/></SkeletonTheme>
          }
        </Col>
    </Row>
  )
}

export default WatchScreen