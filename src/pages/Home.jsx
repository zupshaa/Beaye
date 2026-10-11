import { useCallback, useState } from 'react'
import { siteConfig } from '../data/siteConfig.js'
import { findImage } from '../utils/assets.js'
import wordsearch from '../data/wordsearch.json'
import crossword from '../data/crossword.json'
import quiz from '../data/quiz.json'
import { POINTS } from '../components/games/scoring.js'

import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import VideoSection from '../components/VideoSection.jsx'
import VoucherSection from '../components/VoucherSection.jsx'
import BookletSection from '../components/BookletSection.jsx'
import MiniGames from '../components/MiniGames.jsx'
import Footer from '../components/Footer.jsx'
import SignOff from '../components/SignOff.jsx'

const MAX_SCORE =
  wordsearch.words.length * POINTS.wordsearchPerWord +
  (crossword.across.length + crossword.down.length) * POINTS.crosswordPerWord +
  POINTS.crackTheCode +
  quiz.questions.length * POINTS.quizPerCorrect

export default function Home() {
  const [scores, setScores] = useState({})
  const setGameScore = useCallback(
    (id, n) => setScores((s) => (s[id] === n ? s : { ...s, [id]: n })),
    []
  )
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const bg = findImage('BG Web')

  return (
    <div className="app" style={bg ? { '--bg-web': `url(${bg})` } : undefined}>
      <Navbar />
      <Hero />

      <section id="home" className="section section--dark">
        <div className="container container--center">
          <h2 className="home__title">Happy {siteConfig.age}th Birthday, {siteConfig.recipient}!</h2>
          <VideoSection />
          <SignOff light />
        </div>
      </section>

      <VoucherSection />
      <BookletSection />
      <MiniGames scores={scores} maxScore={MAX_SCORE} setGameScore={setGameScore} />
      <Footer score={total} maxScore={MAX_SCORE} />
    </div>
  )
}
