export default async function NotFound() {
  return (
    <div className="w-full flex flex-col p-5">
      <div className="w-full flex flex-row items-center space-x-2 my-3 justify-between text-lg">
        <span>Not found</span>
      </div>
      <span className="text-red-400">
        The snippet with this id does not exist!
      </span>
    </div>
  );
}
