<script lang="ts">
  import Box from "components/bulma/Box.svelte";
  import Title from "components/bulma/Title.svelte";
  import BackButton from "components/buttons/BackButton.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import CheckboxInput from "components/forms/CheckboxInput.svelte";
  import InputWrapper from "components/forms/InputWrapper.svelte";
  import SelectInput from "components/forms/SelectInput.svelte";
  import TextInput from "components/forms/TextInput.svelte";
  import Sidebar from "components/popup/Sidebar.svelte";
  import ErrorBox from "components/remote/ErrorBox.svelte";

  import { adminMoney, routeAdmin } from "route/constructors";
  import { numberType, stringType } from "state/input";
  import { mutation, query } from "state/query";
  import { replaceRoute } from "store/route";
  import { siteContext } from "store/context";
  import { emptyLoaded, loading, RemoteData, stateFromResult } from "state/types";
  import { AddTransactionBatchDocument, AllMembersDocument } from "gql-operations";

  let batchType = "";
  let description = "";
  let amount = 0;
  let includedMembers: string[] = [];
  let state: RemoteData = emptyLoaded;

  const allMembers = query(AllMembersDocument, {});

  function closeSidebar() {
    replaceRoute(routeAdmin(adminMoney(null)));
  }

  async function toggleMember(email: string) {
    if (includedMembers.includes(email)) {
      includedMembers = includedMembers.filter(m => m !== email);
    } else {
      includedMembers.push(email);
    }
  }

  async function sendBatch() {
    state = loading;
    const result = await mutation(AddTransactionBatchDocument, {
      batch: {
        members: includedMembers,
        type: batchType,
        amount,
        description,
      },
    });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      closeSidebar();
    }
  }
</script>

<style>
.member-list {
  column-count: 3;
  column-gap: 20px;
}
</style>

<Sidebar data={$allMembers} close={() => replaceRoute(routeAdmin(adminMoney(null)))}>
  <form slot="loaded" let:data={members} on:submit|preventDefault={sendBatch}>
    <BackButton content="cancel" click={closeSidebar} />
    <Title centered>Batch Transactions</Title>
    <SelectInput
      type={stringType}
      values={$siteContext.static.transactionTypes.map(type => type.name)}
      selected={batchType}
      onInput={newBatchType => batchType = newBatchType}
      title="What's its persuasion?"
    />
    <TextInput
      type={stringType}
      value={description}
      onInput={newDescription => description = newDescription}
      title="What's it for?"
      placeholder="Scotland Trip 2029"
      required
    />
    <TextInput
      type={numberType}
      value={amount}
      onInput={newAmount => amount = typeof newAmount === "number" ? newAmount : 0}
      title="How many doll hairs?"
      prefix="$"
      placeholder="420"
      required
    />
    <InputWrapper title="Whomdst">
      <Box>
        <ul class="member-list">
          {#each members.members as member}
            <li>
              <CheckboxInput
                content={member.fullName}
                checked={includedMembers.includes(member.email)}
                onChange={() => toggleMember(member.email)}
              />
            </li>
          {/each}
        </ul>
      </Box>
    </InputWrapper>

    <br />
    <SubmitButton
      color="is-primary"
      loading={state.type === "loading"}
    >
      My mind on my money and my money on my mind
    </SubmitButton>
    {#if state.type === "error"}
      <ErrorBox error={state.error} />
    {/if}
  </form>
</Sidebar>
