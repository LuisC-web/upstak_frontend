import ProfileForm from "@/components/porfile/PorfileForm";
import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/hooks/useAuth";

function PorfileView() {
  const { isLoading, data } = useAuth();
  if (isLoading) return <Spinner />;
  if (data) return <ProfileForm data={data} />;
}

export default PorfileView;
