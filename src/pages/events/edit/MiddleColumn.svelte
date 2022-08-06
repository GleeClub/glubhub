<script lang="ts">
  import Column from 'src/components/bulma/Column.svelte'
  import RadioInput from 'src/components/forms/RadioInput.svelte'
  import SelectInput from 'src/components/forms/SelectInput.svelte'
  import TextareaInput from 'src/components/forms/TextareaInput.svelte'
import { NewEventFields, NewGig } from 'src/gql-operations';

  import { stringType, uniformType } from 'src/state/input'
  import { eagerQuery } from 'src/state/query'
  import { siteContext } from 'src/store/context'
  import { derived } from 'svelte/store'

  export let event: NewEventFields
  export let updateEvent: (event: NewEventFields) => void
  export let gig: NewGig
  export let updateGig: (gig: NewGig) => void

  const [allSemesters, _reloadAllSemesters] = eagerQuery('AllSemesters', {})
  const [allUniforms, _reloadAllUniforms] = eagerQuery('AllUniforms', {})

  const loadedSemesters = derived(
    [allSemesters, siteContext],
    ([semesters, context]) =>
      semesters.type === 'loaded'
        ? semesters.data.semesters.map((semester) => semester.name)
        : [context.currentSemester.name]
  )
  const loadedUniforms = derived(allUniforms, (uniforms) =>
    uniforms.type === 'loaded' ? uniforms.data.uniforms : []
  )
  const allEventTypes = derived(siteContext, (context) =>
    context.static.eventTypes.map((type) => type.name)
  )
</script>

<Column>
  <RadioInput
    render={(x) => x}
    values={$allEventTypes}
    selected={event.type}
    onInput={(type) => updateEvent({ ...event, type })}
    title="Event Type"
  />
  <SelectInput
    values={$loadedSemesters}
    selected={event.semester}
    type={stringType}
    onInput={(semester) => updateEvent({ ...event, semester })}
    title="Semester"
    loading={$allSemesters.type === 'loading'}
  />
  <SelectInput
    values={[null, ...$loadedUniforms]}
    selected={$loadedUniforms.find(u => u.id === gig.uniform) || null}
    type={uniformType($loadedUniforms)}
    onInput={(uniform) => updateGig({ ...gig, uniform: uniform?.id || 0 })}
  />
  <TextareaInput
    value={event.comments || ''}
    onInput={(comments) => updateEvent({ ...event, comments })}
    title="Event Summary"
    placeholder="We're gonna get in there, we're gonna use our mouths, and we're gonna get out."
  />
</Column>
