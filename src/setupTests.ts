import "@testing-library/jest-dom";
import { vi } from "vitest";

declare global {
  // expose a `jest` global (for code/tests that expect jest)
  var jest: typeof vi;
}

globalThis.jest = vi;
