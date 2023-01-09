const formatTime = (): string => {
  const date: Date = new Date()

  const format = date.toLocaleTimeString('es-CO', {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  })

  return format
}

export default formatTime