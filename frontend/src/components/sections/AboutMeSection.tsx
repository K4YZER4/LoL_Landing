import { useEffect, useRef, useState } from "react";
import SakuraPetalOverlay from "../layout/SakuraPetalOverlay";
import BackgroundVideo from "../ui/BackgroundVideo";

interface Track {
  title: string;
  artist: string;
  src: string;
}

const tracks: Track[] = [
  { title: "Glassy Sky", artist: "AmaLee", src: "/assets/music/track-01.mp3" },
  { title: "Take Me Out", artist: "Franz Ferdinand", src: "/assets/music/track-02.mp3" },
  { title: "Up From the Bottom", artist: "Linkin Park", src: "/assets/music/track-03.mp3" },
  { title: "Live My Life", artist: "HEARTSTEEL", src: "/assets/music/track-04.mp3" },
  {
    title: "Runaway Baby",
    artist: "Bruno Mars",
    src: "/assets/music/Bruno Mars - Runaway Baby (Official Lyric Video).mp3",
  },
];

export default function AboutMeSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = tracks[selectedTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
    }
  }, [selectedTrack, isPlaying]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const selectTrack = (index: number) => {
    setSelectedTrack(index);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (value: string) => {
    const nextTime = Number(value);
    if (!audioRef.current || !Number.isFinite(nextTime)) return;
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleVolumeChange = (value: string) => {
    const nextVolume = Number(value);
    if (!Number.isFinite(nextVolume)) return;
    setVolume(nextVolume);
    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  };

  return (
    <section className="aboutMeSection sectionBlendTop">
      <SakuraPetalOverlay lightColor="#b7d9f4" deepColor="#5d8fc7" />
      <BackgroundVideo
        className="aboutMeVideoBackground"
        src="/assets/blue_flowers_video_pingpong.mp4"
      />
      <img
        src="/assets/kanekiSinFondo1.png"
        alt="Kaneki"
        className="aboutMeKaneki"
        loading="lazy"
        decoding="async"
      />
      <div className="sectionContainer aboutMeContainer">
        <div className="aboutMeHeader">
          <h2 className="sectionTitle">About Me</h2>
          <p className="sectionSubTitle">A LITTLE BIT ABOUT ME</p>
        </div>

        <div className="aboutMeCard">
          <div className="aboutMeCopy">
            <p className="aboutMeText">
              Hello, I&apos;m Horacio. I&apos;m 20 years old and I&apos;m currently
              studying Software Engineering. I enjoy programming, playing League
              of Legends, going to the gym, listening to music, and watching anime
              such as Tokyo Ghoul, Gurren Lagann, and Hunter × Hunter.
            </p>
          </div>

          <div className="musicPlayer glassPanel">
            <div className="musicPlayerHeading">
              <span>Music I Like</span>
              <span className="musicPlayerCount">{String(selectedTrack + 1).padStart(2, "0")} / 05</span>
            </div>

            <div className="musicVolume">
              <span className="material-symbols-outlined musicVolumeIcon">
                {volume === 0 ? "volume_off" : "volume_up"}
              </span>
              <input
                className="musicVolumeBar"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                aria-label="Music volume"
                onChange={(event) => handleVolumeChange(event.target.value)}
              />
            </div>

            <div className="musicPlayerMain">
              <button
                className={`musicDisc${isPlaying ? " isPlaying" : ""}`}
                type="button"
                aria-label={isPlaying ? "Pause music" : "Play music"}
                onClick={togglePlayback}
              >
                <span className="musicDiscGroove" />
                <span className="musicDiscLabel">{isPlaying ? "Ⅱ" : "▶"}</span>
              </button>

              <div className="musicTrackInfo">
                <span className="musicTrackEyebrow">NOW LISTENING</span>
                <strong>{track.title}</strong>
                <span>{track.artist}</span>
              </div>
            </div>

            <div className="musicProgress">
              <input
                className="musicProgressBar"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                aria-label="Song progress"
                onChange={(event) => handleSeek(event.target.value)}
              />
              <div className="musicProgressTimes">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="musicTrackList" aria-label="Music playlist">
              {tracks.map((item, index) => (
                <button
                  className={`musicTrack${index === selectedTrack ? " isActive" : ""}`}
                  key={item.title}
                  type="button"
                  onClick={() => selectTrack(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
            <audio
              ref={audioRef}
              src={track.src}
              onCanPlay={(event) => {
                event.currentTarget.volume = volume;
              }}
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              preload="none"
              onEnded={() => {
                setIsPlaying(false);
                setCurrentTime(0);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
