import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesBar from '../../Components/Categories/CategoriesBar'
import Video from '../../Components/Video/Video'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'
import { Col, Container, Row } from 'react-bootstrap'
import './HomeScreen.scss'
import SkeletonVideos from '../../Components/Skeleton/SkeletonVideos'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPopularVideos())
  },[dispatch])

  const {videos,activeCategory,loading} = useSelector(state=>state.homeVideos)

  const fetchData = ()=>{
    if(activeCategory === 'All'){
      dispatch(getPopularVideos())
    }else{
      dispatch(getVideosByCategory(activeCategory))
    }
  }

  return (
    <Container>
      <Row>
      <CategoriesBar/>
          <InfiniteScroll dataLength={videos.length} next={fetchData} hasMore={true} loader={
            <span className='spinner-border text-danger d-block mx-auto'></span>} className='row'>
            {!loading? videos.map((video)=>(
                <Col lg={3} md={4}>
                    <Video video={video} key={video.id}/>
                </Col>
            )):[...Array(20)].map(()=><Col lg={3} md={4}><SkeletonVideos/></Col>)}
          </InfiniteScroll>
      </Row>
    </Container>
  )
}

export default HomeScreen