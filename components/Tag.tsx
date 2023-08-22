import Link from "next/link";

interface TagProps {
  text: string;
  url: string;
}

const Tag: React.FC<TagProps> = ({ text, url }) => {
  return (
    <Link
    href={url} 
    className="inline-block py-1 px-1 lg:py-2 lg:px-4 text-sm bg-gray-200 text-gray-800 rounded-sm  text-center align-middle lg:rounded-full shadow-md hover:bg-gray-100 transition duration-200 ease-in-out mx-1 my-1">
      {text}
    </Link>
  );
};

export default Tag