declare module '*.css' {
  const content: any;
  export default content;
}

// Opcional: Si importas otros assets directamente, inclúyelos también
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
