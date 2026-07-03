import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        {project.tag ? <Badge>{project.tag}</Badge> : null}
      </CardHeader>
      <CardContent className="text-sm text-text">{project.description}</CardContent>
    </Card>
  );
}
