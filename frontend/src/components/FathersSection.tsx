import { getFathers } from "@/lib/queries";
import Fathers from "./Fathers";

const FathersSection = async () => {
  const result = await getFathers();

  const fathersList = result.page?.acfhomefg?.fathers;

  const fathers = fathersList
    ? Object.values(fathersList).filter((father) => father !== null)
    : [];


  return (
    <div className="">
      <Fathers fathers={fathers} />
    </div>
  );
};

export default FathersSection;
