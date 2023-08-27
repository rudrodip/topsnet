import Link from "next/link";
import { Button } from "./ui/button";

interface TagProps {
  text: string;
  url: string;
}

const Tag: React.FC<TagProps> = ({ text, url }) => {
  return (
    <Button asChild variant='outline' className="mx-1">
      <Link href={url}>{text}</Link>
    </Button>
  );
};

export default Tag;
