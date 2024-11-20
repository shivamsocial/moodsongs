import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/videoPage.module.css";

const VideoPlayer = ({
  video,
  currentVideoIndex,
  goToNextVideo,
  goToPreviousVideo,
  videoListLength,
  currentPage,
  totalCount,
  loading,
  error,
}) => {
  const [isIframeVisible, setIframeVisible] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const iframeRef = useRef(null);

  // Load YouTube Iframe API
  useEffect(() => {
    if (typeof window.YT === "undefined") {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        setPlayerReady(true);
      };
    } else {
      setPlayerReady(true);
    }
  }, []);

  // Initialize YouTube Player
  useEffect(() => {
    if (playerReady && isIframeVisible && video?.id) {
      const player = new window.YT.Player(`youtube-player-${video.id}`, {
        videoId: video.id,
        playerVars: {
          autoplay: 1,
          mute: 1, // Start muted for autoplay to work
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              goToNextVideo();
            }
          },
        },
      });

      return () => {
        player.destroy();
      };
    }
  }, [playerReady, isIframeVisible, video?.id, goToNextVideo]);

  const handleIframeClick = () => {
    setIframeVisible(true);
  };

  return (
    <div className={styles.videoCard}>
      {loading && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.spinnerText}>
            🤖 AI is curating the perfect playlist for your mood... 🚀🚀
          </p>
        </div>
      )}

      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && video && (
        <>
          {!isIframeVisible ? (
            <div className={styles.thumbnail} onClick={handleIframeClick}>
              <Image
                src={`https://img.youtube.com/vi/${video?.id}/hqdefault.jpg`}
                alt="Video Thumbnail"
                className={styles.thumbnail}
                width={480}
                height={270}
                priority
              />
              <div className={styles.playButtonContainer}>
                <div className={styles.playButton}></div>
              </div>
            </div>
          ) : (
            <div
              id={`youtube-player-${video.id}`}
              className={styles.videoFrame}
            ></div>
          )}

          <h3 className={styles.videoTitle}>{video?.snippet.title}</h3>

          <div className={styles.buttonContainer}>
            <button
              className={styles.buttonNextPrev}
              onClick={goToPreviousVideo}
              disabled={currentVideoIndex === 0 && currentPage === 1}
            >
              Previous
            </button>
            <button
              className={styles.buttonNextPrev}
              onClick={goToNextVideo}
              disabled={
                currentVideoIndex === videoListLength - 1 &&
                (currentPage + 1) * 5 >= totalCount
              }
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && !error && !video && (
        <p className={styles.noVideos}>No embeddable videos available.</p>
      )}
    </div>
  );
};

export default VideoPlayer;
