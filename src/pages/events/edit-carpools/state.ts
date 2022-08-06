import type { EditCarpoolContextQuery } from 'src/gql-operations'
import { derived, writable } from 'svelte/store'

type CarpoolMember = EditCarpoolContextQuery['members'][number]

interface Carpool {
  driver: CarpoolMember
  passengers: CarpoolMember[]
}

interface DriverSelected {
  type: 'driver'
  carpool: Carpool
}

interface PassengersSelected {
  type: 'passengers'
  carpool: Carpool
  passengers: CarpoolMember[]
}

interface UnassignedMembersSelected {
  type: 'unassigned'
  members: CarpoolMember[]
}

type MemberSelection =
  | DriverSelected
  | PassengersSelected
  | UnassignedMembersSelected

const emptySelection: MemberSelection = {
  type: 'unassigned',
  members: [],
}

interface EditCarpoolState {
  carpools: Carpool[]
  members: CarpoolMember[]
  selection: MemberSelection
}

function memberInCarpool(email: string, carpool: Carpool) {
  return (
    carpool.driver.email === email ||
    carpool.passengers.some((p) => p.email === email)
  )
}

const carpoolState = writable<EditCarpoolState>({
  carpools: [],
  members: [],
  selection: emptySelection,
})

export function clearCarpoolState() {
  carpoolState.set({
    carpools: [],
    members: [],
    selection: emptySelection,
  })
}

export function setCarpoolStateFromApi(data: EditCarpoolContextQuery) {
  carpoolState.set({
    carpools: data.event.carpools,
    members: data.members,
    selection: emptySelection,
  })
}

export const currentCarpools = derived(carpoolState, (state) => state.carpools)

export const allSelectedMembers = derived(carpoolState, (state) => {
  if (state.selection.type === 'driver') {
    return [state.selection.carpool.driver]
  } else if (state.selection.type === 'passengers') {
    return state.selection.passengers
  } else {
    return state.selection.members
  }
})

export const allSelectedEmails = derived(allSelectedMembers, (members) =>
  members.map((m) => m.email)
)

export const unassignedMembers = derived(carpoolState, (state) =>
  state.members.filter((m) =>
    state.carpools.every((c) => !memberInCarpool(m.email, c))
  )
)

function updateCarpoolWithDriver(
  carpools: Carpool[],
  driverEmail: string,
  mapper: (carpool: Carpool) => Carpool
): Carpool[] {
  return carpools.map((c) => (c.driver.email === driverEmail ? mapper(c) : c))
}

function updateCarpoolsAndClearSelection(
  state: EditCarpoolState,
  mapper: (carpools: Carpool[]) => Carpool[]
): EditCarpoolState {
  return {
    ...state,
    carpools: mapper(state.carpools),
    selection: emptySelection,
  }
}

export function clickUnassignedMember(member: CarpoolMember) {
  carpoolState.update((state) => {
    if (state.selection.type === 'driver') {
      return unassignAllCarpoolMembers(state.selection.carpool.driver, state)
    } else if (state.selection.type === 'passengers') {
      return unassignAllPassengersFromCarpool(state.selection, state)
    } else {
      return {
        ...state,
        selection: {
          ...state.selection,
          members: toggleMemberInList(state.selection.members, member),
        },
      }
    }
  })
}

export function clickDriver(carpool: Carpool) {
  carpoolState.update((state) => {
    if (state.selection.type === 'driver') {
      const otherDriver = state.selection.carpool.driver
      return updateCarpoolsAndClearSelection(state, (cs) =>
        cs.map((c) => {
          if (c.driver.email === carpool.driver.email) {
            return { ...c, driver: otherDriver }
          } else if (c.driver.email === otherDriver.email) {
            return { ...c, driver: carpool.driver }
          } else {
            return c
          }
        })
      )
    } else if (state.selection.type === 'passengers') {
      const selectedPassengers = state.selection.passengers
      const driverEmail = state.selection.carpool.driver.email
      if (
        selectedPassengers.length === 0 ||
        carpool.driver.email === driverEmail
      )
        return state

      return updateCarpoolsAndClearSelection(state, (cs) =>
        updateCarpoolWithDriver(cs, driverEmail, (c) => ({
          driver: selectedPassengers[0],
          passengers: c.passengers.filter(
            (p) => p.email !== selectedPassengers[0].email
          ),
        }))
      )
    } else {
      const selectedMembers = state.selection.members
      if (selectedMembers.length === 0) {
        return {
          ...state,
          selection: { type: 'driver', carpool },
        }
      }

      return updateCarpoolsAndClearSelection(state, (cs) =>
        updateCarpoolWithDriver(cs, carpool.driver.email, (c) => ({
          ...c,
          driver: selectedMembers[0],
        }))
      )
    }
  })
}

export function clickPassenger(carpool: Carpool, passenger: CarpoolMember) {
  carpoolState.update((state) => {
    if (state.selection.type === 'driver') {
      const otherDriver = state.selection.carpool.driver
      const otherPassengers = state.selection.carpool.passengers
      if (otherPassengers.length > 0) return state

      return updateCarpoolsAndClearSelection(state, (cs) =>
        cs.flatMap((c) => {
          if (c.driver.email === otherDriver.email) {
            return []
          } else if (c.driver.email === carpool.driver.email) {
            return [{ ...c, passengers: [...c.passengers, otherDriver] }]
          } else {
            return [c]
          }
        })
      )
    } else if (state.selection.type === 'passengers') {
      if (state.selection.carpool.driver.email === carpool.driver.email) {
        return {
          ...state,
          selection: {
            ...state.selection,
            passengers: toggleMemberInList(
              state.selection.passengers,
              passenger
            ),
          },
        }
      } else {
        const otherCarpool = state.selection.carpool
        const otherPassengers = state.selection.passengers

        return updateCarpoolsAndClearSelection(state, (cs) =>
          cs.map((c) => {
            if (c.driver.email === carpool.driver.email) {
              return { ...c, passengers: [...c.passengers, ...otherPassengers] }
            } else if (c.driver.email === otherCarpool.driver.email) {
              return {
                ...c,
                passenger: c.passengers.filter((p) =>
                  otherPassengers.every((op) => op.email !== p.email)
                ),
              }
            } else {
              return c
            }
          })
        )
      }
    } else {
      if (state.selection.members.length === 0) {
        return {
          ...state,
          selection: {
            type: 'passengers',
            carpool: carpool,
            passengers: [passenger],
          },
        }
      }

      const selectedMembers = state.selection.members
      return updateCarpoolsAndClearSelection(state, (cs) =>
        updateCarpoolWithDriver(cs, carpool.driver.email, (c) => ({
          ...c,
          passengers: [...c.passengers, ...selectedMembers],
        }))
      )
    }
  })
}

export function clickEmptyPassengerList(carpool: Carpool) {
  carpoolState.update((state) => {
    if (state.selection.type === 'driver') {
      const otherCarpool = state.selection.carpool
      if (otherCarpool.passengers.length > 0) return state

      return updateCarpoolsAndClearSelection(state, (cs) =>
        cs.flatMap((c) => {
          if (c.driver.email === otherCarpool.driver.email) {
            return []
          } else if (c.driver.__typename === carpool.driver.email) {
            return [
              { ...c, passengers: [...c.passengers, otherCarpool.driver] },
            ]
          } else {
            return [c]
          }
        })
      )
    } else if (state.selection.type === 'passengers') {
      const otherPassengers = state.selection.passengers
      const otherCarpool = state.selection.carpool
      return updateCarpoolsAndClearSelection(state, (cs) =>
        cs.map((c) => {
          if (c.driver.email === carpool.driver.email) {
            return { ...c, passengers: [...c.passengers, ...otherPassengers] }
          } else if (c.driver.email === otherCarpool.driver.email) {
            return {
              ...c,
              passengers: c.passengers.filter((p) =>
                otherPassengers.every((op) => op.email !== p.email)
              ),
            }
          } else {
            return c
          }
        })
      )
    } else {
      const newMembers = state.selection.members
      return updateCarpoolsAndClearSelection(state, (cs) =>
        updateCarpoolWithDriver(cs, carpool.driver.email, (c) => ({
          ...c,
          passengers: [...c.passengers, ...newMembers],
        }))
      )
    }
  })
}

export function clickEmptyUnassignedMemberList() {
  carpoolState.update((state) => {
    if (state.selection.type === 'driver') {
      return unassignAllCarpoolMembers(state.selection.carpool.driver, state)
    } else if (state.selection.type === 'passengers') {
      return unassignAllPassengersFromCarpool(state.selection, state)
    } else {
      return state
    }
  })
}

export function addNewCarpool() {
  carpoolState.update((state) => {
    if (state.selection.type === 'unassigned') {
      const selectedMembers = state.selection.members
      if (selectedMembers.length === 0) return state

      return updateCarpoolsAndClearSelection(state, (cs) => [
        ...cs,
        {
          driver: selectedMembers[0],
          passengers: selectedMembers.slice(1),
        },
      ])
    } else if (state.selection.type === 'passengers') {
      const selectedPassengers = state.selection.passengers
      if (selectedPassengers.length === 0) return state

      const driverEmail = state.selection.carpool.driver.email
      return updateCarpoolsAndClearSelection(state, (cs) => [
        ...updateCarpoolWithDriver(cs, driverEmail, (c) => ({
          ...c,
          passengers: c.passengers.filter((p) =>
            selectedPassengers.every((sp) => sp.email !== p.email)
          ),
        })),
        {
          driver: selectedPassengers[0],
          passengers: selectedPassengers.slice(1),
        },
      ])
    } else {
      return state
    }
  })
}

function toggleMemberInList(
  allMembers: CarpoolMember[],
  member: CarpoolMember
): CarpoolMember[] {
  if (allMembers.some((m) => m.email === member.email)) {
    return allMembers.filter((m) => m.email !== member.email)
  } else {
    return [...allMembers, member]
  }
}

function unassignAllCarpoolMembers(
  driver: CarpoolMember,
  state: EditCarpoolState
): EditCarpoolState {
  return {
    ...state,
    carpools: state.carpools.filter((c) => c.driver.email !== driver.email),
    selection: emptySelection,
  }
}

function unassignAllPassengersFromCarpool(
  selection: PassengersSelected,
  state: EditCarpoolState
): EditCarpoolState {
  return {
    ...state,
    carpools: updateCarpoolWithDriver(
      state.carpools,
      selection.carpool.driver.email,
      (c) => ({
        ...c,
        passengers: c.passengers.filter(
          (p) => !selection.passengers.some((sp) => sp.email === p.email)
        ),
      })
    ),
    selection: emptySelection,
  }
}
