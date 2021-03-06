import '../css/bulma.css'
import '../css/bulma-extensions.min.css'
import '../css/style.css'
import { Elm } from './Main.elm'
import * as Tone from './Tone'
import pell from './pell.min'
import * as serviceWorker from './serviceWorker'
import { setupTimeline } from './timeline'

const tokenName = 'grease-token'
const oldTokenName = 'old-grease-token'

var storedState = localStorage.getItem(tokenName)
var app = Elm.Main.init({
  flags: storedState,
  node: document.getElementById('root'),
})
var synth = new Tone.Synth().toMaster()

app.ports.setToken.subscribe(function(token) {
  if (token) {
    localStorage.setItem(tokenName, token)
  } else {
    const oldToken = localStorage.getItem(oldTokenName)
    if (oldToken) {
      localStorage.removeItem(oldTokenName)
      localStorage.setItem(tokenName, oldToken)
    } else {
      localStorage.removeItem(tokenName)
    }
  }
})
app.ports.setOldToken.subscribe(function(oldToken) {
  if (oldToken) {
    localStorage.setItem(oldTokenName, oldToken)
  } else {
    localStorage.removeItem(oldTokenName)
  }
})
app.ports.alert.subscribe(function(alertMessage) {
  alert(alertMessage)
})
app.ports.scrollToElement.subscribe(function(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
})
app.ports.playPitch.subscribe(function(halfStepsFromA) {
  synth.triggerAttackRelease(Tone.Midi('A4').transpose(halfStepsFromA), '1n')
})
app.ports.copyContent.subscribe(function(elementId) {
  document.querySelector('#' + elementId).select()
  document.execCommand('copy')
})
app.ports.deployEditor.subscribe(function(editorInit) {
  setTimeout(() => {
    const editorElement = document.getElementById(editorInit.elementId)
    if (!editorElement) {
      return
    }
    // if the editor already exists, just fill it with HTML
    if (editorElement.childElementCount > 1) {
      editorElement.children[1].innerHTML = editorInit.content
      return
    }

    const editor = pell.init({
      element: editorElement,
      onChange: html => {
        const element = document.getElementById(editorInit.elementId)
        if (element) {
          element.dispatchEvent(new InputEvent('oninput', { data: html }))
        }
      },
    })
    editor.content.innerHTML = editorInit.content
  }, 50)
})
app.ports.setupTimeline.subscribe(function inner(id) {
  setTimeout(() => {
    setupTimeline(id)
  }, 500)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
