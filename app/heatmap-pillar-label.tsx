"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import "./heatmap-pillar-label.css";

const descriptions = {
  Adoption: "Adoption weights breadth and usage equally. Breadth uses current and expected business AI use and Ramp paid adoption rates. Usage scores OpenRouter and Ramp separately by ranking month-over-month growth in their 3M average token volumes against each source’s history through June 2026.",
  Monetization: "Nominal pillar weights are 60% business paid demand, 20% U.S. consumer card spending growth, and 20% log annualized lab revenue levels. Business paid demand uses Ramp median spend per employee, Ramp matched spending growth, and estimated OpenRouter spending growth. The consumer and lab signals cover OpenAI and Anthropic.",
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
  return <HeatmapInfoLabel
    label={pillar}
    subtitle={quarterly ? "Core 25% · TTM score held" : "Core 25% · normalized"}
    description={descriptions[pillar]}
    selected={selected}
    onSelect={onSelect}
  />;
}

export function HeatmapInfoLabel({
  label, subtitle, description, heading, className, selected, onSelect,
}: {
  label: string;
  subtitle: ReactNode;
  description: string;
  heading?: string;
  className?: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const tooltip = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number>(undefined);

  useEffect(() => {
    if (!tooltip.current?.showPopover) {
      trigger.current?.setAttribute("title", [heading, description].filter(Boolean).join(". "));
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
  }, [description, heading]);

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
      className={className}
      aria-pressed={selected}
      aria-describedby={id}
      onPointerEnter={event => { if (event.pointerType !== "touch") show(); }}
      onPointerLeave={scheduleClose}
      onFocus={event => { if (event.currentTarget.matches(":focus-visible")) show(); }}
      onBlur={scheduleClose}
      onClick={() => { onSelect?.(); show(); }}
    >
      {label} <span className="heatmap-pillar-info" aria-hidden="true">i</span>
      <small>{subtitle}</small>
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
      {heading && <strong className="heatmap-tooltip-heading">{heading}</strong>}
      {description}
    </span>
  </>;
}
