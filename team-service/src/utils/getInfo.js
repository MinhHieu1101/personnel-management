export const getInfo = async (table, id) => {
  const info = await table.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  return info;
};
