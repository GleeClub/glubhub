<script lang="ts">
  import { siteContext } from "store/context";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { GOLD_COLOR } from "utils/constants";
  import { eventIsOver } from "utils/helpers";
  import * as d3 from "d3";

  let graphElement;

  const pastEvents = derived(siteContext, context => context.user?.grades.eventsWithChanges.filter(event => eventIsOver(event.event)) || []);

  const margin = { top: 20, right: 20, bottom: 20, left: 30 };
  const width = 1350;
  const height = 400;

  const x = d3.scaleTime().rangeRound([margin.left, width - margin.right]);
  const y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);
  x.domain(d3.extent(events, event => event.callTime) as [number, number]);
  y.domain([0, 100]);

  onMount(() => {
    if (!d3Container.current || !pastEvents.length) return;

    const svg = d3.select(d3Container.current).html("");

    // create axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(3));
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // draw the line between event grades
    const valueline = d3
      .line<{ callTime: number; partialScore: number }>()
      .x(event => x(event.callTime))
      .y(event => y(Math.max(0, event.partialScore)))
      .curve(d3.curveMonotoneX); // http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
    svg
      .append("path")
      .datum([
        {
          callTime: pastEvents[0].callTime,
          partialScore: 0
        },
        ...pastEvents.map(event => ({
          callTime: event.callTime,
          partialScore: event.change!.partialScore
        })),
        {
          callTime: pastEvents[pastEvents.length - 1].callTime,
          partialScore: 0
        }
      ])
      .attr("class", "line")
      .attr("d", valueline);
  });
</script>

<svg {width} {height}>
  <g bind:this={graphElement} />

  <g>
    {#each $pastEvents as event}
      <circle
        cx={x(event.callTime)}
        cy={y(Math.max(event.change.partialScore, 0))}
        r={4}
        stroke-width={3}
        class="attendanceDot"
      />
    {/each}
  </g>

  <g>
    {#each $pastEvents as event}]
      <circle
        cx={x(event.event.callTime)}
        cy={y(Math.max(event.change.partialScore, 0))}
        r={8}
        fill-opacity={0}
        onMouseOver={event =>
          hover({
            event,
            x: event.clientX,
            y: event.clientY
          })
        }
        onMouseOut={() => hover(null)}
      />
    {/each}
  </g>

  <defs>
    <linearGradient id="attendanceGradient" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color={GOLD_COLOR} stop-opacity={0.85} />
      <stop offset="100%" stop-color={GOLD_COLOR} stop-opacity={0} />
    </linearGradient>
  </defs>
</svg>
