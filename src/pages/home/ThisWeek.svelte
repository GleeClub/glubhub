<script lang="ts">
  import { onMount } from "svelte";
  import { UserGradesEvent } from "state/types";
  import { renderRoute } from "route/render";
  import { routeEvents } from "route/constructors";
  import { scaleTime } from "d3-scale";
  import { select } from "d3-selection";
  import { axisLeft } from "d3-axis";
  import { timeMonday } from "d3-time";
  import { timeFormat } from "d3-time-format";

  export let events: UserGradesEvent[];

  let d3Element: SVGElement;

  const height = 500;
  const circleX = 100;
  const circleRadius = 9;
  const circleLineWidth = 2;
  const timelineLineWidth = 5;

  // this needs to go from monday to sunday
  const now = new Date();
  const monday = timeMonday(now);
  const sunday = new Date(monday.getTime() + 7 * 86400000 - 1);

  const y = scaleTime().range([height - 20, 10]);
  y.domain([sunday, monday]);

  const tooCloseToPrevious = (index: number) =>
    index && y(new Date(events[index].event.callTime)) - y(new Date(events[index - 1].event.callTime)) <= 20;

  onMount(() => {
    const timeline = select(d3Element);

    timeline
      .append("g")
      .attr("transform", `translate(${circleX - 1}, 0)`)
      .call(
        axisLeft(y)
          .ticks(7)
          .tickFormat(date => timeFormat("%a")(date as Date))
          .tickSizeOuter(0)
      );
  });

  function linkYPosition(index: number) {
    if (tooCloseToPrevious(index)) {
      return y(new Date(events[index - 1].event.callTime)) + 16 + circleRadius / 2.0;
    } else {
      return y(new Date(events[index].event.callTime)) + circleRadius / 2.0;
    }
  }
</script>

<svg height={height}>
  <g bind:this={d3Element} />
  <g>
    {#each events as event, eventIndex}
      <circle
        class="dot"
        r={circleRadius}
        stroke-width={circleLineWidth}
        cx={circleX}
        cy={
          tooCloseToPrevious(eventIndex)
            ? -1 * circleRadius
            : y(new Date(event.event.callTime))
        }
      />
    {/each}
  </g>

  <g>
    <circle
      class="dot now"
      r={timelineLineWidth / 2}
      cx={circleX - 0.5}
      cy={y(now)}
    />
  </g>

  <g>
    {#each events as event, index}
      <foreignObject
        x={circleX + 15}
        y={linkYPosition(index) - 16}
        height={22}
        width={300}
      >
        <a href={renderRoute(routeEvents(event.event.id, null))}>
          {event.event.name}
        </a>
      </foreignObject>
    {/each}
  </g>
</svg>
