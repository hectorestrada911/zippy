"use client";

import DisplayCards from "@/components/ui/display-cards";
import { AlertCircle, Banknote, MessageCircle } from "lucide-react";

const defaultCards = [
  {
    icon: <AlertCircle className="size-4 text-amber-300" />,
    title: "Overdue",
    description: "Who's past due, we'll nudge them",
    date: "See dashboard",
    iconClassName: "text-amber-500",
    titleClassName: "text-amber-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:outline before:outline-1 before:outline-border before:bg-background/50 before:bg-blend-overlay before:content-[''] before:transition-opacity before:duration-700 grayscale-[100%] hover:grayscale-0 hover:before:opacity-0",
  },
  {
    icon: <Banknote className="size-4 text-emerald-300" />,
    title: "Got paid this week",
    description: "Money in, from your pay links",
    date: "From Zippy",
    iconClassName: "text-emerald-500",
    titleClassName: "text-emerald-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:outline before:outline-1 before:outline-border before:bg-background/50 before:bg-blend-overlay before:content-[''] before:transition-opacity before:duration-700 grayscale-[100%] hover:grayscale-0 hover:before:opacity-0",
  },
  {
    icon: <MessageCircle className="size-4 text-cyan-300" />,
    title: "Why they haven't paid",
    description: "Wrong amount? Need PO? Fix it here, one place",
    date: "One place",
    iconClassName: "text-cyan-500",
    titleClassName: "text-cyan-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}
