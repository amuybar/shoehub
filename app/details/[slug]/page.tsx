import ShoeDetailServer from "@/app/components/Fetch/ShoeDetailServer";

const ShoeDetailPage = ({ params }: { params: { slug: string } }) => {
  return <ShoeDetailServer params={params} />;
};

export default ShoeDetailPage;
