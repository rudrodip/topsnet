import zenodoApi from "@src/apiWrapper/zenodoApiWrapper"
import { Hit } from "@src/apiWrapper/types"

export default async function Page({ params }: { params: { id: string } }) {
  const data: Hit = await zenodoApi.getRecord(params.id)
  console.log(data)
  return <>
    <div>
      {data['metadata']['title']}
    </div>
  </>
}