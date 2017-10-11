'use strict'

function clearHistory (window) {
  window._sessionHistory._entries.splice(0, Infinity)
  window._sessionHistory._currentIndex = 0
}

module.exports = clearHistory
