import { getCustomer } from '@/lib/queries/getCustomer'
import { getTicket } from '@/lib/queries/getTicket'
import { BackButton } from '@/components/BackButton'
import * as Sentry from '@sentry/nextjs'

export default async function TicketFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { customerId, ticketId } = await searchParams

        // Edit customer form
        if (!customerId && !ticketId) {
            return <Message text={'Ticket ID or Customer ID required to load ticket form'} />
        }

        // New ticket form
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId))

            if (!customer) {
                return <Message text={`Customer ID #${customerId} not found`} />
            }

            if (!customer.active) {
                return <Message text={`Customer ID #${customerId} is not active`} />
            }

            // put ticket form component
            console.log(customer, '<------customer------>')
        }

        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId))

            if (!ticket) {
                return <Message text={`Ticket ID #${ticketId} not found`} />
            }

            const customer = await getCustomer(ticket.customerId)

            // return ticket form
            console.log('ticket: ', ticket)
            console.log('customer: ', customer)
        }
    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e)
            throw e
        }
    }
}

type MessageProps = {
    text: string
}

function Message({ text }: MessageProps) {
    return (
        <>
            <h2 className="text-2xl mb-2">{text}</h2>
            <BackButton title="Go Back" variant="default" />
        </>
    )
}
