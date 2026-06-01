import { Metadata } from "next";
import { getProjectBySlug } from "@/lib/firestore";
import ProjectDetailsClient from "./ProjectDetailsClient";
import { getCloudinaryUrl } from "@/lib/storage";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.title} | AlisTech Case Study`;
  const description = project.shortDescription || project.fullDescription?.substring(0, 160) || "";
  const ogImage = project.coverImage ? getCloudinaryUrl(project.coverImage, { width: 1200 }) : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  return <ProjectDetailsClient slug={params.slug} />;
}
