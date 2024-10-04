"use client";

import Link from "next/link";
import { LucideIcon, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface NavProps {
  links: {
    title: string;
    label?: string;
    variant: "default" | "ghost";
  }[];
}

export function Nav({ links }: NavProps) {
  return (
    <div className="max-w-80 min-h-screen flex flex-col border gap-4">
      <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href="#"
            className={cn(
              buttonVariants({ variant: link.variant, size: "sm" }),
              link.variant === "default" &&
                "bg-slate-800 dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start h-11 font-semibold text-lg gap-2"
            )}
          >
            {<Trash2 />}
            {link.title}
            {link.label && (
              <span
                className={cn(
                  "ml-auto",
                  link.variant === "default" &&
                    "text-background dark:text-white"
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
