function addScriptsToPage(window, arr) {
  if (typeof window === 'undefined') {
    return
  }
  const loadedScripts = []
  const queue = []
  arr.forEach((scriptObj, i) => {
    const s = window.document.createElement('SCRIPT')
    if (scriptObj.src) {
      s.onload = function(e) {
        loadedScripts.push(scriptObj.src)
        loadCallback()
      }
      s.src = scriptObj.src
      window.document.body.appendChild(s)
    } else if (scriptObj.html) {
      if (scriptObj.dependencies && scriptObj.dependencies.length > 0) {
        queue.push({
          obj: scriptObj,
          run: function() {
            s.innerHTML = scriptObj.html
            window.document.body.appendChild(s)
          }
        })
      } else {
        s.innerHTML = scriptObj.html
        window.document.body.appendChild(s)
      }
    }
  })

  function loadCallback(e) {
    queue.forEach((q) => {
      const resolved = q.obj.dependencies.every((d) => {
        return loadedScripts.indexOf(d.src) !== -1
      })
      if (resolved) {
        q.run()
      }
    })
  }
}

export { addScriptsToPage }
