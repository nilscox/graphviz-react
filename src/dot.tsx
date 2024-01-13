import { Viz, instance as createInstance } from '@viz-js/viz';
import { cloneElement, useEffect, useState } from 'react';
import parse from 'html-react-parser';

type DotProps = React.SVGAttributes<SVGSVGElement> & {
  dot: string;
};

export function Dot({ dot, ...props }: DotProps) {
  const viz = useViz();
  const [html, setHtml] = useState<string>();
  const [element, setElement] = useState<JSX.Element>();

  useEffect(() => {
    if (!viz || !dot) {
      return;
    }

    const svg = viz.renderSVGElement(dot);

    setHtml(svg.outerHTML);

    return () => {
      setHtml(undefined);
    };
  }, [viz, dot]);

  useEffect(() => {
    if (html !== undefined) {
      setElement(parse(html) as JSX.Element);
    }
  }, [html]);

  if (!element) {
    return null;
  }

  return cloneElement(element, props);
}

function useViz() {
  const [viz, setViz] = useState<Viz>();

  useEffect(() => {
    createInstance().then(setViz);
  }, []);

  return viz;
}
