function addScriptsToPage(window, arr) {
  if (typeof window === 'undefined') {
    return
  }
  const loadedScripts = []
  let queue = []
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
    // let remaining = queue
    // queue.forEach((q, i) => {
    //   const resolved = q.obj.dependencies.every((d) => {
    //     return loadedScripts.indexOf(d.src) !== -1
    //   })
    //   if (resolved) {
    //     q.run()
    //   }
    // })

    let i = 0
    while (i < queue.length && i < 10) {
      console.log(queue[i], i);
      const resolved = queue[i].obj.dependencies.every((d) => {
        return loadedScripts.indexOf(d.src) !== -1
      })
      if (resolved) {
        queue[i].run()
        queue = queue.splice(i, 1)
        i--
        break
      }
      i++
    }

  }
}

export { addScriptsToPage }
