<template>
    <header class="top-head">
        <div class="top-head-container">
          <img v-if="agent.avatarUri" class="top-head-icon" :alt="agent.displayName" :src="agent.avatarUri">
          <img v-else class="agent-icon" src="https://console.dialogflow.com/api-client/assets/img/logo-short.png" :alt="agent.displayName">
          <div class="top-head-info">
              <div class="top-head-title">{{agent.displayName}}</div>
              <div class="top-head-subtitle">
                Atendimento via chat
              </div>
          </div>
          <slot />
        </div>
    </header>
</template>

<style lang="sass" scoped>
@import '@/style/mixins'

.top-head
    position: fixed
    width: 100%
    display: flex
    z-index: 1
    top: 0
    left: 0

.top-head-container
    max-width: var(--chat-width)
    background-color: var(--primary)
    margin: auto auto
    padding: 12px
    padding-right: 0
    display: flex
    align-items: center
    flex: 1 0 0

.top-head-icon
    border-radius: 8px
    width: 30px
    height: 30px
    object-fit: cover
    background-color: var(--image-background)

.top-head-info
    display: inline-block
    margin-left: 12px
    flex: 1

.top-head-title
    font-size: 18px
    font-weight: 500
    color: var(--text-lighter)
    line-height: 15px

.top-head-subtitle
    color: var(--text-lighter)
    font-size: 14px

.top-head-action
    @include reset
    display: flex
    padding: 8px 14px
    background-color: var(--background)
    border-radius: 20px 0 0 20px
    cursor: pointer
    color: var(--primary)
    transition: padding .25s cubic-bezier(.4, 0, .2, 1)

    &:hover
        padding-right: 20px
</style>

<script>
export default {
    name: 'TopHead',
    props: {
        agent: {
            type: Object,
            default: null
        }
    }
}
</script>
