import { useContext } from 'react';
import * as gv from 'ts-graphviz';
import { useDeepCompareEffect } from 'use-deep-compare';

import { graphContext } from './digraph';

type EdgeProps = gv.EdgeAttributesObject & {
  targets: [from: string, to: string, ...rest: string[]];
};

export function Edge(props: EdgeProps) {
  const ctx = useContext(graphContext);

  useDeepCompareEffect(() => {
    const { targets, ...attributes } = props;
    const targetNodes = targets.map((target) => ctx.nodes.get(target)) as unknown as gv.EdgeTargetTuple;

    ctx.edges.add(new gv.Edge(targetNodes, attributes));
  }, [props]);

  return null;
}
