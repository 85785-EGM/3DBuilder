<template>
  <div class="bar">
    <div
      v-for="(item, index) of menu"
      :key="index"
      ref="menuItemRef"
      class="bar-item fdc"
      @click.stop="menuClick(item, index)"
      @pointerover.stop="
        () => (popperRender.length && item.children?.length ? menuClick(item, index) : 0)
      "
    >
      {{ item.title }}
    </div>
  </div>

  <div v-for="(child, index) of childRender" :key="index" ref="childItemRef" class="child">
    <div
      v-for="(item, i) of child"
      :key="i"
      class="child-item"
      @pointerover.stop="childOver(item, index)"
      @click.stop="childClick(item, index)"
    >
      <span>{{ item.title }}</span>
      <div v-if="item.children?.length" class="child-arrow fdc">
        <el-icon><ArrowRightBold /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { createPopper } from '@popperjs/core'
  import { ArrowRightBold } from '@element-plus/icons-vue'
  import createCube from '@/utils/aframe/createCube.ts'
  import importModel from '@/utils/aframe/importModel.ts'

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
        {
          title: '导入',
          children: [
            { title: 'GLTF ( .glb/.gltf )', click: importModel.bind(window, 'gltf') },
            { title: 'PLY ( .ply )', click: importModel.bind(window, 'ply') },
            { title: 'STL ( .stl )', click: importModel.bind(window, 'stl') }
          ]
        }
      ]
    },
    {
      title: '编辑',
      children: [
        {
          title: '添加',
          children: [
            { title: '四方体', click: createCube.bind(window, 'box') },
            { title: '球', click: createCube.bind(window, 'sphere') }
          ]
        }
      ]
    },
    { title: '查看' }
  ])

  const childRender = reactive([])
  const popperRender = reactive([])

  async function menuClick (item, index) {
    item.click?.()
    reset()
    if (!item.children?.length) {
      reset()
      return
    }
    childRender.push(item.children)
    await nextTick()

    const buttonNode = menuItemRef.value[index]
    const tooltipNode = childItemRef.value[0]

    const popper = createPopper(buttonNode, tooltipNode, {
      placement: 'bottom-start'
    })
    popperRender.push(popper)
    popper.update()
  }
  async function childOver (item, index) {
    reset(index + 1)
    if (!item.children?.length) return
    childRender.push(item.children)
    await nextTick()

    const buttonNode = childItemRef.value[index].children[childRender[index].indexOf(item)]
    const tooltipNode = childItemRef.value[index + 1]

    const popper = createPopper(buttonNode, tooltipNode, {
      placement: 'right-start',
      modifiers: [{ name: 'offset', options: { offset: [-5, 3] } }]
    })
    popperRender.push(popper)
    popper.update()
  }

  async function childClick (item, index) {
    item.click?.()
    if (!item.children?.length) reset()
  }

  function reset (index = 0) {
    childRender.splice(index, childRender.length)
    popperRender.splice(index, popperRender.length).forEach(p => p.destroy())
  }

  defineExpose({ reset })
</script>

<style scoped>
  /* .bar,
  .child {
    --bar-background-color: #f8f8f8;
    --bar-hover-background-color: #e4e4e4;
    --child-background-color: #ffffff;
    --child-hover-background-color: #e8e8e8;
    --border-color: #dfdfdf;
    --text-color: #0e0e0e;
  } */

  .bar,
  .child {
    z-index: 200;
    color: var(--system-top-bar-text-color);
    font-size: 13px;
    box-sizing: border-box;
  }
  .bar {
    background-color: var(--system-top-bar-background-color);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: var(--system-top-bar-height);
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    border-bottom: 1px solid var(--system-top-bar-border-color);
  }
  .bar-item {
    margin: 4px 0px;
    padding: 0px 12px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: default;
    user-select: none;
    background-color: var(--system-top-bar-background-color);
  }
  .bar-item:hover {
    background-color: var(--system-top-bar-hover-background-color);
  }
  .child-item:hover {
    background-color: var(--system-top-bar-child-hover-background-color);
  }

  .child {
    z-index: 201;
    background-color: var(--system-top-bar-child-background-color);
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: 240px;
    padding: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid var(--system-top-bar-border-color);
  }
  .child-item {
    cursor: pointer;
    user-select: none;
    padding: 6px 28px;
    border-radius: 4px;
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
