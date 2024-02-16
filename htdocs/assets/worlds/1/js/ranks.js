const mapName = "Leyana's Home";

const file = {
  creator: "data/worlds/all/ranks/creator.txt",
  staffs: "data/worlds/1/ranks/staffs.txt",
  vips: "data/worlds/1/ranks/vips.txt",
};

const id = {
  creator: "creatorData",
  staffs: "staffsData",
  vips: "vipsData",
};

const fetchAllRanks = async () => {
  const fetchPromises = Object.keys(file).map((name) =>
    fetchDataRank({ name })
  );
  await Promise.all(fetchPromises);
};

fetchAllRanks();
