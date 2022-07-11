import { operationStore, query } from "@urql/svelte";
import { SiteContextDocument, SiteContextQuery } from "gql-operations";
import { error, loaded, loading } from "state/types";
import { derived } from "svelte/store";

const defaultSiteContext: SiteContextQuery = {
  user: null,
  members: [],
  currentSemester: {
    name: "",
    gigRequirement: 0,
    startDate: "",
    endDate: "",
  },
  static: {
    permissions: [],
    roles: [],
    mediaTypes: [],
    sections: [],
    eventTypes: [],
    transactionTypes: [],
  }
};

const siteContextInner = operationStore(SiteContextDocument);
query(siteContextInner);

export const siteContext = derived(siteContextInner, inner => inner.data || defaultSiteContext);
export const siteContextStatus = derived(siteContextInner, inner => {
  if (inner.fetching) {
    return loading;
  } else if (inner.error) {
    return error(inner.error);
  } else {
    return loaded(null);
  }
});

export function reloadContext() {
  siteContextInner.reexecute();
}
