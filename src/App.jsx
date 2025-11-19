import React, { useState, useEffect } from 'react'
import WordGame from './components/WordGame'
import { motion } from 'framer-motion'

export default function App() {
  const FUN_HINTS = [
    'Ayo geser huruf-huruf ini, jadikan kata yang super keren',
    'Klik huruf, susun kata, dan lihat keajaibannya🎉🧩',
    'Huruf-huruf ini menunggu sentuhan jari ajaibmu🖐️💫',
    'Bermain kata itu seru! Susun hurufnya jadi kata yang lucu😎🎈',
    'Tuk-tuk hurufnya, susun kata rahasianya🔍⭐',
    'Susun huruf-huruf lucu ini dan temukan kata ajaibnya🐱📚'
  ]

  const [funHint, setFunHint] = useState('')
  useEffect(() => {
    const hint = FUN_HINTS[Math.floor(Math.random() * FUN_HINTS.length)]
    setFunHint(hint)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6">
        <motion.h1
          className="text-3xl font-extrabold text-center text-indigo-700 mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
        >
          Belajar Huruf & Kata
        </motion.h1>
        <motion.p
          className="text-center text-lg text-gray-700 mb-6 italic"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {funHint}
        </motion.p>

        <WordGame funHints={FUN_HINTS} />

        <footer className="text-center mt-6 text-xs text-gray-400">
          made with❤️
        </footer>
      </div>
    </div>
  )
}
