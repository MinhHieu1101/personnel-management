export const getInfo = async (trx, table, id) => {
  return trx(table)
    .select("userId", "username", "email")
    .where("userId", id)
    .first();
};
