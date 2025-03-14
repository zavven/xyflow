import { useEffect } from 'react';
import type { KeyCode } from '@xyflow/system';

import { useStoreApi } from '../hooks/useStore';
import useKeyPress, { UseKeyPressOptions } from './useKeyPress';
import useReactFlow from './useReactFlow';
import { Edge, Node } from '../types';

const selected = (item: Node | Edge) => item.selected;

const deleteKeyOptions: UseKeyPressOptions = { actInsideInputWithModifier: false };

/**
 * Hook for handling global key events.
 *
 * @internal
 */
export default ({
  deleteKeyCode,
  multiSelectionKeyCode,
}: {
  deleteKeyCode: KeyCode | null;
  multiSelectionKeyCode: KeyCode | null;
}): void => {
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();

  const deleteKeyPressed = useKeyPress(deleteKeyCode, deleteKeyOptions);
  const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);

  useEffect(() => {
    if (deleteKeyPressed) {
      const { edges, nodes, onBeforeDelete } = store.getState();
      deleteElements({ nodes: nodes.filter(selected), edges: edges.filter(selected), onBeforeDelete });
      store.setState({ nodesSelectionActive: false });
    }
  }, [deleteKeyPressed]);

  useEffect(() => {
    store.setState({ multiSelectionActive: multiSelectionKeyPressed });
  }, [multiSelectionKeyPressed]);
};
