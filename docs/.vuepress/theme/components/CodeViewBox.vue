<template>
    <div class="code-view-box">
        <h3 v-if="props.url">{{ title }}</h3>
        <iframe v-if="props.url" :src="url" :width="props.width" :height="props.height"
            style="border:0; border-radius: 8px; overflow:hidden;" title="Project example"></iframe>
        <div v-else style="display: flex;height: 400px;width: 100%;align-items: center;justify-content: center;">
            <p style="color: var(--vp-c-text-2);">请从 <a href="https://codesandbox.io/" target="_blank">codesandbox</a>、
                <a href="https://stackblitz.com/" target="_blank">stackblitz</a>获取分享链接，并向组件传入 url</p>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    title?: string
    url: string
    width?: string
    height?: string
}>(), {
    title: '代码示例',
    width: '100%',
    height: '500px'
})

</script>

<style scoped>
.code-view-box {
    padding: 12px;
    border-radius: 8px;
    background-color: var(--vp-code-block-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.code-view-box>h3 {
    font-size: 18px;
    color: var(--vp-c-text-2);
    margin: 6px 0;
}
</style>