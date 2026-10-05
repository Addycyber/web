import { NextResponse } from 'next/server'
import { QuoteLeadSchema } from '@/lib/validations/quote'
import { saveLeadToCrm } from '@/lib/crm/adapter'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = QuoteLeadSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const lead = validation.data
    const result = await saveLeadToCrm(lead)

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      message: 'Quote request registered successfully',
    })
  } catch (error) {
    console.error('API /api/quote error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error processing quote request',
      },
      { status: 500 }
    )
  }
}
