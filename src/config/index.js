export default {
    // endpoint: 'https://dialogflow-web-v2.core.ushaflow.io', // <- enter your gateway URL here
    endpoint: 'http://localhost:3333/agent/172faaf2-b7a4-4039-8b41-cbda0a7e4fe0', // <- enter your gateway URL here
    muted: false, // <- mute microphone at start
    start_suggestions: [], // <- array of suggestions, displayed at the start screen
    fallback_lang: 'en', // <- fallback language code, if history mode or network is unavailable
    voice: 'native', // <- voice of Text-To-Speech; for reference, see: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/voiceURI,
    audio_encoding: 'audio/mp3' // <- Dialogflow Automatic Text to Speech audio encoding (MIME type)
}
