import { existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { CUSTOMER_DATA } from '../lib/customers'

const customerLogoDirectory = path.join(process.cwd(), 'public', 'customers')
const referencedLogos = new Set(
  CUSTOMER_DATA.customers
    .map((customer) => customer.logo)
    .filter((logo): logo is string => logo !== null)
    .map((logo) => logo.toLowerCase())
)
const issues: string[] = []
const logoFiles: string[] = []

function collectFiles(directory: string): void {
  if (!existsSync(directory)) return

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      collectFiles(entryPath)
    } else if (entry.isFile()) {
      logoFiles.push(entryPath)
    }
  }
}

collectFiles(customerLogoDirectory)

for (const filePath of logoFiles) {
  const relativePath = path
    .relative(path.join(process.cwd(), 'public'), filePath)
    .split(path.sep)
    .join('/')
  const size = statSync(filePath).size

  if (size > 40 * 1024) {
    issues.push(`Over 40KB (${(size / 1024).toFixed(1)}KB): public/${relativePath}`)
  }
  if (!referencedLogos.has(relativePath.toLowerCase())) {
    issues.push(`Not referenced in data/customers.json: public/${relativePath}`)
  }
}

for (const logo of referencedLogos) {
  const filePath = path.join(process.cwd(), 'public', ...logo.split('/'))
  if (!existsSync(filePath)) {
    issues.push(`Referenced logo is missing: public/${logo}`)
  }
}

if (issues.length > 0) {
  console.error(`Customer logo check found ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exitCode = 1
} else {
  console.log(
    `Customer logo check passed (${logoFiles.length} logo file(s), ${referencedLogos.size} referenced).`
  )
}
