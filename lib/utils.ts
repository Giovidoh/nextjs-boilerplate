export { cn } from "cn";

/** Per-slot class overrides for multi-part components: `classNames={{ input: "…" }}`. */
export type SlotClassNames<Slot extends string> = Partial<Record<Slot, string>>;
