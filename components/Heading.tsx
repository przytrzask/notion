type Props = {
  type: "heading_1" | "heading_2" | "heading_3"
  text: string
}

const Heading = ({ type, text }: Props) => {
  switch (type) {
    case "heading_1":
      return <h1>{text}</h1>
    case "heading_2":
      return <h2>{text}</h2>
    case "heading_3":
      return <h3>{text}</h3>
  }
}

export default Heading
