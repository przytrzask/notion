import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import { Client } from "@notionhq/client"

type PageInfo = {
  title: string
  id: string
}

type Props = { pages: PageInfo[] }

const Pages: NextPage<Props> = ({ pages }) => {
  return pages.map((page) => (
    <p key={page.id}>
      <Link href={`programming/${page.id}`}>
        <a>{page.title}</a>
      </Link>
    </p>
  ))
}

export const getStaticProps = async () => {
  const client = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const pages = await client.blocks.children.list({
    block_id: process.env.PAGE_ID!,
  })

  return {
    props: {
      pages: pages.results.flatMap((page) =>
        page.type === "child_page"
          ? { title: page.child_page.title, id: page.id }
          : []
      ),
    },
  }
}

export default Pages
