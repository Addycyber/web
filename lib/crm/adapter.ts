import fs from 'fs/promises'
import path from 'path'
import { QuoteLeadPayload } from '../validations/quote'

export interface CrmSaveResult {
  success: boolean
  leadId: string
  timestamp: string
}

export async function saveLeadToCrm(payload: QuoteLeadPayload): Promise<CrmSaveResult> {
  const leadId = `SM-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const timestamp = new Date().toISOString()

  const record = {
    leadId,
    timestamp,
    ...payload,
  }

  try {
    const dataDir = path.join(process.cwd(), 'data')
    await fs.mkdir(dataDir, { recursive: true })
    const filePath = path.join(dataDir, 'leads.json')

    let existingLeads: any[] = []
    try {
      const fileData = await fs.readFile(filePath, 'utf-8')
      existingLeads = JSON.parse(fileData)
    } catch {
      existingLeads = []
    }

    existingLeads.unshift(record)
    await fs.writeFile(filePath, JSON.stringify(existingLeads, null, 2), 'utf-8')
  } catch (error) {
    console.error('Failed to write lead to local storage:', error)
  }

  return {
    success: true,
    leadId,
    timestamp,
  }
}
