"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen items-center justify-center bg-[#0d0d0f] p-4">
      <div className="bg-[#16181d] border border-[#252830] rounded-xl p-8 max-w-sm w-full text-center">
        <p className="text-white font-medium mb-1">something broke</p>
        <p className="text-gray-500 text-sm mb-5">{error.message || "unexpected error"}</p>
        <button
          onClick={reset}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-lg transition-colors"
        >
          try again
        </button>
      </div>
    </div>
  )
}
