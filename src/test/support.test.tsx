import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SupportSection } from "@/components/portfolio/support-section";
import { isValidSupportAmount, support } from "@/content/site";

afterEach(cleanup);

describe("support configuration", () => {
  it("uses the requested EGP presets", () => {
    expect(support.currencies.EGP.presets).toEqual([50, 100, 200, 500]);
  });
  it("uses the requested USD presets", () => {
    expect(support.currencies.USD.presets).toEqual([1, 3, 5, 10]);
  });
  it("settles locally in EGP only", () => {
    expect(support.settlementCurrency).toBe("EGP");
  });
  it("has only unconfigured local payment methods", () => {
    expect(support.paymentMethods.map((method) => [method.label, method.availability])).toEqual([
      ["InstaPay / Meeza", "coming-soon"], ["Vodafone Cash", "coming-soon"],
    ]);
  });
  it("validates positive custom amounts without converting them", () => {
    expect(isValidSupportAmount("125.50")).toBe(true);
    for (const invalid of ["", "0", "-5", "Infinity", "1e4", "1.234", "abc"]) {
      expect(isValidSupportAmount(invalid)).toBe(false);
    }
  });
});

describe("support choices", () => {
  it("keeps independent custom amounts when changing display currencies", () => {
    render(<SupportSection />);
    const input = screen.getByLabelText("Custom amount");
    fireEvent.change(input, { target: { value: "150" } });
    fireEvent.click(screen.getByRole("button", { name: /^USD$/ }));
    expect(input).toHaveValue("");
    fireEvent.change(input, { target: { value: "7" } });
    fireEvent.click(screen.getByRole("button", { name: /^EGP$/ }));
    expect(input).toHaveValue("150");
    fireEvent.click(screen.getByRole("button", { name: /^USD$/ }));
    expect(input).toHaveValue("7");
  });
  it("allows switching payment method without initiating a payment", () => {
    render(<SupportSection />);
    const bank = screen.getByRole("button", { name: /InstaPay \/ Meeza/ });
    const wallet = screen.getByRole("button", { name: /Vodafone Cash/ });
    fireEvent.click(bank);
    expect(bank).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(wallet);
    expect(wallet).toHaveAttribute("aria-pressed", "true");
    expect(bank).toHaveAttribute("aria-pressed", "false");
    expect(support.paymentMethods.every((method) => method.availability === "coming-soon")).toBe(true);
  });
});