// La fecha objetivo se lee de data-wedding-date (ISO con offset explícito, ver src/data/wedding.ts).
// new Date(iso) resuelve al instante UTC correcto sin importar la zona horaria del visitante,
// así que no hace falta ningún cálculo manual de husos horarios aquí.
const root = document.getElementById('countdown-root');

if (root) {
  const targetISO = root.dataset.weddingDate;
  const target = targetISO ? new Date(targetISO).getTime() : NaN;
  const doneEl = document.getElementById('countdown-done');

  const unitEls = {
    months: root.querySelector<HTMLElement>('[data-unit="months"]'),
    days: root.querySelector<HTMLElement>('[data-unit="days"]'),
    hours: root.querySelector<HTMLElement>('[data-unit="hours"]'),
    minutes: root.querySelector<HTMLElement>('[data-unit="minutes"]'),
    seconds: root.querySelector<HTMLElement>('[data-unit="seconds"]'),
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  /**
   * Desglose calendario correcto: meses completos transcurridos entre `now` y `target`,
   * y el resto (siempre < 1 mes) en días/horas/minutos/segundos. Nunca puede dar `60`
   * ni valores negativos, a diferencia de restar componentes de fecha por separado.
   */
  const breakdown = (now: Date, target: Date) => {
    let months = (target.getUTCFullYear() - now.getUTCFullYear()) * 12 + (target.getUTCMonth() - now.getUTCMonth());

    const anchorAt = (m: number) =>
      new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth() + m,
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds(),
          now.getUTCMilliseconds(),
        ),
      );

    // El "ancla" (now + `months` meses) puede pasarse del target por el desbordamiento
    // de días al sumar meses (ej. 31 de enero + 1 mes -> 3 de marzo). Comparar contra el
    // timestamp real del target, no contra los componentes de fecha, corrige esto siempre
    // con un único ajuste (el resto nunca excede un mes).
    if (anchorAt(months).getTime() > target.getTime()) {
      months -= 1;
    }

    let remainderMs = target.getTime() - anchorAt(months).getTime();

    const days = Math.floor(remainderMs / 86_400_000);
    remainderMs -= days * 86_400_000;
    const hours = Math.floor(remainderMs / 3_600_000);
    remainderMs -= hours * 3_600_000;
    const minutes = Math.floor(remainderMs / 60_000);
    remainderMs -= minutes * 60_000;
    const seconds = Math.floor(remainderMs / 1000);

    return { months, days, hours, minutes, seconds };
  };

  const tick = () => {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      root.hidden = true;
      if (doneEl) doneEl.hidden = false;
      clearInterval(intervalId);
      return;
    }

    const { months, days, hours, minutes, seconds } = breakdown(new Date(now), new Date(target));

    if (unitEls.months) unitEls.months.textContent = String(months);
    if (unitEls.days) unitEls.days.textContent = String(days);
    if (unitEls.hours) unitEls.hours.textContent = pad(hours);
    if (unitEls.minutes) unitEls.minutes.textContent = pad(minutes);
    if (unitEls.seconds) unitEls.seconds.textContent = pad(seconds);
  };

  tick();
  const intervalId: ReturnType<typeof setInterval> = setInterval(tick, 1000);
}
