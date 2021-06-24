const eventsService = require('../../services/events')
const mockEventsRepository = require('../mocks/mockEventRepository')

const mockEvents= mockEventsRepository.getAllEvents()

describe('get sellers events', () => {
    test('get sellers events by id', async () => {
        const events = await eventsService.getSellerEvents(1, mockEventsRepository)
        expect(events).toStrictEqual(mockEvents)
    })
})