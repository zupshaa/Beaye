// Finds assets by FILENAME (never renamed). Anything dropped into
// src/assets/images or src/assets/videos is picked up automatically.
const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const videos = import.meta.glob('../assets/videos/*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const normalize = (s) =>
  s.toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]/g, '')

const imageIndex = Object.entries(images).map(([path, url]) => ({
  key: normalize(path.split('/').pop()),
  url,
}))

/** findImage('Into the Wild') -> url of "1__Into_The_Wild.png" (or null) */
export function findImage(name, { optional = false } = {}) {
  const k = normalize(name)
  const hit = imageIndex.find((i) => i.key.includes(k))
  if (!hit && !optional) console.warn(`[assets] no image found for "${name}"`)
  return hit ? hit.url : null
}

export function findLocalVideo() {
  return Object.values(videos)[0] || null
}
