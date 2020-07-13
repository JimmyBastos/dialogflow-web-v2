<template>
    <div class="error-message">
        <!-- Error Icon -->
        <v-icon name="alert-circle  error-message-icon"/>

        <!-- Error Description -->
        <pre class="error-message-description">{{error}}</pre>
    </div>
</template>

<style lang="sass" scoped>
.error-message
    text-align: center

.error-message-icon
    width: 128px
    color: var(--text)
    margin-bottom: 30px

.error-message-description
    font-size: 16px
    color: var(--text)
    background-color: var(--element-background)
    padding: 16px
    border-radius: 16px
    overflow: scroll
</style>

<script>
export default {
    name: 'ErrorMessage',
    props: {
        error: {
            type: String,
            default: null
        }
    }
}
</script>
