import { useState, useEffect, useRef } from "react";
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
  const [isAutoplayTriggered, setAutoplayTriggered] = useState(false);
  const iframeRef = useRef(null);

  // Start a timer to auto-play the video after 6 seconds if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isIframeVisible && !isAutoplayTriggered) {
        setIframeVisible(true);
        setAutoplayTriggered(true);
      }
    }, 3500);

    // Cleanup timer if the component is unmounted or video is already played
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

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, [isIframeVisible]);

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
            🤖 AI is curating the perfect playlist for your mood... 🚀🚀
          </p>{" "}
          {/* Add the loading text here */}
        </div>
      )}
      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && video && (
        <>
          {/* Show Thumbnail and Play Button */}
          {!isIframeVisible ? (
            <div
              className={styles.thumbnail}
              onClick={handleIframeClick} // Autoplay when clicked
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${video?.id}/hqdefault.jpg)`,
              }}
            >
              <div className={styles.playButtonContainer}>
                <div className={styles.playButton}></div>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              key={currentVideoIndex}
              className={styles.videoFrame}
              src={`https://www.youtube.com/embed/${video?.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture; gyroscope; accelerometer"
              allowFullScreen
              title={video?.snippet.title}
              loading="lazy"
            ></iframe>
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
