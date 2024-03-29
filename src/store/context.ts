import { SiteContextQuery } from 'src/gql-operations'
import { eagerQuery } from 'src/state/query'
import { emptyLoaded, LazyRemoteData } from 'src/state/types'
import { derived, Readable } from 'svelte/store'

const defaultSiteContext: SiteContextQuery = {
  user: null,
  currentSemester: {
    name: '',
    gigRequirement: 0,
    startDate: '',
    endDate: '',
  },
  static: {
    permissions: [],
    roles: [],
    mediaTypes: [],
    sections: [],
    eventTypes: [],
    transactionTypes: [],
  },
}

const [siteContextInner, reloadSiteContext] = eagerQuery('SiteContext')
export { reloadSiteContext }

export const siteContext = derived(siteContextInner, (inner) =>
  inner.type === 'loaded' ? inner.data : defaultSiteContext
)
export const siteContextStatus: Readable<LazyRemoteData> = derived(
  siteContextInner,
  (inner) => (inner.type === 'loaded' ? emptyLoaded : inner)
)
