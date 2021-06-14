<script lang='ts'>
  export let size = 100
</script>

<div class="text-center" >
  <svg width={size + 'px'} height={size + 'px'} xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 ' + size + ' ' + size} preserveAspectRatio="xMidYMid" class="uil-ripple">
    <rect x="0" y="0" width={size} height={size} fill="none" class="bk"></rect>
    <g> 
      <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="1;1;0">
      </animate>
      <circle cx="50" cy="50" r="40" stroke="#5cffd6" fill="none" stroke-width="8" stroke-linecap="round">
        <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="0;22;44"></animate>
      </circle>
    </g>
    <g>
      <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="1;1;0"></animate>
      <circle cx="50" cy="50" r="40" stroke="#75bf41" fill="none" stroke-width="8" stroke-linecap="round">
        <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="0;22;44"></animate>
      </circle>
    </g>
  </svg>
</div>
