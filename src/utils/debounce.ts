export function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
