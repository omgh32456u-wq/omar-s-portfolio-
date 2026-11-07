import { useLanguage } from "./language";
import { useState } from "react";
import { Banknote, Check, Coffee, Info, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidSupportAmount, support, type SupportCurrency } from "@/content/site";

export function SupportSection() {
  const { t, language } = useLanguage();
  const [currency, setCurrency] = useState<SupportCurrency>("EGP");
  const [amounts, setAmounts] = useState({ EGP: "100", USD: "3" });
  const [custom, setCustom] = useState({ EGP: false, USD: false });
  const [methodId, setMethodId] = useState<string | null>(null);
  const amount = amounts[currency];
  const valid = isValidSupportAmount(amount);
  const method = support.paymentMethods.find((item) => item.id === methodId);

  function chooseAmount(value: string, isCustom: boolean) {
    setAmounts((previous) => ({ ...previous, [currency]: value }));
    setCustom((previous) => ({ ...previous, [currency]: isCustom }));
  }

  return (
    <div className="grid gap-8 border-y py-8 sm:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      <div className="max-w-md">
        <Coffee className="mb-4 size-7 text-accent" aria-hidden="true" />
        <h2 id="support-title" className="text-3xl font-semibold tracking-normal">{t(support.title)}</h2>
        <p className="mt-4 text-muted-foreground">{t(support.body)}</p>
        <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          {t('Payments are not available yet. No transfer will be initiated here.')}
        </p>
      </div>

      <div className="min-w-0 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold">{t('Contribution amount')}</span>
          <div className="inline-flex gap-1 rounded-lg border bg-surface/60 p-1" role="group" aria-label={t("Display currency")}>
            {(["EGP", "USD"] as const).map((value) => (
              <Button key={value} type="button" variant={currency === value ? "default" : "ghost"}
                aria-pressed={currency === value} onClick={() => setCurrency(value)} className="min-w-16">
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label={language === "ar" ? `مبالغ ${currency} المقترحة` : `${currency} preset amounts`}>
          {support.currencies[currency].presets.map((value) => (
            <Button key={value} type="button" variant="outline"
              aria-pressed={!custom[currency] && amount === String(value)}
              onClick={() => chooseAmount(String(value), false)}
              className={`h-12 bg-surface/60 font-mono hover:bg-primary/10 hover:text-foreground ${!custom[currency] && amount === String(value) ? "border-primary bg-primary/10 text-primary" : ""}`}>
              {value} {currency}
            </Button>
          ))}
        </div>

        <div>
          <label htmlFor="support-custom-amount" className="mb-2 block text-sm text-muted-foreground">{t('Custom amount')}</label>
          <div className="flex items-center rounded-lg border bg-surface/60 focus-within:border-primary">
            <input id="support-custom-amount" type="text" inputMode="decimal" autoComplete="off"
              value={custom[currency] ? amount : ""} placeholder={t("Enter amount")} dir="ltr"
              onChange={(event) => chooseAmount(event.target.value, true)}
              aria-invalid={custom[currency] && !valid} aria-describedby="support-currency-note support-amount-error"
              className="h-12 min-w-0 flex-1 rounded-lg bg-transparent px-4 text-foreground outline-none" />
            <span className="px-4 font-mono text-sm text-muted-foreground">{currency}</span>
          </div>
          <p id="support-amount-error" className="mt-2 text-sm text-destructive" role="status">
            {custom[currency] && !valid ? t("Enter an amount greater than zero, with up to two decimal places.") : null}
          </p>
          <p id="support-currency-note" className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {currency === "USD" ? t("USD is display-only for now. ") : ""}
            {t('Local transfers are settled in EGP. No exchange rate or currency conversion is applied.')}
          </p>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold">{t('Payment method')}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {support.paymentMethods.map((item) => {
              const selected = methodId === item.id;
              const Icon = item.kind === "bank" ? Banknote : Wallet;
              return (
                <Button key={item.id} type="button" variant="outline" aria-pressed={selected}
                  onClick={() => setMethodId(item.id)}
                  className={`glass h-auto min-h-24 justify-start whitespace-normal rounded-lg p-4 text-start hover:bg-primary/10 hover:text-foreground ${selected ? "border-primary" : ""}`}>
                  <Icon className="text-primary" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{t(item.label)}</span>
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">{t('Coming soon')}</span>
                  </span>
                  {selected && <Check className="text-primary" aria-hidden="true" />}
                </Button>
              );
            })}
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true" className="min-h-24 rounded-lg border border-dashed bg-surface/40 p-4">
          {method ? (
            <>
              <p className="text-sm font-semibold">{t('Payment details will be available soon')}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(method.label)}{t(" is not configured yet. No payment has been initiated.")}</p>
            </>
          ) : <p className="text-sm text-muted-foreground">{t('Payment details will be available soon for both methods.')}</p>}
        </div>
      </div>
    </div>
  );
}