import React from 'react';
import { API_OPTIONS } from '../utils/constants';
import useMovieTrailer from '../hooks/useMovieTrailer';
import { useSelector } from 'react-redux';


const VideoBackground = ({ movieId }) => {
   const trailerVideo = useSelector((store) => store.movies?.trailerVideo); 
 
   //fetch trailer and updating redux store with trailer video data
   useMovieTrailer(movieId);

  return (
    <div>
        <iframe className='w-screen aspect-video'
                src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1"} 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
        </iframe>
    </div>
  )
}

export default VideoBackground;
