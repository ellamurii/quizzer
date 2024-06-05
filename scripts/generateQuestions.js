import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// eslint-disable-next-line no-undef
const fileName = process.argv[2];

if (!fileName) {
  console.error("Please provide the filename as an argument.");
  // eslint-disable-next-line no-undef
  process.exit(1);
}

const filePath = join("questions", fileName);
const fileContent = readFileSync(filePath, "utf-8");

// Split the file content by lines starting with a number (indicating the beginning of a new question)
const questions = fileContent.split(/\n\d+\./);

const questionObjects = [];

questions.forEach((question) => {
  const lines = question.trim().split("\n");

  const questionText = lines[0].trim();

  // Extract options
  const options = [];
  for (let i = 1; i < lines.length; i++) {
    const optionText = lines[i].slice(3).trim();
    options.push(optionText);
  }

  const questionObject = {
    question: questionText,
    options: options,
    answerIndex: 0, // Prefill answer index as 0
  };

  questionObjects.push(questionObject);
});

const jsonFileName = fileName.replace(/\.[^/.]+$/, "") + ".json"; // Remove file extension and add .json
const jsonFilePath = join("questions", jsonFileName);
writeFileSync(jsonFilePath, JSON.stringify(questionObjects, null, 2));

console.log(`JSON file generated successfully: ${jsonFileName}`);
