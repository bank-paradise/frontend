export default function Contact({ name = "" }) {
  return (
    <button className="flex flex-col gap-1 max-w-min group m-auto">
      <div className="h-14 w-14 rounded-full bg-gray-400 flex items-center group-hover:bg-gray-500 justify-center">
        <p className="uppercase text-2xl text-white">{name[0]}</p>
      </div>
      <p className="text-center capitalize text-sm w-full group-hover:font-medium">
        {name}
      </p>
    </button>
  );
}
