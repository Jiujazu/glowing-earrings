import fs from "fs";
import path from "path";
import type { Course } from "@/lib/types";

const coursesDir = path.join(process.cwd(), "content/courses");

const jsonFiles = fs
  .readdirSync(coursesDir)
  .filter((f) => f.endsWith(".json"));

export const courses: Course[] = jsonFiles.map((file) => {
  const raw = fs.readFileSync(path.join(coursesDir, file), "utf-8");
  return JSON.parse(raw) as Course;
});
