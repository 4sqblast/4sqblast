import { getGrowthGroups } from "@/lib/queries";

const GrowthGroups = async () => {
  const result = await getGrowthGroups();

  const growthGroupsList = result.page?.acfhomefg?.growthGroups;

  const growthGroups = growthGroupsList
    ? Object.values(growthGroupsList).filter(
        (growthGroup) => growthGroup !== null,
      )
    : [];

  return (
    <div className="">
      {growthGroups.map((growthGroup, index) => (
        <div key={`${growthGroup.title}-${index}`} className="growthGroup">
          <h3>{growthGroup.title}</h3>
          <p>{growthGroup.details}</p>
          <p>{growthGroup.image.node.mediaItemUrl}</p>
          <p>{growthGroup.coordinator.name}</p>
          <p>{growthGroup.coordinator.title}</p>
          <p>{growthGroup.coordinator.email}</p>
          <p>{growthGroup.coordinator.image.node.mediaItemUrl}</p>
        </div>
      ))}
    </div>
  );
};

export default GrowthGroups;
