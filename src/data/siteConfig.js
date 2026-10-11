// ============================================================
//  EDIT THIS FILE to plug in your links later.
// ============================================================

export const siteConfig = {
  siteName: 'B-day',
  recipient: 'Beaye',
  age: 26,

  // Birthday video (5-10 min). Leave '' to show the placeholder.
  // Option A: paste a YouTube link  -> 'https://www.youtube.com/watch?v=XXXX'
  // Option B: paste a Google Drive share link -> 'https://drive.google.com/file/d/FILE_ID/view'
  // Option C: drop an .mp4 into src/assets/videos/ (picked up automatically)
  videoUrl: '',

  // Terms & Conditions page (opens in a new tab). Leave '' until you have it.
  termsUrl: 'https://docs.google.com/document/d/1HoOTt5GKCWsytFenFBM_KhJwttlsCUGe/edit?usp=sharing&ouid=110048365634987698044&rtpof=true&sd=true',

  // Booklet link (opens in a new tab). Leave '' until you have it.
  bookletUrl: 'https://zupshaa.github.io/Beaye-s/',

  // PIN screen shown when the site opens. Only the SHA-256 hash of the PIN is stored.
  pinLength: 4,
  pinHash: '131e27b7715c43825f14696b907812d34fb86a529dd8c98fedbf87016f5d9149',
  pinHint: 'Jatim Park 3', // offered only after 3 wrong attempts
  pinWrongText: 'NT bang, coba lagi.',
}
