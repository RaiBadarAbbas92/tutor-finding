import { TutorProfileContent } from "@/components/tutor-profile-content"

interface TutorProfilePageProps {
  params: {
    id: string;
  };
}

export default function TutorProfilePage({ params }: TutorProfilePageProps) {
  const tutorId = parseInt(params.id)

  return <TutorProfileContent tutorId={tutorId} />
}
