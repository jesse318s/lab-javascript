class PointerMimic {
  #arr;
  #ind;

  constructor(arr) {
    if (!Array.isArray(arr)) throw new Error("Argument must be an array");

    this.#arr = arr;
    this.#ind = 0;
  }

  // Mimic pointer dereference
  deref() {
    return this.#arr[this.#ind];
  }

  // Mimic setting a pointer's dereferenced value
  setDerefVal(val) {
    if (this.#arr[this.#ind] instanceof PointerMimic)
      throw new Error("MimicPointer to MimicPointer must be dereferenced");

    this.#arr[this.#ind] = val;
  }

  // Mimic pointer equality
  equals(other) {
    if (other instanceof PointerMimic)
      return this.#arr === other.#arr && this.#ind === other.#ind;

    throw new Error("Can only compare with another PointerMimic");
  }

  // Mimic pointer increment
  inc() {
    if (this.#ind < this.#arr.length - 1) this.#ind++;
  }

  // Mimic pointer decrement
  dec() {
    if (this.#ind > 0) this.#ind--;
  }
}

const demonstratePointerMimic = () => {
  try {
    // Usage
    const arr = [1, 2, 3, 4, 5];
    const ptrMim = new PointerMimic(arr);
    const ptrMim2 = new PointerMimic([1, 2, 3, 4, 5]);

    console.log(ptrMim.deref()); // 1
    ptrMim.inc();
    console.log(ptrMim.deref()); // 2
    ptrMim.dec();
    console.log(ptrMim.deref()); // 1
    ptrMim.setDerefVal(10);
    console.log(arr); // [10, 2, 3, 4, 5]
    ptrMim.setDerefVal(ptrMim2);
    console.log(ptrMim.deref().equals(ptrMim2)); // true
    ptrMim.deref().setDerefVal(20);
    console.log(ptrMim.deref()); // PointerMimic {#arr: [ 20, 2, 3, 4, 5 ], #ind: 0 }

    // Utility of automatic pass by reference
    const modPointerMimic = (ptrMim) => {
      ptrMim.inc();
      ptrMim.inc();
    };

    modPointerMimic(ptrMim);
    console.log(ptrMim.deref()); // 3
  } catch (err) {
    console.error(err);
  }
};
