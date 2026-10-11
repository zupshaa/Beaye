// "name" is used to find the image automatically in src/assets/images/
// (matched against the filename, ignoring numbers, underscores and case),
// e.g. "Into the Wild"  ->  1__Into_The_Wild.png
export const vouchers = [
  { id: 'into-the-wild', name: 'Into the Wild', description: 'A date in the great outdoors. Your call!' },
  { id: 'sport-day', name: 'Sport Day', description: 'Gym, running, swimming, your choice!' },
  { id: 'free-massage', name: 'Free Massage', description: "Won't stop until you ask me to!" },
  { id: 'movie-time', name: 'Movie Time', description: 'Any movie of your choice, even horror will do.' },
  { id: 'little-getaway', name: 'Little Getaway', description: "A late-night walk sounds fun. It doesn't matter how long the walk is." },
  { id: 'wildcard', name: 'Wildcard', description: "Anything, literally anything you ask me to, we'll do." },
  { id: 'pick-a-song', name: 'Pick a Song', description: "Any song of your choice, I'll memorize and sing along with you." },
  { id: 'photobox', name: 'Photobox', description: "Let's take a picture with our special frame!" },
  { id: 'all-you-can-eat', name: 'All You Can Eat', description: "Any AYCE in Malang. Please wait until I'm financially ready." },
  // unlimited: true -> can be redeemed again and again (counter instead of a lock)
  { id: 'free-hugs-and-kisses', name: 'Free Hugs and Kisses', description: 'Unlimited redemptions, no voucher required.', unlimited: true },
]

export const agreements = [
  'I have read and agree to the Terms & Conditions.',
  'I understand these vouchers are a privilege, not a legal obligation.',
  'I understand voucher redemption follows the rules provided.',
  'I agree there are no complaints, arguments, loopholes, or creative interpretations.',
  'I understand voucher redemption depends on availability and willingness to cooperate.',
]
