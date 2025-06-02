export class KNearestNeighbors {
  constructor() {
    this.dataset = [];
  }

  // Train the model with feature-label pairs
  train(features, labels) {
    this.dataset = features.map((feature, index) => ({
      features: feature,
      label: labels[index],
    }));
  }

  // Calculate Euclidean distance between two feature vectors
  calculateDistance(a, b) {
    return Math.sqrt(
      a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
    );
  }

  // Predict the label for given features using k=1 (nearest neighbor)
  predict(features) {
    if (this.dataset.length === 0) {
      throw new Error("Model must be trained before making predictions");
    }

    let minDist = Infinity;
    let prediction = null;

    this.dataset.forEach((sample) => {
      const dist = this.calculateDistance(sample.features, features);
      if (dist < minDist) {
        minDist = dist;
        prediction = sample.label;
      }
    });

    return prediction;
  }
}

export class DecisionTree {
  constructor() {
    this.rules = {
      feature: 2, // petal length
      thresholds: [2.5, 4.8],
      labels: ["setosa", "versicolor", "virginica"],
    };
  }

  // Predict using simple threshold rules
  predict(features) {
    const featureValue = features[this.rules.feature];

    if (featureValue <= this.rules.thresholds[0]) {
      return this.rules.labels[0];
    } else if (featureValue <= this.rules.thresholds[1]) {
      return this.rules.labels[1];
    } else {
      return this.rules.labels[2];
    }
  }
}

// Example usage and initialization with iris dataset
export function createPretrainedIrisClassifiers() {
  // Sample iris dataset
  const irisFeatures = [
    [5.1, 3.5, 1.4, 0.2],
    [7.0, 3.2, 4.7, 1.4],
    [6.3, 3.3, 6.0, 2.5],
  ];

  const irisLabels = ["setosa", "versicolor", "virginica"];

  // Create and train KNN classifier
  const knn = new KNearestNeighbors();
  knn.train(irisFeatures, irisLabels);

  // Create decision tree
  const decisionTree = new DecisionTree();

  return { knn, decisionTree };
}
