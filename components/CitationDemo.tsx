"use client";

import { useState } from "react";
import type { Dict } from "@/lib/content";

type Demo = Dict["home"]["demo"];

export function CitationDemo({ demo }: { demo: Demo }) {
  const [active, setActive] = useState<number>(1);

  return (
    <div className="demo">
      <div className="demo__hd">
        <span className="sq" style={{ margin: 0 }} />
        {demo.label}
      </div>

      <div className="demo__blk">
        <div className="demo__lb">{demo.queryLabel}</div>
        <p className="demo__q">{demo.query}</p>
      </div>

      <div className="demo__blk">
        <div className="demo__lb">{demo.answerLabel}</div>
        <p className="demo__a">
          {demo.answer.map((seg, i) =>
            seg.ref ? (
              <span key={i}>
                <b>{seg.t}</b>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={active === seg.ref}
                  aria-label={`${demo.sourceOf} ${seg.ref}`}
                  onClick={() => setActive(seg.ref as number)}
                >
                  {seg.ref}
                </button>
              </span>
            ) : (
              <span key={i}>{seg.t}</span>
            )
          )}
        </p>
        <p className="demo__tally">{demo.tally}</p>
      </div>

      <div className="demo__blk" style={{ padding: 0 }}>
        <div className="demo__lb" style={{ padding: "11px 14px 6px" }}>{demo.sourcesLabel}</div>
        {demo.sources.map((s) => (
          <button
            key={s.n}
            type="button"
            className="src"
            aria-pressed={active === s.n}
            onClick={() => setActive(s.n)}
          >
            <span className="src__hd">
              <span><em>[{s.n}]</em> {s.doc}</span>
              <span>{s.meta}</span>
            </span>
            <p className="src__q">« {s.quote} »</p>
          </button>
        ))}
      </div>

      <p className="demo__ft">{demo.note}</p>
    </div>
  );
}
