export class SimpleLinearRegression {
  constructor() {
    this.slope = 0;
    this.intercept = 0;
  }

  train(x, y) {
    const n = x.length;
    const xMean = x.reduce((a, b) => a + b) / n;
    const yMean = y.reduce((a, b) => a + b) / n;

    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < n; i++) {
      numerator += (x[i] - xMean) * (y[i] - yMean);
      denominator += Math.pow(x[i] - xMean, 2);
    }

    this.slope = numerator / denominator;
    this.intercept = yMean - this.slope * xMean;
  }

  predict(x) {
    return this.slope * x + this.intercept;
  }
}
