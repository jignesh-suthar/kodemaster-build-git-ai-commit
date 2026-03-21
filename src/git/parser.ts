import { FileChange } from "../types";

export function parseDiff(rawDiff: string): FileChange[] {
  const fileChanges: FileChange[] = [];

  // Split diff by file
  const chunks = rawDiff.split("diff --git").slice(1);

  for (const chunk of chunks) {
    const lines = chunk.split("\n");

    // Extract filename
    const fileMatch = chunk.match(/a\/(.+?) b\//);
    const fileName = fileMatch ? fileMatch[1] : "unknown";

    let additions = 0;
    let deletions = 0;

    for (const line of lines) {
      // Count additions (ignore +++)
      if (line.startsWith("+") && !line.startsWith("+++")) {
        additions++;
      }

      // Count deletions (ignore ---)
      if (line.startsWith("-") && !line.startsWith("---")) {
        deletions++;
      }
    }

    fileChanges.push({
      file: fileName,
      additions,
      deletions,
      content: chunk.trim()
    });
  }

  return fileChanges;
}