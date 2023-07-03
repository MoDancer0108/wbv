学习vue3用的demo
同时仿照某厂的react vista框架
示例/views/Home
视图组件/wbv

wbv todo
<!-- 1.model的methods、未渲染到视图层的data都没法用 -->
2.FormSlot中的form-item使用v-model直接暴露了ctx中存储formModel的变量
3.HeadSlot未开发
<!-- 4.el-pagination未继承属性 -->

vue3
1.数据中心想要实现响应需要使用computed, template中使用num即可, script中使用num.value
    const num = computed(() => $data.getData('num'));
2.数据中心的get都做了深拷贝, 只能通过set来赋值
3.命名全部使用首字母不大写的驼峰, template中使用短横隔线