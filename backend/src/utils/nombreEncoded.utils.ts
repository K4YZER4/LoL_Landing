export const nombreEncoded = async (nombre: string): Promise<string> =>
  encodeURIComponent(nombre);
