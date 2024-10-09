function ClearFiltersButton() {
  const clearFilter = () => {
    window.location.search = "";
  };

  return (
    <div class="flex fixed bottom-0 bg-white w-full z-10 max-w-[312px]">
      <button
        class="h-12 text-[#27239E] text-base font-bold  border-[1.5px] border-[#27239E] w-full rounded-lg px-4 mx-4 my-4"
        onClick={clearFilter}
      >
        Limpar
      </button>
    </div>
  );
}

export default ClearFiltersButton;
