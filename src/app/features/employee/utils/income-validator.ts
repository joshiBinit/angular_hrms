import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

interface IncomeFormValue {
  frequency: number;
  interval: string;
  amount: number;
}

export class IncomeValidator {
  private static readonly INTERVAL_DAYS: { [key: string]: number } = {
    Daily: 1,
    Weekly: 7,
    Monthly: 30,
    Quarterly: 90,
    Yearly: 365,
  };

  private static calculateDailyIncome(income: IncomeFormValue): number {
    const { frequency, interval, amount } = income;
    const intervalDays = this.INTERVAL_DAYS[interval] || 1;

    return (amount * frequency) / intervalDays;
  }

  private static calculateExpectedAmount(
    dailyIncome: number,
    frequency: number,
    interval: string
  ): number {
    const intervalDays = this.INTERVAL_DAYS[interval] || 1;

    return (dailyIncome * intervalDays) / frequency;
  }

  static incomeConsistency(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control;

      if (
        !formArray ||
        !Array.isArray(formArray.value) ||
        formArray.value.length < 2
      ) {
        return null;
      }

      const incomes: IncomeFormValue[] = formArray.value;

      const validIncomes = incomes.filter(
        (income) =>
          income.frequency !== null &&
          income.interval !== null &&
          income.amount !== null &&
          income.amount > 0
      );

      if (validIncomes.length < 2) {
        return null;
      }

      const baseDailyIncome = this.calculateDailyIncome(validIncomes[0]);

      for (let i = 1; i < validIncomes.length; i++) {
        const currentIncome = validIncomes[i];
        const currentDailyIncome = this.calculateDailyIncome(currentIncome);

        const tolerance = baseDailyIncome * 0.01;
        const difference = Math.abs(currentDailyIncome - baseDailyIncome);

        if (difference > tolerance) {
          const expectedAmount = this.calculateExpectedAmount(
            baseDailyIncome,
            currentIncome.frequency,
            currentIncome.interval
          );

          return {
            incomeInconsistent: {
              index: i,
              currentAmount: currentIncome.amount,
              expectedAmount: Math.round(expectedAmount),
              message: `Income entry ${
                i + 1
              } is inconsistent. Expected amount: ${Math.round(
                expectedAmount
              )} based on your other entries.`,
            },
          };
        }
      }

      return null;
    };
  }

  static getExpectedAmount(
    baseIncome: IncomeFormValue,
    targetFrequency: number,
    targetInterval: string
  ): number {
    const baseDailyIncome = this.calculateDailyIncome(baseIncome);
    return this.calculateExpectedAmount(
      baseDailyIncome,
      targetFrequency,
      targetInterval
    );
  }
}
