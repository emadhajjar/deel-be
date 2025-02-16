export const AdminService = {
  async getProfession(startDate: Date, endDate: Date) {
    return {
      endDate,
      startDate,
    };
  },

  async listClients() {
    return {};
  },
};
