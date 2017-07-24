export const initialState = {
  name: 'Prototype_1',
  size: {
    width: 1024,
    height: 768,
  },
  editors: [
    {
      title: 'code1',
      active: true,
      code: `const layerA = new Layer({
  x: Align.center,
  y: Align.center,
  backgroundColor: new Color('blue').alpha(0.5),
});`,
    }, {
      title: 'code2',
      active: false,
      code: 'console.log("Howdy!")',
    },
  ],
};