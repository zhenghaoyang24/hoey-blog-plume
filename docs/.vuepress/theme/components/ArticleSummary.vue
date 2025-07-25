<template>
    <div class="article-summary">
        <div class="article-summary-header">
            <icon name="ph:open-ai-logo" size="23" />
            <h3>文章摘要</h3>
        </div>
        <div class="article-summary-content">
            awfe
        </div>

    </div>
</template>

<script>
export default {
    props: {
        articleContent: {
            type: String,
            required: true
        },
        apiUrl: {
            type: String,
            default: '/api/summarize'
        },
        length: {
            type: String,
            default: 'medium', // short, medium, long
            validator: value => ['short', 'medium', 'long'].includes(value)
        }
    },
    data() {
        return {
            summary: '',
            isLoading: false,
            error: null
        }
    },
    methods: {
        async generateSummary() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await this.$axios.post(this.apiUrl, {
                    text: this.articleContent,
                    length: this.length
                });

                this.summary = response.data.summary;
            } catch (err) {
                console.error('生成摘要失败:', err);
                this.error = '生成摘要失败，请稍后再试';
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>

<style scoped>
.article-summary {
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid var(--main-card-border);
    box-shadow: 0 0 10px 1px var(--ai-summary-shadow-color);
    overflow: hidden;
    transition: all 0.2s ease-in-out;

    &:hover {
        box-shadow: 0 0 7px 2px var(--vp-blog-post-item-hover-shadow) !important;
        border: 1px var(--vp-blog-post-item-hover-border) solid;
    }
}

.article-summary-header {
    display: flex;
    align-items: center;

    &>h3 {
        margin: 0;
        padding: 0;
    }

    &>.vp-icon {
        margin: 0;
    }
}
.article-summary-content{
    border: 1px solid var(--main-card-border);
}

</style>