<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Commands: `npm run dev` (Turbopack), `npm run build`, `npm run lint` (`eslint` with no args; scope files by passing paths). No tests are configured — `lint` + `npm run build` is the verification loop; the build also runs TypeScript checking.

Non-default toolchain — don't "fix" these:
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (babel-plugin-react-compiler). Static-generation/caching behavior differs from stock Next defaults; components may cache unexpectedly unless marked dynamic.
- Tailwind CSS v4 via `@tailwindcss/turbopack`, configured through `src/app/globals.css` only — there is no `tailwind.config.*`.

Stack conventions:
- shadcn/ui with the **base-nova** style backed by `@base-ui/react` (not Radix). Add components with `npx shadcn add <name>` (`components.json` is the source of truth); don't hand-port Radix examples.
- `cn` comes from the `cn` npm package: components `import { cn } from "cn"`, and `src/lib/utils.ts` just re-exports it. Import `"cn"` (or `@/lib/utils`), don't write a local `clsx`/`tailwind-merge` helper.
- `src/app/globals.css` imports `shadcn/tailwind.css` in addition to `tailwindcss` — Tailwind tokens come from there; don't strip it.
- Paths `@/*` → `src/*`. UI primitives live in `src/components/ui/`, app code in `src/app/`.
- React 19 / App Router.
