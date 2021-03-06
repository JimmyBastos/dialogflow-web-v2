<template>
    <div class="chat-field">
        <div class="chat-field-container">
            <!-- Here are the suggestions -->
            <div class="chat-field-suggestions"><slot /></div>
            <div class="chat-field-flexible">
                <!-- Text input -->
                <input
                    v-model="query"
                    class="chat-field-input"
                    type="text"
                    autofocus
                    :placeholder="(translations[lang()] && translations[lang()].inputTitle) || translations[config.fallback_lang].inputTitle"
                    :aria-label="(translations[lang()] && translations[lang()].inputTitle) || translations[config.fallback_lang].inputTitle"
                    @keypress.enter="submit({text: query})"
                    @focus="microphone = false; should_listen = false">

                <!-- Send message button (arrow button) -->
                <transition name="chat-field-animation" mode="out-in">
                    <button
                        v-if="!microphone && query.length > 0 || !microphone_supported"
                        key="send"
                        class="chat-field-action"
                        :title="(translations[lang()] && translations[lang()].sendTitle) || translations[config.fallback_lang].sendTitle"
                        :aria-label="(translations[lang()] && translations[lang()].sendTitle) || translations[config.fallback_lang].sendTitle"
                        @click="submit({text: query})">
                        <v-icon name="send" />
                    </button>

                    <!-- Microphone Button -->
                    <button
                        v-else
                        key="microphone"
                        class="chat-field-action"
                        :aria-label="(translations[lang()] && translations[lang()].microphoneTitle) || translations[config.fallback_lang].microphoneTitle"
                        :title="(translations[lang()] && translations[lang()].microphoneTitle) || translations[config.fallback_lang].microphoneTitle"
                        :class="{'mic_active': microphone}"
                        @click="microphone = !microphone">
                        <v-icon name="mic" />
                    </button>
                </transition>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import '@/style/mixins'

.chat-field
    position: fixed
    bottom: 0
    left: 0
    width: 100%

.chat-field-container
    background-color: var(--background)
    border-top: 1px solid var(--border)
    max-width: var(--chat-width)
    margin: auto auto
    padding: 12px

.chat-field-flexible
    display: flex

.chat-field-suggestions
    overflow-x: scroll
    overflow-y: hidden
    white-space: nowrap
    -webkit-overflow-scrolling: touch

    &::-webkit-scrollbar
        display: none

.chat-field-input
    font-size: 16px
    font-weight: 500
    width: 100%
    border: none
    padding: 10px 12px
    color: var(--text)
    border-radius: 40px
    flex: 1 0 0
    background-color: var(--element-background)

    &:focus
        background-color: transparent

.chat-field-action
    @include reset
    margin-left: 6px
    border-radius: 50%
    cursor: pointer
    background-color: var(--primary)
    color: var(--text-lighter)
    font-size: 24px
    width: 48px
    height: 48px
    display: flex
    align-items: center
    justify-content: center

    &.mic_active
        background-color: #F44336
        color: white

.chat-field-animation-enter-active, .chat-field-animation-leave-active
    transition: all .15s cubic-bezier(.4, 0, .2, 1)

.chat-field-animation-enter, .chat-field-animation-leave-to
    transform: scale(0)
    opacity: 0
</style>

<script>
import AudioRecorder from 'audio-recorder-polyfill'
import * as hark from 'hark'

window.MediaRecorder = AudioRecorder

export default {
    name: 'ChatField',
    data(){
        return {
            query: '',
            microphone: false,
            recognition: null,
            recorder: null,
            should_listen: false
        }
    },
    computed: {
        microphone_supported(){
            return window.webkitSpeechRecognition || window.SpeechRecognition || !window.MediaRecorder.notSupported
        }
    },
    watch: {
        /* Toggle microphone */
        microphone(activate){
            if (activate){
                this.should_listen = true
                this.$emit('listening')

                if (window.webkitSpeechRecognition || window.SpeechRecognition){
                    this.recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition()
                    this.recognition.interimResults = true
                    this.recognition.lang = this.lang()
                    this.recognition.onresult = event => {
                        for (let i = event.resultIndex; i < event.results.length; ++i){
                            this.query = event.results[i][0].transcript // <- push results to the Text input
                        }
                    }

                    this.recognition.onend = () => {
                        this.recognition.stop()
                        this.microphone = false
                        this.submit({text: this.query}) // <- submit the result
                    }

                    this.recognition.onerror = () => this.microphone = false
                    this.recognition.start()
                }

                else if (window.MediaRecorder){
                    if (window.MediaRecorder){
                        navigator.mediaDevices.getUserMedia({audio: true})
                        .then(stream => {
                            this.recorder = new window.MediaRecorder(stream)
                            this.recorder.addEventListener('dataavailable', recording => {
                                const reader = new FileReader()
                                reader.readAsDataURL(recording.data)
                                reader.onloadend = () => {
                                    this.submit({audio: reader.result.replace(/^data:.+;base64,/, '')})
                                }
                            })

                            hark(this.recorder.stream).on('stopped_speaking', () => this.microphone = false) // <- Speech end detection
                            this.recorder.start()
                        })
                        .catch(() => this.microphone = false)
                    }
                }
            }

            else if (this.recognition) this.recognition.abort()
            else if (this.recorder) this.recorder.stop()
        }
    },
    methods: {
        listen(){
            if (this.should_listen) this.microphone = true
        },
        submit(submission){
            if (submission.text && submission.text.length > 0){
                this.$emit('submit', submission)
                this.query = ''
            }

            else if (submission.audio) this.$emit('submit', submission)
        }
    }
}
</script>
