export interface SelectCategoryProps {
    selectedCategory: 'all' | number
    setSelectedCategory: (value: 'all' | number) => void
}