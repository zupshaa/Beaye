import { useCallback, useState } from 'react'
import { siteConfig } from '../data/siteConfig.js'
import { findImage } from '../utils/assets.js'
import wordsearch from '../data/wordsearch.json'
import crossword from '../data/crossword.json'
import quiz from '../data/quiz.json'
import { POINTS } from '../components/games/scoring.js'

import { useRoute } from '../hooks/useRoute.js'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import VideoSection from '../components/VideoSection.jsx'
import VoucherSection from '../components/VoucherSection.jsx'
import BookletSection from '../components/BookletSection.jsx'
import MiniGames from '../components/MiniGames.jsx'
import Footer from '../components/Footer.jsx'

const MAX_SCORE =
  wordsearch.words.length * POINTS.wordsearchPerWord +
  (crossword.across.length + crossword.down.length) * POINTS.crosswordPerWord +
  quiz.questions.length * POINTS.quizPerCorrect

export default function Home() {
  const [scores, setScores] = useState({})
  const setGameScore = useCallback(
    (id, n) => setScores((s) => (s[id] === n ? s : { ...s, [id]: n })),
    []
  )
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const bg = findImage('BG Web')
  const page = useRoute()

  return (
    <div className="app" style={bg ? { '--bg-web': `url(${bg})` } : undefined}>
      <Navbar page={page} />

      {/* One page per menu item. All pages stay mounted (just hidden) so
          game progress and the total score are always up to date. */}
      <main className="pages">
        <div hidden={page !== 'home'}>
          <Hero />
          <section id="home" className="section section--dark">
            <div className="container container--center">
              <h2 className="home__title">Happy {siteConfig.age}th Birthday, {siteConfig.recipient}!</h2>
              <VideoSection />
            </div>
          </section>
        </div>

        <div hidden={page !== 'b-vouch'}><VoucherSection /></div>
        <div hidden={page !== 'booklet'}><BookletSection /></div>
        <div hidden={page !== 'mini-games'}>
          <MiniGames scores={scores} maxScore={MAX_SCORE} setGameScore={setGameScore} />
        </div>
      </main>

      <Footer score={total} maxScore={MAX_SCORE} />
    </div>
  )
}
