import path from "node:path"
import matter from "gray-matter"
import {unified} from "unified"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"

export async function loader() {
  const postPath = path.join(process.cwd(), "app/content/how-to-markdown.md")
  const {data, content} = matter.read(postPath)

  const processor = unified().use(remarkParse).use(remarkStringify)

  const vFile = await processor.process(content)
  const html = vFile.toString()

  const markdown = {
    html,
    frontmatter: data,
  }

  return {markdown}
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
