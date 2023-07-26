interface Contributors{
  affiliation: string,
  name: string,
  orcid: string
}
interface PaperCardProps {
  published: string,
  resource_type: string,
  access: string,
  title: string,
  contributors: Contributors[],
  versions: string
}

const PaperCard = ({ published, resource_type, access, title, contributors, versions }: PaperCardProps) => {
  return (
    <div className="bg-gray-700 bg-opacity-40 backdrop-blur-lg max-w-xl p-4 rounded-lg text-gray-300 hover:bg-gray-900 delay-75 transition-all ease-in-out cursor-pointer m-2 z-10">
      <div className="flex text-sm flex-wrap">
        <p className="rounded-sm bg-blue-600 p-1 mr-1">{published}</p>
        <p className="rounded-sm bg-gray-500 p-1 mr-1">{resource_type.toUpperCase()}</p>
        <p className="rounded-sm bg-green-600 p-1 mr-1">{access.toUpperCase()}</p>
      </div>
      <h1 className="hover:text-white text-lg font-bold my-2">{title}</h1>
      <p>Contributors</p>
      <div className="flex flex-wrap my-2">
        {contributors.map(elem => {
          return (
            <p key={contributors.indexOf(elem)} className="rounded-sm bg-gray-600 p-1 mr-1 text-sm my-1">{elem['name']}</p>
          )
        })}
      </div>
      <p className="text-sm">Version {versions}</p>
    </div>
  );
};

export default PaperCard