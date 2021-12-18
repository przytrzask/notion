import { Client } from "@notionhq/client"
import Heading from "../../components/Heading"

type Props = { title: string; blocks: any[] }

const ProgrammingPage = ({ title, blocks }: Props) => {
  console.log(blocks)
  return (
    <>
      <div>{title}</div>
      {/* <pre>{JSON.stringify(blocks, null, 2)}</pre> */}

      {blocks.map((block) => {
        if (block.type.includes("heading")) {
          return (
            <Heading
              type={block.type}
              text={block[block.type].text[0].text.content}
              key={block.id}
            />
          )
        }
        return null
      })}
    </>
  )
}

export const getStaticPaths = async () => {
  const client = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const pages = await client.blocks.children.list({
    block_id: process.env.PAGE_ID!,
  })

  const paths = pages.results.flatMap((page) =>
    page.type === "child_page" ? { params: { id: page.id } } : []
  )

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { id } }) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const page = await notion.pages.retrieve({ page_id: id })

  const { results: blocks } = await notion.blocks.children.list({
    block_id: id,
  })

  const title = page.properties.title.title[0].plain_text
  console.log(blocks)

  return { props: { title, blocks } }
}

export default ProgrammingPage
