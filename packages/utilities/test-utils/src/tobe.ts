const toBe = (label: string, caller: (input: string) => string, cases: [string, string][]) => {
  it("v0xtest | " + label, () => {
    cases.forEach((arg) => {
      expect(caller(arg[0])).toBe(arg[1]);
    });
  });
};

const toBeList = (label: string, caller: (input: string) => string, cases: [string, string][]) => {
  it.each(cases)("v0xtest | " + label, (input, expected) => {
    expect(caller(input)).toBe(expected);
  });
};

export {toBe, toBeList};
