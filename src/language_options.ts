// All available languages.
export const options = [
	"Python",
	"Node.js",
	"Rust"
] as const;
export type Option = typeof options[number];
