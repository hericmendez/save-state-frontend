"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"

type LoadingOverlayProps = {
  show: boolean
}

export default function LoadingOverlay({ show }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/Spinning-Floppy-Disk-128.gif"
            alt="Loading..."
            className="w-32 h-32"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
