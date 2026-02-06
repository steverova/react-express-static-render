import type { JSX } from "react";
import ThemeMode from "../theme-mode";

export default function ToolbarActions(): JSX.Element {
  return (
    <div className="flex items-center space-x-4">
      <ThemeMode />
    </div>
  )
}