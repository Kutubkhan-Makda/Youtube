import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';
import './CategoriesBar.scss'

const keywords=[
  'All',
  'React JS',
  'Angular JS',
  'React Native',
  'Use of API',
  'Redux',
  'Music',
  'Algorithm Art',
  'Guitar',
  'Hindi Songs',
  'Bengali Songs',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrib',
  'Gatsby',
  'Poor Coder',
  'Shwetabh',
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All')

  const dispatch = useDispatch()

  const handleClick = (value)=>{
    setActiveElement(value)
    if(value === 'All'){
      dispatch(getPopularVideos())
    }else{
      dispatch(getVideosByCategory(value))
    }
  }

  return (
    <div className='categoriesBar'>
        {
          keywords.map((value,i) => (
          <span onClick={() => handleClick(value)} key={i}
              className={activeElement === value ? 'active': ''} >
              {value}
          </span>
          ))}
    </div>
  )
}

export default CategoriesBar