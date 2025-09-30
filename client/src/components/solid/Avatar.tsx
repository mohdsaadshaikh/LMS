const Avatar = (props: { name: string; size?: number; styles?: string }) => {
  const size = props.size || 40;
  return (
    <div
      class={`flex items-center select-none justify-center rounded-full bg-gray-100 font-normal ${props.styles}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        "font-size": `${size / 2}px`,
      }}
      title={props.name}
    >
      {props.name.charAt(0).toUpperCase()}
    </div>
  );
};
export default Avatar;
