type ButtonProps = {
    text: string;
    onClick: () => void;
    isActive: boolean;
}

const Button = ({ text, onClick, isActive }: ButtonProps) => {

  return (
    <button className={`p-2 bg-grey rounded-lg py-2 px-4 text-blue h-1/12 w-auto lg:mr-4 text-center font-normal hover:bg-blue hover:text-white ${isActive ? '!bg-darker-navy text-white' : ''}`} onClick={onClick}>{text}</button>
  )
}

export default Button