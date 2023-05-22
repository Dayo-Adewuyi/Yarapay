import React from "react";

interface Props {
  type: string;
  label: string;
  name?: string;
  placeholder: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input(props: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="w-full bg-[#F5F8FE] border border-gray-200 rounded-md px-3 py-2 focus-visible:outline-blue-500 focus:ring-0 focus:border-none"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        ref={props.ref}
        onChange={props.onChange}
      />
    </div>
  );
}
