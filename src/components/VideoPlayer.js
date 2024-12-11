import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/videoPage.module.css";

const VideoPlayer = ({
  video,
  currentVideoIndex,
  goToNextVideo,
  goToPreviousVideo,
  videoListLength,
  totalCount,
  loading,
  error,
}) => {
  const [isIframeVisible, setIframeVisible] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isAutoplayTriggered, setAutoplayTriggered] = useState(false);

  const iframeRef = useRef(null);

  // Start a timer to auto-play the video after 3.5 seconds if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isIframeVisible && !isAutoplayTriggered) {
        setIframeVisible(true);
        setAutoplayTriggered(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isIframeVisible, isAutoplayTriggered]);

  // Intersection Observer to load iframe when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isIframeVisible) {
          setIframeVisible(true);
        }
      },
      {
        rootMargin: "200px", // Trigger loading 200px before the video enters the viewport
      }
    );

    const iframeNode = iframeRef.current;
    if (iframeNode) {
      observer.observe(iframeNode);
    }

    return () => {
      if (iframeNode) {
        observer.unobserve(iframeNode);
      }
    };
  }, [isIframeVisible]);

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

  useEffect(() => {
    let player;

    if (playerReady && isIframeVisible && video?.id && iframeRef.current) {
      // Initialize the player
      player = new window.YT.Player(`youtube-player-${video.id}`, {
        videoId: video.id,
        playerVars: {
          autoplay: 1, // Autoplay enabled
          mute: 0, // Start unmuted to allow autoplay to work
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo(); // Ensure autoplay triggers as soon as the video is ready
          },
          onStateChange: (event) => {
            // Check for the "ENDED" state
            if (event.data === window.YT.PlayerState.ENDED) {
              goToNextVideo(); // Automatically go to the next video when the current one ends
            }
          },
        },
      });

      // Cleanup function to destroy the player when the component unmounts or before reinitialization
      return () => {
        if (player) {
          player.destroy();
        }
      };
    }

    return () => {};
  }, [playerReady, isIframeVisible, video?.id, goToNextVideo]);

  const handleIframeClick = () => {
    setIframeVisible(true);
    setAutoplayTriggered(true); // Autoplay triggered immediately on click
  };

  return (
    <div className={styles.videoCard}>
      {loading && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.spinnerText}>
            🤖 Mood Songs is curating the perfect playlist for your mood... 🚀🚀
          </p>
        </div>
      )}

      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && video && (
        <>
          {/* Show Thumbnail and Play Button */}
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
              ref={iframeRef}
            ></div>
          )}

          <h3 className={styles.videoTitle}>{video?.snippet.title}</h3>

          <div className={styles.buttonContainer}>
            <button
              className={styles.buttonNextPrev}
              onClick={goToPreviousVideo}
              disabled={currentVideoIndex === 0}
            >
              Previous
            </button>
            <button
              className={styles.buttonNextPrev}
              onClick={goToNextVideo}
              disabled={currentVideoIndex === videoListLength - 1}
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
