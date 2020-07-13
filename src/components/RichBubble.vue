<template>
    <div class="rich-bubble-container">
      <div v-if="!me" class="rich-bubble-avatar">
        <img :src="avatarUri ||require('@/assets/img/avatar.png')" alt="Avatar">
      </div>
      <div
        class="rich-bubble"
        tabindex="0"
        :class="{'me': me, 'loading': loading}"
      >
        {{text}}
      </div>
    </div>
</template>

<style lang="sass" scoped>
.rich-bubble-container
  display: flex
  position: relative
  flex-grow: 0

  .rich-bubble-avatar
    max-width: 40px
    height: 40px
    width: 100%
    overflow: hidden
    border-radius: 50%
    margin-right: 12px

    img
      height: 100%
      width: auto

.rich-bubble
    position: relative
    padding: 12px
    border-radius: 8px
    color: var(--text)
    background-color: var(--element-background)
    min-width: 32px
    border-top-left-radius: 0

    outline: none
    box-shadow: var(--shadow)

    &::before
      display: block
      transform: rotate(180deg)
      left: -3px
      border: solid transparent
      content: " "
      height: 0
      position: absolute
      pointer-events: none
      border-bottom-color: var(--element-background)
      border-width: 9px
      margin-left: -4px
      opacity: 1
      top: 0

    &.me
        background-color: var(--primary)
        color: var(--text-lighter)
        border-top-left-radius: 8px
        border-top-right-radius: 0

        &::before
          left: initial
          margin-left: inital
          right: -3px
          border-bottom-color: var(--primary)
          margin-right: -4px

    &.loading
        height: 16px
        animation: loading .8s cubic-bezier(.4, 0, .2, 1) infinite

@keyframes loading
    0%
        opacity: 0
    50%
        opacity: 1
    100%
        opacity: 0
</style>

<script>
export default {
    name: 'RichBubble',
    props: {
        avatarUri: {
          type: String,
          required: false
        },

        text: {
            type: String,
            required: false,
            default: ''
        },
        me: {
            type: Boolean
        },
        loading: {
            type: Boolean
        }
    }
}
</script>
