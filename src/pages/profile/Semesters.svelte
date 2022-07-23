<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'
  import Remote from 'src/components/remote/Remote.svelte'

  import { eagerQuery } from 'src/state/query'
  import { roundToTwoDigits } from 'src/utils/helpers'

  export let email: string

  $: [semesters, _reloadSemesters] = eagerQuery('MemberSemesters', { email })
</script>

<Remote data={$semesters}>
  <Table slot="loaded" let:data={semesters}>
    <thead>
      <tr>
        <th>Semester</th>
        <th>Enrollment</th>
        <th>Section</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {#each semesters.member.semesters as semester}
        <tr class="no-bottom-border">
          <td>{semester.semester}</td>
          <td>{semester.enrollment || 'Inactive'}</td>
          <td>{semester.section || 'Homeless'}</td>
          <td>{roundToTwoDigits(semester.grades.grade)}</td>
        </tr>
      {/each}
    </tbody>
  </Table>
</Remote>
