import { createContext, useContext, useRef, useState } from 'react';
import * as gv from 'ts-graphviz';
import { useDeepCompareEffect } from 'use-deep-compare';

import { Dot } from './dot';

type GraphContext = {
  nodes: Map<string, gv.Node>;
  edges: Set<gv.Edge>;
};

export const graphContext = createContext<GraphContext>(null as never);

type DigraphProps = React.SVGAttributes<SVGSVGElement> & {
  attributes?: gv.GraphAttributesObject;
  children: React.ReactNode;
};

export function Digraph({ children, attributes = {}, ...props }: DigraphProps) {
  const [dot, setDot] = useState('');

  const value = useRef<GraphContext>({
    nodes: new Map(),
    edges: new Set(),
  });

  return (
    <graphContext.Provider value={value.current}>
      {children}
      <Render setDot={setDot} attributes={attributes} />
      <Dot dot={dot} {...props} />
    </graphContext.Provider>
  );
}

type RenderProps = {
  setDot: (dot: string) => void;
  attributes: gv.GraphAttributesObject;
};

function Render({ setDot, attributes }: RenderProps) {
  const ctx = useContext(graphContext);

  useDeepCompareEffect(() => {
    const graph = new gv.Digraph(attributes.id, attributes);
    const { nodes, edges } = ctx;

    for (const node of nodes.values()) {
      graph.addNode(node);
    }

    for (const edge of edges) {
      graph.addEdge(edge);
    }

    setDot(gv.toDot(graph));

    ctx.nodes.clear();
    ctx.edges.clear();
  }, [attributes]);

  return null;
}
