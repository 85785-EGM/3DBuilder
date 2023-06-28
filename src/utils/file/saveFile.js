export default function saveFile (blob, filename, opts = {}) {
  const link = document.createElement('a')
  link.style.display = 'none'
  document.body.appendChild(link)
  const url = opts.url ?? URL.createObjectURL(blob)
  link.href = url
  link.download = filename
  link.click()

  function removeEl () {
    URL.revokeObjectURL(url)
    document.body.removeChild(link)
    link.remove()
  }

  setTimeout(removeEl, 100)
}
