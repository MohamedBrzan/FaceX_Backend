export default (model: any, property: string, target: string) => {
  const foundedTarget = model[property].published.splice(
    model[property].published.indexOf(target),
    1
  );

  foundedTarget.length < 1 &&
    model[property].reacted.splice(model[property].reacted.indexOf(target), 1);
};
