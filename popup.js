const onStylesheetURLChange = event => {
  chrome.storage.sync.set({'stylesheetInjetor_stylesheetURL': event.target.value})
}

const onMatchURLChange = event => {
  chrome.storage.sync.set({'stylesheetInjetor_matchURL': event.target.value})
}

const onLocationSelectorChange = event => {
  chrome.storage.sync.set({'stylesheetInjetor_locationSelector': event.target.value})
}

const onEnabledChange = event => {
  chrome.storage.sync.set({'stylesheetInjetor_enabled': event.target.checked})
}

document.addEventListener('DOMContentLoaded', () => {
  // Set initial stylesheet URL value and add event handler
  const stylesheetURLInput = document.getElementById('stylesheetURL')

  chrome.storage.sync.get(['stylesheetInjetor_stylesheetURL'], result => {
    if (typeof result.stylesheetInjetor_stylesheetURL !== 'undefined') {
      stylesheetURLInput.value = result.stylesheetInjetor_stylesheetURL
    }
  })

  stylesheetURLInput.onchange = onStylesheetURLChange

  // Set initial match URL value and add event handler
  const matchURLInput = document.getElementById('matchURL')

  chrome.storage.sync.get(['stylesheetInjetor_matchURL'], result => {
    if (typeof result.stylesheetInjetor_matchURL !== 'undefined') {
      matchURLInput.value = result.stylesheetInjetor_matchURL
    }
  })

  matchURLInput.onchange = onMatchURLChange

  // Set initial location selector value and add event handler
  const locationSelectorInput = document.getElementById('locationSelector')

  chrome.storage.sync.get(['stylesheetInjetor_locationSelector'], result => {
    if (typeof result.stylesheetInjetor_locationSelector !== 'undefined') {
      locationSelectorInput.value = result.stylesheetInjetor_locationSelector
    }
  })

  locationSelectorInput.onchange = onLocationSelectorChange

  // Set initial enabled value and add event handler
  const enabledInput = document.getElementById('enabled')

  chrome.storage.sync.get(['stylesheetInjetor_enabled'], result => {
    if (typeof result.stylesheetInjetor_enabled !== 'undefined') {
      enabledInput.checked = result.stylesheetInjetor_enabled
    }
  })

  enabledInput.onchange = onEnabledChange
}, false)
