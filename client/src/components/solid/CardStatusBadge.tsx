type CardStatusBadgeProps = {
  status: string;
};

const CardStatusBadge = (props: CardStatusBadgeProps) => {
  const getClasses = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "BLOCKED":
        return "bg-yellow-100 text-yellow-800";
      case "EXPIRED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      class={`px-2 py-1 rounded-full text-xs font-medium ${getClasses(
        props.status
      )}`}
    >
      {props.status}
    </span>
  );
};

export default CardStatusBadge;
