import Link from "next/link"
 
const EditButton = ({slug}: {slug: string})=> {
    <Link className ="button-secondary" href={`/${slug}/edit`}/>
}
 
export default EditButton