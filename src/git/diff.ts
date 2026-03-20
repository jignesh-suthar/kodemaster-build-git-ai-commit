import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// 👁️ Function to get staged diff
export async function getStagedDiff(): Promise<string> {
  try {
    const { stdout } = await execAsync("git diff --cached");

    if (!stdout) {
      console.log("⚠️ No staged changes found.");
      return "";
    }

    return stdout;
  } catch (error: any) {
    console.error("❌ Failed to get staged diff. Are you in a git repo?");
    return "";
  }
}