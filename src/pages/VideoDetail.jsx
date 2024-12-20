import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';
import { getData } from './../utils/getData';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import millify from 'millify';
import StringArea from '../components/StringArea';
import VideoCard from './../components/VideoCard';
import Loader from './../components/Loader';

const VideoDetail = () => {
  const [video, setVideo] = useState(null);

  // 1) Hook to get query parameters from the URL
  const [searchParams] = useSearchParams();

  // 2) Accessing the parameter value by name
  const id = searchParams.get('v');

  // 3) Making an API request for the video with the known id
  useEffect(() => {
    setVideo(null);

    getData(`/video/info?id=${id}&extend=1`).then((data) =>
      setVideo(data)
    );
  }, [searchParams]);

  return (
    <div className="detail-page h-screen overflow-auto p-5">
      <div>
        <ReactPlayer
          className={'rounded'}
          width={'100%'}
          height={'50vh'}
          controls
          playing
          url={`https://www.youtube.com/watch?v=${id}`}
        />

        {!video ? (
          <p>loading...</p>
        ) : (
          <>
            <h1 className="my-3 text-xl font-bold">{video.title}</h1>

            <div className="flex justify-between">
              {/* left */}
              <div className="flex items-center gap-4">
                <img
                  className="rounded-full w-12 h-12"
                  src={
                    video.channelThumbnail[
                      video.channelThumbnail.length - 1
                    ].url
                  }
                />
                <div>
                  <h4 className="font-bold">{video.channelTitle}</h4>
                  <p className="text-gray-400">
                    {video.subscriberCountText}
                  </p>
                </div>
                <button className="bg-white rounded-full text-black px-3 h-9 transition hover:bg-gray-400">
                  Subscribe
                </button>
              </div>
              {/* right */}
              <div className="flex items-center bg-[#272727] rounded-full cursor-pointer">
                <div className="flex items-center gap-3 py-2 px-4 border-r">
                  <AiFillLike />
                  <p>{video.likeCount}</p>
                </div>
                <div className="py-2 px-4">
                  <AiFillDislike />
                </div>
              </div>
            </div>

            <div className="bg-[#272727] rounded p-2 mt-4 cursor-pointer hover:bg-opacity-80">
              <div className="flex gap-3">
                <p>{millify(video.viewCount)} views</p>
                <p>
                  {new Date(video.publishDate).toLocaleDateString()}
                </p>
              </div>

              <StringArea text={video.description} />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-5 p-3">
        {!video ? (
          <Loader />
        ) : (
          video.relatedVideos.data.map(
            (item) =>
              item.type === 'video' && (
                <VideoCard isRow={true} video={item} />
              )
          )
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
