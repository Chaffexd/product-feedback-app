type ButtonProps = {
    text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="p-2 bg-grey rounded-lg py-2 px-4 text-blue h-10 w-auto mr-4 text-center font-normal hover:bg-blue hover:text-white">{text}</button>
  )
}

export default Button