<template>
    <div v-transfer-dom>
        <popup v-model="isAjaxLoading" position="top" :hide-on-blur="false" :show-mask="block">
            <div class="ajax-loading">
                <i class="ajax-loading-icon"></i>
                <span class="ajax-loading-text">加载中</span>
            </div>
        </popup>
    </div>
</template>
<script lang="babel">
    import { mapState } from 'vuex';
    import { TransferDom, Popup } from 'vux';

    export default {
        props: {
            block: {
                type: Boolean,
                default: false,
            },
        },
        directives: {
            TransferDom,
        },
        components: {
            Popup,
        },
        computed: {
            ...mapState({
                isAjaxLoading: state => state.page.isAjaxLoading,
            }),
        },
    };
</script>
<style lang="less" scoped>
    .vux-popup-dialog {
        background: none;
    }

    .ajax-loading {
        margin: 10px 15px;
        padding: 11px 5px 12px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 4px;
        text-align: center;
        color: @C9;
        font-size: 14px;

        .ajax-loading-icon {
            display: inline-block;
            vertical-align: middle;
            width: 22px;
            height: 22px;
            background: url(../assets/ic_toast_loading.png);
            -webkit-animation: ajaxLoading 1s linear infinite;
            animation: ajaxLoading 1s linear infinite;
            -webkit-background-size: 100%;
            background-size: 100%;
        }
        .ajax-loading-text {
            display: inline-block;
            vertical-align: middle;
        }

        .ajax-loading-text {
            margin-left: 5px;
        }
    }

    .vux-popup-mask {
        background: rgba(0, 0, 0, 0.3)
    }

    @-webkit-keyframes ajaxLoading {
        0% {
            transform: rotate3d(0, 0, 1, 0deg);
        }

        100% {
            transform: rotate3d(0, 0, 1, 360deg);
        }
    }

    @keyframes ajaxLoading {
        0% {
            transform: rotate3d(0, 0, 1, 0deg);
        }

        100% {
            transform: rotate3d(0, 0, 1, 360deg);
        }
    }
</style>
