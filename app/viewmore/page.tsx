
import ViewMoreServer from "./ViewMoreServer";

export default function Page({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  return <ViewMoreServer searchParams={searchParams} />;
}
