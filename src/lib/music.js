let context = null
let nodes = null
let playing = false
const listeners = new Set()

function emit() {
  listeners.forEach((listener) => listener())
}

function createDrone(audioContext) {
  const master = audioContext.createGain()
  master.gain.setValueAtTime(0.0001, audioContext.currentTime)
  master.gain.exponentialRampToValueAtTime(0.09, audioContext.currentTime + 0.6)

  const filter = audioContext.createBiquadFilter()
  filter.type = "lowpass"
  filter.frequency.value = 920

  const notes = [
    { freq: 196, gain: 0.34 },
    { freq: 197.5, gain: 0.14 },
    { freq: 293.66, gain: 0.1 },
    { freq: 392, gain: 0.06 },
  ]

  const oscillators = notes.map((note) => {
    const oscillator = audioContext.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.value = note.freq
    const gain = audioContext.createGain()
    gain.gain.value = note.gain
    oscillator.connect(gain)
    gain.connect(filter)
    oscillator.start()
    return oscillator
  })

  filter.connect(master)
  master.connect(audioContext.destination)
  return { master, oscillators }
}

export function subscribeMusic(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getMusicSnapshot() {
  return playing
}

export function startMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return false

  try {
    if (!context || context.state === "closed") {
      context = new AudioContextClass()
      nodes = createDrone(context)
    }

    const pending = context.resume()
    playing = true
    emit()

    pending
      .then(() => {
        if (!context || context.state !== "running") {
          playing = false
          emit()
        }
      })
      .catch(() => {
        playing = false
        emit()
      })

    return true
  } catch {
    playing = false
    emit()
    return false
  }
}

export function stopMusic() {
  if (!context || !nodes) {
    playing = false
    emit()
    return
  }

  const audioContext = context
  const current = nodes
  const now = audioContext.currentTime
  playing = false
  nodes = null
  emit()

  try {
    current.master.gain.cancelScheduledValues(now)
    current.master.gain.setValueAtTime(Math.max(current.master.gain.value, 0.0001), now)
    current.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
  } catch {
    audioContext.close()
    context = null
    return
  }

  window.setTimeout(() => {
    current.oscillators.forEach((oscillator) => {
      try {
        oscillator.stop()
      } catch {
        /* already stopped */
      }
    })
    audioContext.close()
    if (context === audioContext) context = null
  }, 380)
}
