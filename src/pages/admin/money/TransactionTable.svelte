<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import StateBox from 'src/components/remote/StateBox.svelte'

  import { RemoteData } from 'src/state/types'
  import { TransactionsForSemesterQuery } from 'src/gql-operations'
  import { simpleDateWithYearFormatter } from 'src/utils/datetime'

  export let transactions: TransactionsForSemesterQuery
  export let resolveTransaction: (id: number, resolved: boolean) => void
  export let state: RemoteData
</script>

<Table striped fullwidth scrollable>
  <tbody>
    {#each transactions.transactions as transaction}
      <tr class="no-bottom-border">
        <td>{simpleDateWithYearFormatter(transaction.time.date)}</td>
        <td>{transaction.member.fullName}</td>
        <td>{transaction.type}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.resolved ? 'Resolved' : 'Outstanding'}</td>
        <td>
          <Button
            size="is-small"
            color:is-primary={!transaction.resolved}
            click={() =>
              resolveTransaction(transaction.id, !transaction.resolved)}
          >
            {transaction.resolved ? 'Unresolve' : 'Resolve'}
          </Button>
        </td>
        <td>{transaction.description}</td>
      </tr>
    {/each}
  </tbody>
</Table>
<StateBox {state} />
