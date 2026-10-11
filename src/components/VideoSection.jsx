import { siteConfig } from '../data/siteConfig.js'
import { findLocalVideo } from '../utils/assets.js'

function toEmbed(url) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
  if (yt) return { type: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}` }
  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/)
  if (drive) return { type: 'iframe', src: `https://drive.google.com/file/d/${drive[1]}/preview` }
  return { type: 'file', src: url }
}

export default function VideoSection() {
  const source = siteConfig.videoUrl
    ? toEmbed(siteConfig.videoUrl)
    : findLocalVideo()
      ? { type: 'file', src: findLocalVideo() }
      : null

  return (
    <div className="video">
      {!source && (
        <div className="video__placeholder">
          <span className="video__play">▶</span>
          <p>Your birthday video is coming soon</p>
        </div>
      )}
      {source?.type === 'iframe' && (
        <iframe
          className="video__frame"
          src={source.src}
          title="Birthday video"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      )}
      {source?.type === 'file' && (
        <video className="video__frame" src={source.src} controls playsInline preload="metadata" />
      )}
    </div>
  )
}
