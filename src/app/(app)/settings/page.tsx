"use client";
import { useState } from "react"
import LoadingOverlay from "@/components/LayoutElements/LoadingOverlay"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <button
        onClick={() => setLoading(!loading)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Loading
      </button>

      <LoadingOverlay show={loading} />
    </>
  )
}
