<script lang="ts">
  import { siteContext } from 'src/store/context'
  import { onMount } from 'svelte'
  import { derived, get } from 'svelte/store'
  import { GOLD_COLOR } from 'src/utils/constants'
  import { eventIsOver } from 'src/utils/helpers'
  import { HoveredEvent } from 'src/state/types'
  import { extent } from 'd3-array'
  import { select } from 'd3-selection'
  import { axisLeft, axisBottom } from 'd3-axis'
  import { line, curveMonotoneX } from 'd3-shape'
  import { scaleTime, scaleLinear } from 'd3-scale'
import { datetimeToDate } from 'src/utils/datetime';

  export let hoverEvent: (hover: HoveredEvent | null) => void

  let graphElement: SVGGElement

  const pastEvents = derived(
    siteContext,
    (context) =>
      context.user?.grades.eventsWithChanges.filter((event) =>
        eventIsOver(event.event)
      ) || []
  )

  const margin = { top: 20, right: 20, bottom: 20, left: 30 }
  const width = 1350
  const height = 400

  const x = scaleTime().rangeRound([margin.left, width - margin.right])
  const y = scaleLinear().rangeRound([height - margin.bottom, margin.top])

  onMount(() => {
    const events = get(pastEvents)
    if (!graphElement || !events.length) return
    console.log(events, graphElement)

    x.domain(
      extent(events, (event) => datetimeToDate(event.event.callTime)) as [Date, Date]
    )
    y.domain([0, 100])

    const svg = select(graphElement).html('')

    // create axes
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(axisBottom<Date>(x).ticks(3))
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(axisLeft(y))

    // draw the line between event grades
    const valueline = line<{ callTime: Date; partialScore: number }>()
      .x((event) => x(new Date(event.callTime)))
      .y((event) => y(Math.max(0, event.partialScore)))
      .curve(curveMonotoneX) // http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
    svg
      .append('path')
      .datum([
        {
          callTime: datetimeToDate(events[0].event.callTime),
          partialScore: 0,
        },
        ...events.map((event) => ({
          callTime: datetimeToDate(event.event.callTime),
          partialScore: event.change!.partialScore,
        })),
        {
          callTime: datetimeToDate(events[events.length - 1].event.callTime),
          partialScore: 0,
        },
      ])
      .attr('class', 'line')
      .attr('d', valueline)
  })
</script>

<svg {width} {height}>
  <g bind:this={graphElement} />

  <g>
    {#each $pastEvents as event}
      <circle
        cx={x(datetimeToDate(event.event.callTime))}
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
        cx={x(datetimeToDate(event.event.callTime))}
        cy={y(Math.max(event.change.partialScore, 0))}
        r={8}
        fill-opacity={0}
        on:mouseover={(mouseEvent) =>
          hoverEvent({
            event,
            x: mouseEvent.clientX,
            y: mouseEvent.clientY,
          })}
        on:focus={(focusEvent) =>
          hoverEvent({
            event,
            x: focusEvent.currentTarget.getBoundingClientRect().x,
            y: focusEvent.currentTarget.getBoundingClientRect().y,
          })}
        on:mouseout={() => hoverEvent(null)}
        on:blur={() => hoverEvent(null)}
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
