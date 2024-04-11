import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineLike, AiTwotoneDislike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";

interface Creator {
  handle: string;
}

interface Video {
  postId: string;
  mediaUrl: string;
  thumbnail: string;
  submission: Submission;
  creator: Creator; 
}

interface Submission {
  thumbnail: string;
  mediaUrl: string;
  description: string;
  title: string;
}



const AllVideo: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string>("");
  const[inc, setInc] = useState(500)
  const[dec, setDec] = useState(20)
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<{
          data: { posts: Video[]; totalPages: number };
        }>(
          `https://internship-service.onrender.com/videos?page=${currentPage}`
        );
        setVideos(response.data.data.posts);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.error("Error fetching videos:", error);
        // Reset videos and totalPages in case of error
        setVideos([]);
        setTotalPages(0);
      }
    };

    fetchVideos();
  }, [currentPage]);

  const handleVideoClick = (mediaUrl: string) => {
    setPlayingVideoUrl(mediaUrl);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };



  const handleInc = ()=>{
    setInc(inc+1)
  }

  const handleDec = ()=>{
    setDec(dec-1)
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        {videos.map((short) => (
          <div
            key={short.postId}
            style={{
              width: "30%",
              marginTop: "70px",
              height: "400px",
              borderRadius: "20px",
            }}
          >
            {/* Video Thumbnail or Playing Video */}
            <div
              style={{
                width: "100%",
                height: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
                backgroundColor: "#212121",
                borderRadius: "20px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                cursor: "pointer",
              }}
              onClick={() => handleVideoClick(short.submission.mediaUrl)}
            >
              {playingVideoUrl === short.submission.mediaUrl ? (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  src={playingVideoUrl}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                ></video>
              ) : (
                <img
                  src={short.submission.thumbnail}
                  alt=""
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
            </div>
            {/* Creator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid gray",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  marginRight: "10px",
                }}
              >
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  src="https://yt3.googleusercontent.com/UpPVMBZikEl6iPt26DD78wrfxeVD-brIa3Td59AlVWqsU6qb6yKI4gmZMn_XRGaSd4Ne26jQeMU=s176-c-k-c0x00ffffff-no-rj"
                  alt=""
                />
              </div>
  
              <div style={{ display: "flex" }}>
                <h3 style={{color: "red", fontWeight: "800" , fontSize: "15px"}}>{short.creator?.handle}</h3>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "20px",
                    width: "250px",
                    justifyContent: "space-evenly",
                  }}
                >
                  <button style={{ fontSize: "20px", color: "blue", display: "flex" }}>
                    <AiOutlineLike onClick={handleInc}/><span style={{fontSize: "10px"}}>{inc}:k</span>
                  </button>
                  <button style={{ fontSize: "20px", display: "flex" }}>
                    <AiTwotoneDislike onClick={handleDec}/><span style={{fontSize: "10px"}}>{dec}:k</span>
                  </button>
                  <button >
                    <FaRegCommentAlt />
                  </button>
                  <button style={{ color: "blue" }}>
                    <FaEllipsisVertical />
                  </button>
                </div>
              </div>
            </div>
            {/* Description and Views */}
            <p style={{ marginLeft: "60px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", color: "#9E9E9E", fontWeight: 700}}>
              {short.submission.title}
            </p>
            <p style={{ marginLeft: "60px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", color: "#757575", }}>
              507K views 1 month ago
            </p>
  
            <div style={{ marginLeft: "60px" }}>
              {showFullDescription
                ? short.submission.description.split(" ").slice(0, 20).join(" ")
                : short.submission.description.slice(0, 20) + "..."} 
              {!showFullDescription ? (
                <button onClick={toggleDescription} style={{color: "red"}}>Read more</button>
              ) : (
                <button onClick={toggleDescription} style={{color: "yellow"}}>...Read less</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            borderRadius: "4px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            cursor: "pointer",
            outline: "none",
          }}
        >
          Prev
        </button>
        <span
          style={{
            margin: "0 10px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Page {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            marginLeft: "10px",
            borderRadius: "4px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            cursor: "pointer",
            outline: "none",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
  
};

export default AllVideo;
