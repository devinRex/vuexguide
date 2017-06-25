<template>
    <div id="app" style="height:100%;">
        <view-box ref="viewBox" body-padding-bottom="0">
            <!--<transition name="slide">-->
            <keep-alive>
                <router-view class="router-view"></router-view>
            </keep-alive>
            <!--</transition>-->

            <ajax-loading block></ajax-loading>
        </view-box>
    </div>
</template>

<script lang="babel">
    import { TransferDom, ViewBox } from 'vux';
    import AjaxLoading from '@/components/AjaxLoading';

    export default {
        name: 'app',
        directives: {
            TransferDom,
        },
        components: {
            ViewBox,
            AjaxLoading,
        },
    };
</script>

<style lang="less">
    @import "./assets/index";
</style>
