import Link from "next/link";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function EmptyState({ title, subtitle, buttonText, buttonLink }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-base-200 rounded-xl border border-base-300 my-8 w-full">
      <div className="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mb-6">
        <FolderOpen className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
        {subtitle}
      </p>
      {buttonText && buttonLink && (
        <Link href={buttonLink} className="btn btn-warning px-8">
          {buttonText}
        </Link>
      )}
    </div>
  );
}