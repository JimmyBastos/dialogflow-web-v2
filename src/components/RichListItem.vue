<template>
    <li class="rich-list-item" tabindex="0">
        <img v-if="imageUri" class="rich-list-item-image" :src="imageUri" :alt="imageTitle">
        <a
            class="rich-list-item-content"
            target="_blank"
            rel="noopener noreferrer"
            :href="uri">
            <div class="rich-list-item-title">{{title}}</div>
            <span class="rich-list-item-description">{{description}}</span>
            <span class="rich-list-item-footer">{{footer}}</span>
        </a>
    </li>
</template>

<style lang="sass" scoped>
.rich-list-item
    cursor: pointer
    overflow: hidden
    padding-top: 16px
    padding-bottom: 16px
    border-bottom: 1px solid var(--border)
    display: block

    &:last-child
        border-bottom: none
        padding-bottom: 0

.rich-list-item-image
    border-radius: 12px
    height: 50px
    width: 50px
    object-fit: cover
    margin-left: 16px
    float: right
    background-color: var(--image-background)

.rich-list-item-content
    display: inline-block
    vertical-align: top
    margin-top: 2.5px
    max-width: 70%
    text-decoration: none

.rich-list-item-title
    font-weight: 500
    color: var(--text)
    line-height: 24px

.rich-list-item-description
    color: var(--text-subtitle)
    line-height: 20px
    font-size: 14px

.rich-list-item-footer
    color: var(--text-secondary)
    margin-top: 6px
    font-size: 12px
    display: block
</style>

<script>
export default {
    name: 'RichListItem',
    props: {
        imageUri: {
            type: String,
            default: null
        },
        imageTitle: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        footer: {
            type: String,
            default: null
        },
        uri: {
            type: String,
            default: null
        }
    }
}
</script>
