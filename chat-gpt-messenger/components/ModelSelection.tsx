"use client";

import useSWR from "swr";
import Select from "react-select";

const fetchModels = async () => {
  return fetch("/api/getEngines").then((res) => res.json());
};

function ModelSelection() {
  const { data: models, isLoading } = useSWR("models", fetchModels);

  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div>
      <Select
        className="mt-2"
        defaultValue={model}
        placeholder={model}
        isSearchable
        options={models?.modelOptions}
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      ></Select>
    </div>
  );
}

export default ModelSelection;
