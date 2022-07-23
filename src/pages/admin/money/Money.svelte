<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import Remote from 'src/components/remote/Remote.svelte'
  import StateBox from 'src/components/remote/StateBox.svelte'
  import AssignDuesModal from './AssignDuesModal.svelte'
  import AssignLateDuesModal from './AssignLateDuesModal.svelte'
  import MoneyActionButton from './MoneyActionButton.svelte'
  import BatchTransactions from './BatchTransactions.svelte'
  import TransactionTable from './TransactionTable.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import Columns from 'src/components/bulma/Columns.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'

  import { eagerQuery, query } from 'src/state/query'
  import { MoneyTab } from 'src/route/types'
  import { numberType } from 'src/state/input'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import {
    moneyAssignDues,
    moneyAssignLateDues,
    moneyBatchTransactions,
  } from 'src/route/constructors'

  export let tab: MoneyTab | null

  let feeState: RemoteData = emptyLoaded
  let transactionState: RemoteData = emptyLoaded

  const [allFees, reloadAllFees] = eagerQuery('AllFees', {})
  const [allTransactions, reloadAllTransactions] = eagerQuery(
    'TransactionsForSemester',
    {}
  )

  async function resolveTransaction(id: number, resolved: boolean) {
    transactionState = loading
    const result = await query('ResolveTransaction', { id, resolved })

    transactionState = stateFromResult(result)
    if (result.type === 'loaded') {
      reloadAllTransactions({})
    }
  }

  async function updateFeeAmount(name: string, amount: number) {
    feeState = loading
    const result = await query('UpdateFee', { name, amount })

    feeState = stateFromResult(result)
    if (result.type === 'loaded') {
      reloadAllFees({})
    }
  }
</script>

<div>
  <Title>Dues</Title>
  <Columns>
    <Column>
      <Box>
        <Remote data={$allFees}>
          <!-- TODO: try changing this to a svelte:fragment -->
          <div slot="loaded" let:data={fees}>
            {#each fees.fees as fee}
              <TextInput
                prefix={fee.name}
                type={numberType}
                value={fee.amount}
                onInput={(amount) => updateFeeAmount(fee.name, amount || 0)}
                horizontal
                title={fee.description}
              />
            {/each}
          </div>
        </Remote>
        <StateBox state={feeState} />
      </Box>
    </Column>

    <Column>
      <ul>
        <MoneyActionButton tab={moneyAssignDues} />
        <MoneyActionButton tab={moneyAssignLateDues} />
        <MoneyActionButton tab={moneyBatchTransactions} />
      </ul>
    </Column>
  </Columns>

  <Title>Transactions</Title>
  <Box>
    <Remote data={$allTransactions}>
      <TransactionTable
        slot="loaded"
        let:data={transactions}
        {transactions}
        {resolveTransaction}
        state={transactionState}
      />
    </Remote>
  </Box>

  {#if tab?.route === 'assign-dues'}
    <AssignDuesModal />
  {:else if tab?.route === 'assign-late-dues'}
    <AssignLateDuesModal />
  {:else if tab?.route === 'batch-transactions'}
    <BatchTransactions />
  {/if}
</div>
