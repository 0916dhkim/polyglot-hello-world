// All available languages.
export const options = [
	"Python",
	"Node.js",
	"Rust",
	"Ruby",
	"C",
	"C++",
	"C#",
	"PHP",
	"Java"
] as const;
export type Option = typeof options[number];
