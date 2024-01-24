# Finishing up & Next Steps

This concludes all the things I wanted to show in this workshop.

- We saw how to create React components
- Fetching live data from a weather API using react-query
- Loading state & general UX tips with Material UI
- Error handling with error boundaries and suspense
- Page navigation with react-router
- Working with QraphQL APIs using Apollo client

There are a few more features you may try to add on your own.

- Add a robot list under a service area detail page so that we can see a list of which robots does a particular service area have. You should be able to modify and reuse `RobotList` view.
- Check `localhost:4000` for the QraphQL API documentation, there are a few more things you can build using it.
- Add a Support Tickets list view for robot details.
- Create support tickets using the `createSupportTicket` query.
- Create a dialog to fill in support ticket details.
- Display that when a robot has support tickets, it's operational status changes to 'not operational'.
- Resolve support tickets using `updateSupportTicketStatus` query. 
- Create a UI that updates a support ticket's status.
