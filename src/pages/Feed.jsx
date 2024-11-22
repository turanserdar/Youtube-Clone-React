import { useContext } from 'react';
import SideBar from '../components/SideBar';
import { YoutubeContext } from '../context/youtubeContext';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

const Feed = () => {
  const { videos } = useContext(YoutubeContext);

  return (
    <div className="flex ">
      <SideBar />
      <div className="video-layout">
        {/* 
            1) if the API response has not arrived yet, display loading
            2) if the API response has arrived, display video cards 
            *  on the screen only for items with type 'video'
        */}
        {!videos ? (
          <Loader />
        ) : (
          videos.map(
            (item, i) =>
              item.type === 'video' && (
                <VideoCard key={i} video={item} />
              )
          )
        )}
      </div>
    </div>
  );
};

export default Feed;
