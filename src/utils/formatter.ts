import { FileChange } from "../types";

// Max content length (optimization)
const MAX_CONTENT_LENGTH = 1000;

export function generatePrompt(changes: FileChange[]): string {
  let prompt = `Analyze the following code changes and generate a commit message.\n\n`;
  prompt += `## Files Changed\n\n`;

  for (const change of changes) {
    let content = change.content;

    // ✂️ Truncate large diffs
    if (content.length > MAX_CONTENT_LENGTH) {
      content = content.slice(0, MAX_CONTENT_LENGTH) + "\n...truncated";
    }

    prompt += `### ${change.file}\n`;
    prompt += `Added: ${change.additions} lines, Removed: ${change.deletions} lines\n`;
    prompt += `${content}\n\n`;
  }

  return prompt.trim();
}