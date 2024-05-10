const hashCode = (s) =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

const testHashCode = () => {
  try {
    class Rectangle {
      constructor(height, width) {
        this.height = height;
        this.width = width;
      }

      toString() {
        return this.height + "x" + this.width;
      }
    }

    const rectangle = new Rectangle(10, 20);
    const rectangle2 = new Rectangle(20, 30);

    console.assert(
      rectangle.toString() !== rectangle2.toString(),
      `Hash code data test complete - the rectangle dimensions ${rectangle} and ${rectangle2} are equal.`
    );
    console.assert(
      hashCode(rectangle.toString()) !== hashCode(rectangle2.toString()),
      `Hash code test complete - the hash codes ${hashCode(
        rectangle.toString()
      )} and ${hashCode(rectangle2.toString())} are equal.`
    );
  } catch (err) {
    console.error(err);
  }
};
