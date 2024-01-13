React bindings for [Graphviz](https://graphviz.org) using [ts-graphviz](https://github.com/ts-graphviz/ts-graphviz) and [Viz.js](https://viz-js.com/). This is somewhat similar to [@ts-graphviz/react](https://github.com/ts-graphviz/react), but supporting react 18.

```tsx
<Digraph attributes={{ rankdir: 'TB', nodesep: 0.25 }}>
  <Node id="A" shape="point" color="forestgreen" />
  <Node id="B" />
  <Edge targets={['A', 'B']} arrowsize={0.25} />
</Digraph>
```
