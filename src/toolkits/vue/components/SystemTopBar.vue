<template>
  <div class="bar">
    <div
      v-for="(item, index) of menu"
      :key="index"
      ref="menuItemRef"
      class="bar-item fdc"
      @click.stop="menuClick(item, index)"
    >
      {{ item.title }}
    </div>
  </div>

  <teleport to="#layout-default">
    <div v-for="(child, index) of childRender" :key="index" ref="childItemRef" class="child">
      <div
        v-for="(item, i) of child"
        :key="i"
        class="child-item"
        @click.stop="childClick(item, index)"
      >
        <span>{{ item.title }}</span>
        <div v-if="item.children?.length" class="child-arrow fdc">
          <el-icon><ArrowRightBold /></el-icon>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
  import { createPopper } from '@popperjs/core'
  import { ArrowRightBold } from '@element-plus/icons-vue'

  const menuItemRef = ref()
  const childItemRef = ref()
  const menu = reactive([
    /**
     * title: string，标题
     * click: function，点击触发
     * children: array，子级
     */
    {
      title: '文件',
      children: [
        { title: '文件' },
        { title: '编辑工程' },
        { title: '选择', children: [{ title: '删除代码' }] },
        { title: '查看', children: [{ title: '打开文件' }] }
      ]
    },
    { title: '编辑', children: [] },
    { title: '选择', children: [] },
    { title: '查看', children: [] }
  ])

  const childRender = reactive([])

  function menuClick (item, index) {
    item.click?.()
    childRender.length = 0
    if (!item.children?.length) return
    childRender.push(item.children)
  }
  function childClick (item, index) {
    item.click?.()
    childRender.splice(index + 1, childRender.length)
    if (!item.children?.length) return
    childRender.push(item.children)
  }
</script>

<style scoped>
  .bar,
  .child {
    z-index: 200;
    color: #e5e5e5;
    font-size: 13.5px;
  }
  .bar {
    background-color: #181818;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: var(--system-top-bar);
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .bar-item {
    margin: 4px 0px;
    padding: 0px 12px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: default;
    user-select: none;
    background-color: #181818;
  }
  .bar-item:hover {
    background-color: #2d2e2e;
  }
  .child-item:hover {
    background-color: #323232;
  }

  .child {
    background-color: #1f1f1f;
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: 240px;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .child-item {
    cursor: pointer;
    user-select: none;
    padding: 6px 28px;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .child-arrow {
    position: absolute;
    right: 7px;
    top: 0px;
    height: 100%;
  }
</style>
