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
  return (
    <div className={styles.videoCard}>
      {loading && <p className={styles.loadingText}>Loading...</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && video && (
        <>
          <iframe
            key={currentVideoIndex}
            className={styles.videoFrame}
            src={`https://www.youtube.com/embed/${video?.id}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0&showinfo=0`}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture; gyroscope; accelerometer"
            allowFullScreen
            title={video?.snippet.title}
            loading="lazy"
          ></iframe>
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
