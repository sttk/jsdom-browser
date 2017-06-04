'use strict'

function clearHistory (window) {
  window._sessionHistory.splice(0, Infinity)
  window._currentSessionHistoryEntryIndex = 0
}

module.exports = clearHistory
