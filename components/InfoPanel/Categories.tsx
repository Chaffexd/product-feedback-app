import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Button from "../UI/Button";
import { filterActions } from "@/app/store/filter-slice";

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
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );

  const handleCategoryClick = (category: string) => {
    dispatch(filterActions.setCategory(category));
  };

  return (
    <div className="sm:rounded-lg bg-white p-4 sm:w-4/12 md:h-40 lg:h-auto lg:w-auto h-auto gap-2 mb-4 box-border flex flex-wrap items-center">
      {categories.map((category) => (
        <Button
          key={category.id}
          text={category.buttonText}
          onClick={() => handleCategoryClick(category.buttonText)}
          isActive={selectedCategory === category.buttonText}
        />
      ))}
    </div>
  );
};

export default Categories;
