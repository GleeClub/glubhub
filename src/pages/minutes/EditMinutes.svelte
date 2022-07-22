<script lang="ts">
  import Button from 'components/buttons/Button.svelte'
  import ButtonGroup from 'components/buttons/ButtonGroup.svelte'
  import Control from 'components/forms/Control.svelte'
  import TextInput from 'components/forms/TextInput.svelte'
  import RequiresPermission from 'components/member/RequiresPermission.svelte'
  import ErrorBox from 'components/remote/ErrorBox.svelte'
  import DeleteModal from 'components/popup/DeleteModal.svelte'
  import Editor from '@tinymce/tinymce-svelte'

  import { FullMinutesQuery } from 'gql-operations'
  import { minutesPublic, routeMinutes } from 'route/constructors'
  import { stringType } from 'state/input'
  import { editMinutes } from 'state/permissions'
  import { query } from 'state/query'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'state/types'
  import { replaceRoute } from 'store/route'

  export let minutes: FullMinutesQuery['meetingMinutes']
  export let onUpdate: () => void
  export let onDelete: () => void

  let name = minutes.name
  let privateContent = minutes.private || ''
  let publicContent = minutes.public || ''

  let isRedacted = false
  let saveState: RemoteData = emptyLoaded
  let deleteState: RemoteData | null = null

  let content = privateContent

  function updateRedaction(redacted: boolean) {
    if (isRedacted) {
      publicContent = content
    } else {
      privateContent = content
    }

    isRedacted = redacted
    content = redacted ? privateContent : publicContent
  }

  async function updateMinutes() {
    saveState = loading
    const result = await query('UpdateMeetingMinutes', {
      id: minutes.id,
      update: {
        name,
        public: publicContent || '',
        private: privateContent,
      },
    })

    saveState = stateFromResult(result)
    if (result.type === 'loaded') {
      onUpdate()
      replaceRoute(routeMinutes(minutes.id, minutesPublic))
    }
  }

  async function deleteMinutes() {
    deleteState = loading
    const result = await query('DeleteMeetingMinutes', { id: minutes.id })

    deleteState = stateFromResult(result)
    if (result.type === 'loaded') {
      onDelete()
      replaceRoute(routeMinutes(null, null))
    }
  }
</script>

<RequiresPermission permission={editMinutes}>
  <div class="field is-grouped is-grouped-centered is-fullwidth">
    <Control>
      <ButtonGroup connected>
        <Button
          click={() => updateRedaction(true)}
          color={isRedacted ? 'is-primary' : undefined}
        >
          Public
        </Button>
        <Button
          click={() => updateRedaction(false)}
          color={!isRedacted ? 'is-primary' : undefined}
        >
          Private
        </Button>
      </ButtonGroup>
    </Control>

    <Control>
      <TextInput
        type={stringType}
        value={name}
        onInput={(newName) => (name = newName)}
        prefix="Title"
        placeholder="Secret Evil Meeting of Doom"
        required
        expanded
      />
    </Control>

    <Control>
      <ButtonGroup alignment="is-right">
        <Button
          click={updateMinutes}
          color="is-primary"
          loading={saveState.type === 'loading'}
        >
          Save
        </Button>
        <Button click={() => (deleteState = emptyLoaded)} color="is-danger">
          Delete
        </Button>
      </ButtonGroup>
    </Control>

    {#if saveState.type === 'error'}
      <ErrorBox error={saveState.error} />
    {/if}
  </div>

  <br />
  <Editor
    apiKey="4tzzx51fsqy1vtwhpvkhb3t9t4jwyotr28qjbogls2yclw26"
    bind:value={content}
  />

  {#if deleteState}
    <DeleteModal
      title="Delete this meeting?"
      cancel={() => (deleteState = null)}
      confirm={deleteMinutes}
      state={deleteState}
    >
      Are you sure you want to delete these meeting minutes? You can't undo
      that.
    </DeleteModal>
  {/if}
</RequiresPermission>
