import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg lg:text-xl xl:text-2xl uppercase font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="hidden xl:flex items-center gap-2">
          <li>
            <Link className="font-medium dark:text-white" href="#">
              Dashboard/
            </Link>
          </li>
          <li className="font-medium text-blue-700 dark:text-green-500">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;