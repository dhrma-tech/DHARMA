import { getAllProjects } from "@/lib/content";
import Section from "@/components/ui/Section";
import ProjectList from "@/components/projects/ProjectList";

export default function Projects() {
  const projects = getAllProjects();
  if (projects.length === 0) return null;

  return (
    <Section id="projects" label="projects">
      <ProjectList projects={projects} />
    </Section>
  );
}
