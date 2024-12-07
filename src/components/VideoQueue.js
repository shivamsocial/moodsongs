import Image from "next/image";

const VideoQueue = ({ queue, onSelectVideo }) => (
  <div className={styles.queueSection}>
    <h3 className={styles.queueHeading}>Up Next</h3>
    <ul className={styles.queueList}>
      {queue.map((video, index) => (
        <li
          key={index}
          className={`${styles.queueItem} ${
            queue[index].active ? styles.active : ""
          }`}
          onClick={() => onSelectVideo(index)}
        >
          <Image
            src={video.snippet.thumbnails.default.url}
            alt={video.snippet.title}
            width={200} // You can adjust the width
            height={100} // You can adjust the height
            className={styles.thumbnailQueue} // Your existing class
          />
          <div className={styles.videoInfo}>
            <h4>{video.snippet.title}</h4>
            <p>{video.snippet.channelTitle}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
