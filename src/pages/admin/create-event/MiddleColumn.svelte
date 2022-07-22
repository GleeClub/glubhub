<script lang="ts">
  import RadioInput from 'components/forms/RadioInput.svelte'
  import Column from 'components/bulma/Column.svelte'
  import SelectInput from 'components/forms/SelectInput.svelte'
  import TextareaInput from 'components/forms/TextareaInput.svelte'

  import { NewEventFields, NewGig } from 'gql-operations'
  import { eagerQuery } from 'state/query'
  import { siteContext } from 'store/context'
  import { derived } from 'svelte/store'
  import { stringType, uniformType } from 'state/input'

  export let event: NewEventFields
  export let gig: NewGig
  export let updateEvent: (event: NewEventFields) => void
  export let updateGig: (gig: NewGig) => void

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
    selected={$loadedUniforms.find((uniform) => uniform.id === gig.uniform) ||
      null}
    onInput={(uniform) => updateGig({ ...gig, uniform: uniform?.id || 0 })}
    title="Uniform"
  />
  <TextareaInput
    value={event.comments || ''}
    onInput={(comments) => updateEvent({ ...event, comments })}
    title="Event Summary"
    placeholder="We're gonna get in there, we're gonna use our mouths, and we're gonna get out."
  />
</Column>
