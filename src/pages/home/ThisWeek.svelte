<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let d3Element: SVGElement;

  const height = 500;
  const circleX = 100;
  const circleRadius = 9;
  const circleLineWidth = 2;
  const timelineLineWidth = 5;

  // this needs to go from monday to sunday
  const now = new Date();
  const monday = d3.timeMonday(now);
  const sunday = new Date(monday.getTime() + 7 * 86400000 - 1);

  const y = d3.scaleTime().range([height - 20, 10]);
  y.domain([sunday, monday]);

  const tooCloseToPrevious = (event: GlubEvent, index: number) =>
    index && y(event.callTime) - y(events[index - 1].callTime) <= 20;

  useEffect(() => {
    const timeline = d3.select(d3Container.current);

    timeline
      .append("g")
      .attr("transform", `translate(${circleX - 1}, 0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(7)
          .tickFormat(date => d3.timeFormat("%a")(date as Date))
          .tickSizeOuter(0)
      );
  }, [events, y]);
</script>

<svg height={height}>
  <g ref={d3Container} />
  <g>
    {#each events as event, eventIndex}
      <circle
        class="dot"
        r={circleRadius}
        strokeWidth={circleLineWidth}
        cx={circleX}
        cy={
          tooCloseToPrevious(event, eventIndex)
            ? -1 * circleRadius
            : y(event.event.callTime)
        }
      />
    {/each}
  </g>

  <g>
    <circle
      className="dot now"
      r={timelineLineWidth / 2}
      cx={circleX - 0.5}
      cy={y(now)}
    />
  </g>

  <g>
    {events.map((event, index) => {
      let yPosition: number;
      if (tooCloseToPrevious(event, index)) {
        yPosition = y(events[index - 1].callTime) + 16 + circleRadius / 2.0;
      } else {
        yPosition = y(event.callTime) + circleRadius / 2.0;
      }

      return (
        <foreignObject
          x={circleX + 15}
          y={yPosition - 16}
          height={22}
          width={300}
        >
          <a href={renderRoute(routeEvents(event.id, null))}>
            {event.name}
          </a>
        </foreignObject>
      );
    })}
  </g>
</svg>
