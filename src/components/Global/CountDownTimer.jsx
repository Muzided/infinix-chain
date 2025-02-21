"use client"

import { useState, useEffect } from "react"

export default function CountDownTimer({ timerStart }) {
  // Ensure timerStart is a valid number, if not default to 0
  const [remainingSeconds, setRemainingSeconds] = useState(Number(timerStart))

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (isNaN(remainingSeconds) || remainingSeconds <= 0) return

    const calculateTimeLeft = () => {
      const days = Math.floor(remainingSeconds / (60 * 60 * 24))
      const hours = Math.floor((remainingSeconds % (60 * 60 * 24)) / (60 * 60))
      const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60)
      const seconds = Math.floor(remainingSeconds % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft() // Initial calculation

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(timer) // Stop interval when the time runs out
          return 0
        }
        return prev - 1 // Decrement the remaining time
      })
    }, 1000)

    return () => clearInterval(timer) // Cleanup the interval on component unmount
  }, [remainingSeconds,timerStart])

  console.log("remainingSeconds", remainingSeconds) // This should now log correctly

  const formatNumber = (num) => num.toString().padStart(2, "0")

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-1 rounded-xl">
      <div className="flex items-center justify-center gap-2">
        <TimeUnit value={formatNumber(timeLeft.days)} label="Days" />
        <Separator />
        <TimeUnit value={formatNumber(timeLeft.hours)} label="Hours" />
        <Separator />
        <TimeUnit value={formatNumber(timeLeft.minutes)} label="Minutes" />
        <Separator />
        <TimeUnit value={formatNumber(timeLeft.seconds)} label="Seconds" />
      </div>
    </div>
  )
}

function TimeUnit({ value, label }) {
  return (
    <div className="bg-white rounded-lg w-24">
      <div className="p-1 flex flex-col items-center justify-center">
        <span className="text-2xl sm:text-3xl font-bold text-[#0A061D]">{value}</span>
        <span className="text-sm text-[#0A061D] mt-1">{label}</span>
      </div>
    </div>
  )
}

function Separator() {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-2 h-2 rounded-full bg-white/50" />
      <div className="w-2 h-2 rounded-full bg-white/50" />
    </div>
  )
}
