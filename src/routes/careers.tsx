import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, ButtonLink } from "@/components/site/Layout";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  head: () => pageMeta("Careers and Opportunities", "Explore opportunities with JLuxe, get career counselling, or hire through JLuxe Talent & Training."),
  component: Careers,
});

const paths = [
  { title: "Looking for a job", body: "Share your profile. Open roles will be listed here once published.", to: "/contact?ecosystem=talent-training&intent=job-seeker" },
  { title: "Career counselling", body: "Guidance for students and professionals planning their next step.", to: "/contact?ecosystem=talent-training&intent=counselling" },
  { title: "Hiring staff", body: "Recruitment and staffing support for employers.", to: "/contact?ecosystem=talent-training&intent=employer" },
  { title: "Training for institutions", body: "Corporate and college training programmes.", to: "/contact?ecosystem=talent-training&intent=training" },
];

function Careers() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Explore Opportunities" intro="Whether you are looking for work or looking to hire, start here." />
      <section className="mx-auto grid max-w-7xl gap-px bg-border px-0 md:grid-cols-2">
        {paths.map((p) => (
          <div key={p.title} className="bg-background p-10">
            <h2 className="text-3xl">{p.title}</h2>
            <p className="mt-3 text-muted-foreground">{p.body}</p>
            <div className="mt-6"><ButtonLink to={p.to} variant="text">Get in touch</ButtonLink></div>
          </div>
        ))}
      </section>
      <p className="mx-auto max-w-7xl px-6 py-12 text-sm text-muted-foreground">
        No open roles are listed yet. Learn more about{" "}
        <Link to="/ecosystems/$slug" params={{ slug: "talent-training" }} className="underline">JLuxe Talent & Training</Link>.
      </p>
    </>
  );
}
