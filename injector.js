let currentEnabled, currentStylesheetURL, currentMatchURL, currentLocationSelector

setInterval(() => {
  try {
    let enabled, stylesheetURL, matchURL, matchURLRegex, locationSelector

    // Get and set enabled status
    chrome.storage.sync.get(['stylesheetInjetor_enabled'], result => {
      if (typeof result.stylesheetInjetor_enabled !== 'undefined') {
        enabled = result.stylesheetInjetor_enabled
      }

      // Get and set stylesheet URL
      chrome.storage.sync.get(['stylesheetInjetor_stylesheetURL'], result => {
        if (typeof result.stylesheetInjetor_stylesheetURL !== 'undefined') {
          stylesheetURL = result.stylesheetInjetor_stylesheetURL
        }

        // Get and set match URL and create regex from it
        chrome.storage.sync.get(['stylesheetInjetor_matchURL'], result => {
          if (typeof result.stylesheetInjetor_matchURL !== 'undefined') {
            matchURL = result.stylesheetInjetor_matchURL
            matchURLRegex = new RegExp(matchURL, 'g')
          }

          // Get and set location selector
          chrome.storage.sync.get(['stylesheetInjetor_locationSelector'], result => {
            locationSelector = result.stylesheetInjetor_locationSelector

            // If stylesheet injection is enabled and there is a stylesheet URL and a match URL and the current URL matches the match URL then inject the stylesheet, otherwise remove the injected stylesheet
            if (enabled && stylesheetURL && matchURL && window.location.href.match(matchURLRegex)) {
              injectStylesheet(enabled, stylesheetURL, matchURL, locationSelector)
            } else {
              removeInjectedStylesheet()
            }
          })
        })
      })
    })
  } catch (err) {
    console.log(err)
    removeInjectedStylesheet()
  }
}, 1500)

function removeInjectedStylesheet () {
  // Remove injected stylesheet and warning and reset current settings
  const linkTag = document.getElementById('stylesheetInjetor_linkTag')
  const warning = document.getElementById('stylesheetInjetor_warning')
  if (linkTag !== null) linkTag.outerHTML = ''
  if (warning !== null) warning.outerHTML = ''
  currentEnabled = null
  currentStylesheetURL = null
  currentMatchURL = null
  currentLocationSelector = null
}

function injectStylesheet (enabled, stylesheetURL, matchURL, locationSelector) {
  // Inject stylesheet and add warning if the passed in settings are not the same as the current settings in place
  if (enabled !== currentEnabled || stylesheetURL !== currentStylesheetURL || matchURL !== currentMatchURL || locationSelector !== currentLocationSelector) {
    removeInjectedStylesheet()

    currentEnabled = enabled
    currentStylesheetURL = stylesheetURL
    currentMatchURL = matchURL
    currentLocationSelector = locationSelector

    const body = document.getElementsByTagName('body')[0]

    // Add bar to top to show that the extension is trying to theme the page
    const warning = document.createElement('div')
    warning.style.backgroundColor = 'rgba(255,0,0,0.8)'
    warning.style.color = 'white'
    warning.style.textAlign = 'center'
    warning.style.padding = '10px'
    warning.style.position = 'fixed'
    warning.style.top = '0px'
    warning.style.left = '0px'
    warning.style.width = '100%'
    warning.style.zIndex = '999999999'
    warning.style.fontSize = '12px'
    warning.innerHTML = `The <em>Stylesheet injector</em> Chrome extension is currently trying to add styles to this page from <em>${stylesheetURL}</em>.`
    warning.id = 'stylesheetInjetor_warning'
    body.appendChild(warning)

    const link = document.createElement('link')
    link.id = 'stylesheetInjetor_linkTag'
    link.rel = 'stylesheet'
    link.href = stylesheetURL

    if (typeof locationSelector !== 'undefined' && locationSelector.trim().length && document.querySelector(locationSelector) !== null) {
      insertAfter(link, document.querySelector(locationSelector))
    } else {
      body.appendChild(link)
    }
  }
}

function insertAfter (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}
