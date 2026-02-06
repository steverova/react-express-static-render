import { LoaderCircle } from "lucide-react";

export default function LoadingFallback() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-4">
      <LoaderCircle className="animate-spin" size={48} />
    </div>
  );
}
