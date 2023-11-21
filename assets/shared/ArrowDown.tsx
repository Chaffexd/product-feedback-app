type ArrowProps = {
  dropdown: boolean;
};

const ArrowDown = ({ dropdown }: ArrowProps) => {
  return (
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1l4 4 4-4"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ArrowDown;
