export const toBinary = <T>(value?: string, fallback?: any) => {
  const inCase = btoa(JSON.stringify(fallback));
  return JSON.parse(atob(value ?? inCase)) as T;
};
