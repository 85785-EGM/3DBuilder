/**
 * 选择一个文件
 */
export default async function selectFile (options = {}) {
  const file = document.createElement('input')
  file.setAttribute('type', 'file')
  file.setAttribute('accept', options.accept)
  file.setAttribute('style', 'display: none;')
  if (options.multiple) file.setAttribute('multiple', 'multiple')
  document.body.appendChild(file)
  file.click()

  return new Promise((resolve, reject) => {
    file.onchange = () => {
      resolve(file.files?.[0])
      setTimeout(() => file.remove(), 100)
    }
    file.oncancel = () => {
      reject(new Error('no file selected'))
      setTimeout(() => file.remove(), 100)
    }
  })
}
