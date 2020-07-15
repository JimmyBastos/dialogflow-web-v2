<template>
    <a class="rich-card-button" target="_blank" rel="noopener noreferrer" :href="uri">
        <span class="rich-card-button-title">{{title}}</span>
        <v-icon class="rich-card-button-icon" :class="uri ? 'external-link' : 'corner-up-left'" />
    </a>
</template>

<style lang="sass" scoped>
.rich-card-button
    text-decoration: none
    line-height: 24px
    color: var(--text)
    border: 1px solid var(--border)
    border-radius: 40px
    display: block
    font-weight: 500
    padding: 8px 16px
    text-align: center
    position: relative
    margin-top: 16px
    cursor: pointer

    &[href]
        color: var(--accent)

.rich-card-button-icon
    right: 0
    margin-right: 12px
    position: absolute
</style>

<script>
export default {
    name: 'RichCardButton',
    props: {
        uri: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        }
    }
}
</script>
