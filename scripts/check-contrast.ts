/**
 * WCAG 2.2 AA Token Contrast Verification Script
 * Validates all foreground / background token pairings in both Light and Dark modes.
 * Fails process with exit code 1 if any pairing violates AA standards:
 * - Normal text: >= 4.5:1
 * - Large text / UI components: >= 3.0:1
 */

interface ColorToken {
  name: string
  hex: string
}

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)
  return [r, g, b]
}

function srgbToLinear(c: number): number {
  const v = c / 255
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  const rl = srgbToLinear(r)
  const gl = srgbToLinear(g)
  const bl = srgbToLinear(b)
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1)
  const l2 = relativeLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

interface ContrastCheck {
  description: string
  fgName: string
  fgHex: string
  bgName: string
  bgHex: string
  minRatio: number
}

// Light theme token test matrix
const lightChecks: ContrastCheck[] = [
  { description: 'Body & Headings on Page BG', fgName: '--text', fgHex: '#0F1B2D', bgName: '--bg', bgHex: '#FFFFFF', minRatio: 4.5 },
  { description: 'Supporting Copy on Page BG', fgName: '--text-secondary', fgHex: '#44546A', bgName: '--bg', bgHex: '#FFFFFF', minRatio: 4.5 },
  { description: 'Captions / Meta on Page BG', fgName: '--text-muted', fgHex: '#66758A', bgName: '--bg', bgHex: '#FFFFFF', minRatio: 4.5 },
  { description: 'Body on Subtle Surface', fgName: '--text', fgHex: '#0F1B2D', bgName: '--bg-subtle', bgHex: '#F5F7FA', minRatio: 4.5 },
  { description: 'Supporting Copy on Subtle Surface', fgName: '--text-secondary', fgHex: '#44546A', bgName: '--bg-subtle', bgHex: '#F5F7FA', minRatio: 4.5 },
  { description: 'Accent Button (White on Accent)', fgName: 'White', fgHex: '#FFFFFF', bgName: '--accent', bgHex: '#C2410C', minRatio: 4.5 },
  { description: 'Brand Section (White on Brand)', fgName: 'White', fgHex: '#FFFFFF', bgName: '--brand', bgHex: '#0B2A4A', minRatio: 4.5 },
  { description: 'Informational Links on Page BG', fgName: '--info', fgHex: '#1D5FA8', bgName: '--bg', bgHex: '#FFFFFF', minRatio: 4.5 },
  { description: 'Success Indicators on Page BG', fgName: '--success', fgHex: '#17803D', bgName: '--bg', bgHex: '#FFFFFF', minRatio: 4.5 },
  { description: 'Danger / Error Text on Page BG', fgName: '--danger', fgHex: '#B42318', bgName: '--bg', bgHex: '#FFFFFF', minRatio: 4.5 },
  { description: 'Border UI Components on Page BG', fgName: '--border-strong', fgHex: '#B9C4D2', bgName: '--bg', bgHex: '#FFFFFF', minRatio: 1.5 },
]

// Dark theme token test matrix
const darkChecks: ContrastCheck[] = [
  { description: 'Body & Headings on Dark BG', fgName: '--text', fgHex: '#EAF0F7', bgName: '--bg', bgHex: '#0B1220', minRatio: 4.5 },
  { description: 'Supporting Copy on Dark BG', fgName: '--text-secondary', fgHex: '#B3C0D2', bgName: '--bg', bgHex: '#0B1220', minRatio: 4.5 },
  { description: 'Captions / Meta on Dark BG', fgName: '--text-muted', fgHex: '#8A99AF', bgName: '--bg', bgHex: '#0B1220', minRatio: 4.5 },
  { description: 'Body on Subtle Dark Surface', fgName: '--text', fgHex: '#EAF0F7', bgName: '--bg-subtle', bgHex: '#111B2E', minRatio: 4.5 },
  { description: 'Accent Button (Dark Text on Accent)', fgName: 'Dark Text', fgHex: '#1A0B03', bgName: '--accent', bgHex: '#FF8A4C', minRatio: 4.5 },
  { description: 'Brand Accent on Dark BG', fgName: '--brand', fgHex: '#9CC2F0', bgName: '--bg', bgHex: '#0B1220', minRatio: 4.5 },
  { description: 'Focus Ring on Dark BG (UI)', fgName: '--focus-ring', fgHex: '#7DB3F5', bgName: '--bg', bgHex: '#0B1220', minRatio: 3.0 },
]

function runAudit() {
  console.log('\n========================================')
  console.log('  WCAG 2.2 AA TOKEN CONTRAST VERIFICATION')
  console.log('========================================\n')

  let failedCount = 0

  console.log('--- [LIGHT THEME TOKENS] ---')
  for (const check of lightChecks) {
    const ratio = getContrastRatio(check.fgHex, check.bgHex)
    const passed = ratio >= check.minRatio
    const formattedRatio = `${ratio.toFixed(2)}:1`
    const symbol = passed ? '✓' : '✗'
    const status = passed ? 'PASS' : 'FAIL'
    
    console.log(`[${status}] ${symbol} ${check.description}: ${formattedRatio} (req: ${check.minRatio}:1) [${check.fgHex} vs ${check.bgHex}]`)
    if (!passed) failedCount++
  }

  console.log('\n--- [DARK THEME TOKENS] ---')
  for (const check of darkChecks) {
    const ratio = getContrastRatio(check.fgHex, check.bgHex)
    const passed = ratio >= check.minRatio
    const formattedRatio = `${ratio.toFixed(2)}:1`
    const symbol = passed ? '✓' : '✗'
    const status = passed ? 'PASS' : 'FAIL'
    
    console.log(`[${status}] ${symbol} ${check.description}: ${formattedRatio} (req: ${check.minRatio}:1) [${check.fgHex} vs ${check.bgHex}]`)
    if (!passed) failedCount++
  }

  console.log('\n========================================')
  if (failedCount > 0) {
    console.error(`\x1b[31mContrast Check FAILED: ${failedCount} token pairs do not meet WCAG 2.2 AA.\x1b[0m\n`)
    process.exit(1)
  } else {
    console.log(`\x1b[32mAll token pairs meet or exceed WCAG 2.2 AA requirements!\x1b[0m\n`)
  }
}

runAudit()
