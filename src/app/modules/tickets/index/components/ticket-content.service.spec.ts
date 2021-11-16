import { TicketContentService } from "./ticket-content.service"

describe('TICKET_CONTENT_SERVICE', () => {

  let service: TicketContentService;

  beforeEach(() => {
    service = new TicketContentService();
  });

  describe('TOGGLE_TICKET_CONTENT', () => {

    it('invoking toggleTicketContent should trigger toggled$ observable to emit new value', async (done) => {

      service.toggleTicketContent();

      service.toggled$.subscribe(val => {
        expect(val).not.toBeNull();
        expect(val).toBeTruthy();
        done();
      })

    });

  });

})
