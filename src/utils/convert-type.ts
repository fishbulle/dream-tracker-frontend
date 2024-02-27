export function convertType(type: string) {
  switch (type) {
    case `NIGHTMARE`:
      return "nightmare";
    case `NOT_NIGHTMARE`:
      return "not nightmare";
  }
}
