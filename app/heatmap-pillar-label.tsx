"use client";

import { useEffect, useId, useRef } from "react";
import "./heatmap-pillar-label.css";

const descriptions = {
  Adoption: "How fast AI usage is turning into spending. The score combines changes in token volume and unit cost using Ramp business usage and OpenRouter traffic.",
  Monetization: "How much customers pay for AI and how much model developers earn. The score tracks business spending, consumer card spending on OpenAI and Anthropic, and reported lab revenue.",
  Hyperscalers: "How fast Microsoft, Alphabet, Amazon, Meta, and Oracle are growing capital spending. The score compares their combined spending over the latest four quarters with the preceding four.",
  Infrastructure: "How strongly demand for AI equipment and facilities is growing. The score uses signals such as equipment orders and imports, memory and GPU prices, and data-center construction.",
};

function placeTooltip(trigger: HTMLElement, tooltip: HTMLElement) {
  const anchor = trigger.getBoundingClientRect();
  if (anchor.bottom <= 0 || anchor.top >= window.innerHeight) {
    tooltip.hidePopover();
    return;
  }

  const margin = 8;
  const maxLeft = window.innerWidth - tooltip.offsetWidth - margin;
  const maxTop = window.innerHeight - tooltip.offsetHeight - margin;
  const fitsBeside = anchor.right <= maxLeft;
  const left = fitsBeside ? anchor.right : Math.min(anchor.left, maxLeft);
  const below = anchor.bottom <= maxTop ? anchor.bottom : anchor.top - tooltip.offsetHeight;
  const top = fitsBeside ? Math.min(anchor.top, maxTop) : below;
  tooltip.style.left = `${Math.max(margin, left)}px`;
  tooltip.style.top = `${Math.max(margin, top)}px`;
}

export default function HeatmapPillarLabel({ pillar, quarterly, selected, onSelect }: {
  pillar: keyof typeof descriptions;
  quarterly: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const tooltip = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number>(undefined);

  useEffect(() => {
    if (!tooltip.current?.showPopover) {
      trigger.current?.setAttribute("title", descriptions[pillar]);
      return;
    }
    function reposition() {
      if (trigger.current && tooltip.current?.matches(":popover-open")) {
        placeTooltip(trigger.current, tooltip.current);
      }
    }
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.clearTimeout(closeTimer.current);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [pillar]);

  function show() {
    window.clearTimeout(closeTimer.current);
    if (!trigger.current || !tooltip.current?.showPopover) return;
    if (!tooltip.current.matches(":popover-open")) tooltip.current.showPopover();
    placeTooltip(trigger.current, tooltip.current);
  }

  function scheduleClose() {
    if (!tooltip.current?.hidePopover) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      if (trigger.current?.matches(":hover, :focus-visible") || tooltip.current?.matches(":hover")) return;
      if (tooltip.current?.matches(":popover-open")) tooltip.current.hidePopover();
    }, 150);
  }

  return <>
    <button
      type="button"
      ref={trigger}
      aria-pressed={selected}
      aria-describedby={id}
      onPointerEnter={event => { if (event.pointerType !== "touch") show(); }}
      onPointerLeave={scheduleClose}
      onFocus={event => { if (event.currentTarget.matches(":focus-visible")) show(); }}
      onBlur={scheduleClose}
      onClick={() => { onSelect(); show(); }}
    >
      {pillar} <span className="heatmap-pillar-info" aria-hidden="true">i</span>
      <small>{quarterly ? "Core 25% · TTM score held" : "Core 25% · normalized"}</small>
    </button>
    <span
      id={id}
      ref={tooltip}
      className="heatmap-pillar-tooltip"
      role="tooltip"
      popover="auto"
      onPointerEnter={() => window.clearTimeout(closeTimer.current)}
      onPointerLeave={scheduleClose}
    >
      {descriptions[pillar]}
    </span>
  </>;
}
