<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :stroke="stroke">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="3">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18" :stroke="backgroundStroke"></circle>
        <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(123.351 18 18)">
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
        </path>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'ComponentsSVG',
  props: {
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 20
    },
    viewBox: {
      type: String,
      default: '-1 -1 40 40'
    },
    stroke: {
      type: String,
      default: '#0081ff'
    },
    backgroundStroke: {
      type: String,
      default: '#adb9c5'
    }
  }
}
</script>
