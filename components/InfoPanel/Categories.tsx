import Button from "../UI/Button";

const categories = [
  {
    id: "c1",
    buttonText: "All",
  },
  {
    id: "c2",
    buttonText: "UI",
  },
  {
    id: "c3",
    buttonText: "UX",
  },
  {
    id: "c4",
    buttonText: "Enhancement",
  },
  {
    id: "c5",
    buttonText: "Bug",
  },
  {
    id: "c6",
    buttonText: "Feature",
  },
];

const Categories = () => {
  return (
    <div className="rounded-lg bg-white p-4 h-auto gap-2 mb-4 box-border flex flex-wrap items-center">
      {categories.map((category) => (
        <Button key={category.id} text={category.buttonText} />
      ))}
    </div>
  );
};

export default Categories;
