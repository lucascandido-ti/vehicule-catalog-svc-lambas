import { Transform } from "class-transformer";

export function ParseJson() {
  return Transform(({ value }) => {
    try {
      return value ? JSON.parse(value) : value;
    } catch (e) {
      throw new Error("Invalid JSON format");
    }
  });
}
