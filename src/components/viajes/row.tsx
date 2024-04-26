interface Props { disponible: boolean }

export default function Header(props : Props) {
  
  return <th scope="col" className={props.disponible ? "font-extrabold px-6 py-4" : "font-normal px-6 py-4"}>
    {props.disponible ? "SI" : "NO"}
  </th>;
}