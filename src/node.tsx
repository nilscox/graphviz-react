import { useContext } from 'react';
import * as gv from 'ts-graphviz';
import { useDeepCompareEffect } from 'use-deep-compare';

import { graphContext } from './digraph';

type NodeProps = gv.NodeAttributesObject & {
  id: string;
};

export function Node(props: NodeProps) {
  const ctx = useContext(graphContext);

  useDeepCompareEffect(() => {
    const { id, ...attributes } = props;

    ctx.nodes.set(id, new gv.Node(id, attributes));
  }, [props]);

  return null;
}
