export function debounce(fnToCall, timeout) {
  let timer = null;
  let ctx = this;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fnToCall.apply(ctx, [...arguments]);
    }, timeout);
  };
}
