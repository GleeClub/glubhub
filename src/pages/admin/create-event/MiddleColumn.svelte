<script lang="ts">
  import RadioInput from 'src/components/forms/RadioInput.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import SelectInput from 'src/components/forms/SelectInput.svelte'
  import TextareaInput from 'src/components/forms/TextareaInput.svelte'

  import { NewEventFields, NewGig } from 'src/gql-operations'
  import { eagerQuery } from 'src/state/query'
  import { siteContext } from 'src/store/context'
  import { derived } from 'svelte/store'
  import { stringType, uniformType } from 'src/state/input'
  import { EMPTY_GIG } from 'src/utils/constants'

  export let event: NewEventFields
  export let gig: NewGig | null
  export let updateEvent: (event: NewEventFields) => void
  export let updateGig: (gig: NewGig | null) => void

  const [allSemesters, _reloadAllSemesters] = eagerQuery('AllSemesters')
  const [allUniforms, _reloadAllUniforms] = eagerQuery('AllUniforms')

  const loadedUniforms = derived(allUniforms, (uniforms) =>
    uniforms.type === 'loaded' ? uniforms.data.uniforms : []
  )
  const semesterNames = derived(
    [siteContext, allSemesters],
    ([context, semesters]) =>
      semesters.type === 'loaded'
        ? semesters.data.semesters.map((semester) => semester.name)
        : [context.currentSemester.name]
  )
  const eventTypes = derived(siteContext, (context) =>
    context.static.eventTypes.map((type) => type.name)
  )
</script>

<Column>
  <RadioInput
    render={(x) => x}
    values={$eventTypes}
    selected={event.type}
    onInput={(type) => updateEvent({ ...event, type })}
    title="Event Type"
  />
  <SelectInput
    type={stringType}
    values={$semesterNames}
    selected={event.semester}
    onInput={(semester) => updateEvent({ ...event, semester })}
    title="Semester"
    loading={$allSemesters.type === 'loading'}
  />
  <SelectInput
    type={uniformType($loadedUniforms)}
    values={[null, ...$loadedUniforms]}
    selected={$loadedUniforms.find((uniform) => uniform.id === gig?.uniform) ||
      null}
    onInput={(uniform) =>
      updateGig({ ...(gig || EMPTY_GIG), uniform: uniform?.id || 0 })}
    title="Uniform"
    required={!!gig}
  />
  <TextareaInput
    value={event.comments || ''}
    onInput={(comments) => updateEvent({ ...event, comments })}
    title="Event Summary"
    placeholder="We're gonna get in there, we're gonna use our mouths, and we're gonna get out."
  />
</Column>
