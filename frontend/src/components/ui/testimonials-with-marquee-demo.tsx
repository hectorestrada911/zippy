import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

const testimonials = [
  {
    author: {
      name: "Sarah Chen",
      handle: "Bookkeeper, small firm",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "Reminders go out on their own. I see who paid in one place. No more spreadsheets or chasing over email.",
  },
  {
    author: {
      name: "Marcus Webb",
      handle: "Agency owner",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "Overdue AR dropped by a third. Same friendly reminders, just automated. Clients actually pay faster.",
  },
  {
    author: {
      name: "Jordan Lee",
      handle: "Freelance consultant",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    text: "Five minutes to set up. One link to pay or report an issue. Questions land in one place so I’m not digging through inbox.",
  },
];

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Join teams who get paid faster"
      description="Consultants, agencies, and bookkeepers use Zippy to stop chasing and start getting paid."
      testimonials={testimonials}
    />
  );
}
