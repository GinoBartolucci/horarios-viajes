export default function Header({text}: Readonly<{text: string}>) {
  return (
    <th scope="col" className="px-6 py-3">{text}</th>  
  )
}
