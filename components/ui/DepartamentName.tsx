// deno-lint-ignore-file
import { useState } from "preact/hooks";

function DepartmentName() {
  const [departmentName, setDepartmentName] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const nameSearch = urlParams.get("q");

  var fullpathname = window.location.pathname;

  if (fullpathname) {
    var pathWithoutInitialSlash = fullpathname.replace(/^\/+/g, "");
    pathWithoutInitialSlash = pathWithoutInitialSlash.replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toLowerCase());
    pathWithoutInitialSlash = pathWithoutInitialSlash.charAt(0).toUpperCase() +
      pathWithoutInitialSlash.slice(1);
    setDepartmentName(pathWithoutInitialSlash);
  }

  return (
    <div class="flex">
      <div class="text-[##000] text-base xl:text-xl font-bold">
        <span>{nameSearch ? nameSearch : departmentName}</span>
      </div>
    </div>
  );
}

export default DepartmentName;
