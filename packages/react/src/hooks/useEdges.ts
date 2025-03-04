import { shallow } from 'zustand/shallow';

import { useStore } from '../hooks/useStore';
import type { Edge, ReactFlowState } from '../types';

const edgesSelector = (state: ReactFlowState) => state.edges;

/**
 * Hook for getting the current edges from the store.
 *
 * @public
 * @returns An array of edges
 */
function useEdges<EdgeData>(): Edge<EdgeData>[] {
  const edges = useStore(edgesSelector, shallow);

  return edges;
}

export default useEdges;
