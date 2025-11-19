import React, { useState, useEffect } from 'react'
import Notiflix from 'notiflix'

const ORIGINAL_WORDS = [
  { word: 'MATA', hint: 'Bagian untuk melihat' },
  { word: 'KAKI', hint: 'Bagian untuk berjalan' },
  { word: 'BOLA', hint: 'Benda bulat untuk bermain' },
  { word: 'PADI', hint: 'Tanaman penghasil beras' },
  { word: 'RUMAH', hint: 'Tempat tinggal' },
  { word: 'SAPI', hint: 'Hewan penghasil susu' },
  { word: 'BUKU', hint: 'Untuk membaca' },
  { word: 'MEJA', hint: 'Tempat meletakkan barang' },
  { word: 'PENSIL', hint: 'Untuk menulis' }
]

function shuffleArray(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function WordGame({ funHints }) {
  const [words, setWords] = useState([])
  const [index, setIndex] = useState(0)
  const [letters, setLetters] = useState([])
  const [picked, setPicked] = useState([])
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [funHint, setFunHint] = useState('')

  useEffect(() => {
    setWords(shuffleArray(ORIGINAL_WORDS))
  }, [])

  useEffect(() => {
    if (words.length > 0) startNew()
  }, [index, words])

  function startNew() {
    if (index >= words.length) return
    const w = words[index].word.toUpperCase()
    setLetters(shuffleArray(w.split('')))
    setPicked([])
    setShowHint(false)
    const hint = funHints[Math.floor(Math.random() * funHints.length)]
    setFunHint(hint)
  }

  function pickLetter(i) {
    if (picked.length >= words[index].word.length) return
    const newPicked = picked.concat(letters[i])
    setPicked(newPicked)
    const newLetters = letters.slice()
    newLetters.splice(i, 1)
    setLetters(newLetters)
  }

  function removePicked(i) {
    const newPicked = picked.slice()
    const removed = newPicked.splice(i, 1)
    setPicked(newPicked)
    setLetters(shuffleArray(letters.concat(removed)))
  }

  function checkAnswer() {
    const answer = picked.join('')
    const target = words[index].word
    if (answer === target) {
      setScore(score + 10)

      if (index + 1 >= words.length) {
        Notiflix.Report.success(
          'Yeayyy! 🎉',
          'Kamu berhasil menjawab semua kata🥳<br/><br/> Mau main lagi ?',
          'Mau',
          () => {
            setIndex(0)
            setScore(0)
            setWords(shuffleArray(ORIGINAL_WORDS))
          }
        )
        return
      }

      Notiflix.Report.success(
        'Yeayy, Kamu benar🎉',
        `"${target}" adalah jawaban yang tepat🌟😊`,
        'Lanjut'
      )
      setTimeout(() => setIndex(index + 1), 500)
    } else {
      Notiflix.Report.failure(
        'Ups, Salah😅',
        `Jawaban kamu: "${answer}" belum benar.<br/><br/> Coba lagi yaaa..😉`,
        'Oke'
      )
      setLetters(shuffleArray(letters.concat(picked)))
      setPicked([])
    }
  }

  function resetGame() {
    setIndex(0)
    setScore(0)
    setWords(shuffleArray(ORIGINAL_WORDS))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-700">Skor: <span className="font-semibold">{score}</span></div>
        <div className="text-sm text-gray-700">Bagian: <span className="font-semibold">{Math.min(index + 1, words.length)}</span></div>
      </div>

      {index < words.length && (
        <>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <div className="mb-2 text-sm text-gray-600">Petunjuk:</div>
            <div className="text-lg font-medium mb-1">{words[index].hint}</div>
            <div className="text-sm text-indigo-600 mt-2 italic">{funHint}</div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-indigo-600 mt-2 underline"
            >
            </button>
            {showHint && (
              <div className="mt-2 text-2xl font-bold tracking-widest">{words[index].word}</div>
            )}
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm text-gray-600">Susun huruf:</div>
            <div className="min-h-[60px] p-3 bg-white rounded-lg border border-dashed flex flex-wrap gap-2">
              {picked.length === 0 && <div className="text-sm text-gray-400">Klik huruf di bawah yaa untuk menyusun kata☺️</div>}
              {picked.map((c, i) => (
                <button
                  key={'p'+i}
                  onClick={() => removePicked(i)}
                  className="px-3 py-2 bg-indigo-50 rounded-md border shadow-sm hover:bg-indigo-100"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm text-gray-600">Huruf acak:</div>
            <div className="p-3 bg-white rounded-lg border flex flex-wrap gap-2">
              {letters.map((c, i) => (
                <button
                  key={'l'+i}
                  onClick={() => pickLetter(i)}
                  className="px-3 py-2 bg-emerald-50 rounded-md border shadow-sm hover:bg-emerald-100"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={checkAnswer} className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow">
              Cek
            </button>
            <button onClick={resetGame} className="px-4 py-2 bg-red-50 text-red-700 rounded-md">
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  )
}