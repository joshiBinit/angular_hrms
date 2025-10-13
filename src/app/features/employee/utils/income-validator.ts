import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

interface IncomeFormValue {
  frequency: number;
  interval: string;
  amount: number;
}

export class IncomeValidator {
  private static readonly INTERVAL_RANK: { [key: string]: number } = {
    Daily: 1,
    Weekly: 2,
    Monthly: 3,
    Quarterly: 4,
    Yearly: 5,
  };

  static incomeConsistency(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;

      if (!formArray || formArray.length < 2) {
        return null;
      }

      const validIncomes: { income: IncomeFormValue; index: number }[] = [];

      for (let i = 0; i < formArray.length; i++) {
        const income = formArray.at(i).value as IncomeFormValue;
        if (income.interval && income.amount !== null && income.amount > 0) {
          validIncomes.push({ income, index: i });
        }
      }

      if (validIncomes.length < 2) {
        return null;
      }

      const baseIncome = validIncomes[0];

      for (let i = 1; i < validIncomes.length; i++) {
        const current = validIncomes[i];

        for (let j = 0; j < i; j++) {
          const previous = validIncomes[j];

          const currentRank = this.INTERVAL_RANK[current.income.interval];
          const previousRank = this.INTERVAL_RANK[previous.income.interval];

          let hasError = false;
          let message = '';

          if (
            currentRank > previousRank &&
            current.income.amount <= previous.income.amount
          ) {
            hasError = true;

            message = `Invalid amount`;
          }

          if (
            currentRank < previousRank &&
            current.income.amount >= previous.income.amount
          ) {
            hasError = true;
            message = `Invalid amount`;
          }

          if (hasError) {
            return {
              invalidIncomeHierarchy: {
                message: message,
                invalidIndex: current.index,
              },
            };
          }
        }
      }

      return null;
    };
  }
}
