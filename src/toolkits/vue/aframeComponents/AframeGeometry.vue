<template>
  <div class="aframe-component-group">
    <div class="aframe-component-item">
      <label>primitive：{{ data.primitive }}</label>
    </div>
    <div style="width: 100px"></div>
  </div>

  <template v-if="data.primitive === 'box'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>width</label>
        <el-input-number v-model="data.width" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>height</label>
        <el-input-number v-model="data.height" size="small" />
      </div>
    </div>

    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>depth</label>
        <el-input-number v-model="data.depth" size="small" />
      </div>
      <div class="aframe-component-item"></div>
    </div>

    <!-- <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsDepth</label>
        <el-input-number v-model="data.segmentsDepth" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsHeight</label>
        <el-input-number v-model="data.segmentsHeight" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsWidth</label>
        <el-input-number v-model="data.segmentsWidth" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div> -->
  </template>

  <template v-else-if="data.primitive === 'sphere'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radius</label>
        <el-input-number v-model="data.radius" size="small" />
      </div>
      <div style="width: 150px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsWidth</label>
        <el-input-number v-model="data.segmentsWidth" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsHeight</label>
        <el-input-number v-model="data.segmentsHeight" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <!-- <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>phiStart</label>
        <el-input-number v-model="data.phiStart" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>phiLength</label>
        <el-input-number v-model="data.phiLength" size="small" />
      </div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>thetaStart</label>
        <el-input-number v-model="data.thetaStart" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>thetaLength</label>
        <el-input-number v-model="data.thetaLength" size="small" />
      </div>
    </div> -->
  </template>

  <template v-else-if="data.primitive === 'circle'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radius</label>
        <el-input-number v-model="data.radius" size="small" />
      </div>
      <div style="width: 150px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segments</label>
        <el-input-number v-model="data.segments" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>

    <!-- <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>thetaStart</label>
        <el-input-number v-model="data.thetaStart" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>thetaLength</label>
        <el-input-number v-model="data.thetaLength" size="small" />
      </div>
    </div> -->
  </template>

  <template v-else-if="data.primitive === 'cylinder'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radius</label>
        <el-input-number v-model="data.radius" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>height</label>
        <el-input-number v-model="data.height" size="small" />
      </div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>openEnded</label>
        <el-switch v-model="data.openEnded" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsRadial</label>
        <el-input-number v-model="data.segmentsRadial" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>

    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsHeight</label>
        <el-input-number v-model="data.segmentsHeight" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>

    <!-- <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>thetaStart</label>
        <el-input-number v-model="data.thetaStart" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>thetaLength</label>
        <el-input-number v-model="data.thetaLength" size="small" />
      </div>
    </div> -->
  </template>

  <template v-else-if="data.primitive === 'dodecahedron'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radius</label>
        <el-input-number v-model="data.radius" size="small" />
      </div>
      <div style="width: 150px"></div>
    </div>
  </template>
  <template v-else-if="data.primitive === 'octahedron'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radius</label>
        <el-input-number v-model="data.radius" size="small" />
      </div>
      <div style="width: 150px"></div>
    </div>
  </template>
  <template v-else-if="data.primitive === 'plane'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>width</label>
        <el-input-number v-model="data.width" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>height</label>
        <el-input-number v-model="data.height" size="small" />
      </div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsWidth</label>
        <el-input-number v-model="data.segmentsWidth" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsHeight</label>
        <el-input-number v-model="data.segmentsHeight" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
  </template>
  <template v-else-if="data.primitive === 'ring'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radiusInner</label>
        <el-input-number v-model="data.radiusInner" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radiusOuter</label>
        <el-input-number v-model="data.radiusOuter" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsTheta</label>
        <el-input-number v-model="data.segmentsTheta" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <!-- <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsPhi</label>
        <el-input-number v-model="data.segmentsPhi" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>thetaStart</label>
        <el-input-number v-model="data.thetaStart" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>thetaLength</label>
        <el-input-number v-model="data.thetaLength" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div> -->
  </template>
  <template v-else-if="data.primitive === 'tetrahedron'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radius</label>
        <el-input-number v-model="data.radius" size="small" />
      </div>
      <div style="width: 150px"></div>
    </div>
  </template>
  <template v-else-if="data.primitive === 'torus'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radius</label>
        <el-input-number v-model="data.radius" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>arc</label>
        <el-input-number v-model="data.arc" size="small" />
      </div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radiusTubular</label>
        <el-input-number v-model="data.radiusTubular" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsRadial</label>
        <el-input-number v-model="data.segmentsRadial" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsTubular</label>
        <el-input-number v-model="data.segmentsTubular" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
  </template>
  <template v-else-if="data.primitive === 'torusKnot'">
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>p</label>
        <el-input-number v-model="data.p" size="small" />
      </div>
      <div class="aframe-component-item">
        <label>q</label>
        <el-input-number v-model="data.q" size="small" />
      </div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radius</label>
        <el-input-number v-model="data.radius" size="small" />
      </div>
      <div style="width: 150px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>radiusTubular</label>
        <el-input-number v-model="data.radiusTubular" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsRadial</label>
        <el-input-number v-model="data.segmentsRadial" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
    <div class="aframe-component-group">
      <div class="aframe-component-item">
        <label>segmentsTubular</label>
        <el-input-number v-model="data.segmentsTubular" size="small" />
      </div>
      <div style="width: 80px"></div>
    </div>
  </template>
</template>

<script setup>
  const props = defineProps({
    object: { type: Object, required: true }
  })
  const data = reactive(props.object.data)

  watch(() => Object.entries(data), update)

  function update () {
    props.object.el.setAttribute(props.object.attrName, data)
  }
</script>
