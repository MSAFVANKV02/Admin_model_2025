

export const formatOrderDate = (orderDate: string | Date | undefined) => {
    if (!orderDate) {
      return "Invalid date"; // Handle invalid dates appropriately
    }
    const date =
      typeof orderDate === "string" ? new Date(orderDate) : orderDate;
    return date.toLocaleString("en-US", {
      weekday: "long", // "Monday"
      year: "numeric", // "2024"
      month: "long", // "August"
      day: "numeric", // "13"
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };